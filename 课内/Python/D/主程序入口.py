# 主程序入口.py
import os
import pandas as pd
from collections import defaultdict

from utils__工具.文件读写工具 import load_attachment, save_result
from models__模型.巷道网络类 import TunnelNetwork
from models__模型.水流漫延模型 import FloodModel
from models__模型.逃生规划类 import EscapePlanner


# 修改可视化模块导入路径
try:
    from 图 import generate_all_figures  # 从根目录导入
    VISUALIZATION_AVAILABLE = True
except ImportError as e:
    VISUALIZATION_AVAILABLE = False
    print(f"警告: 可视化模块不可用，将跳过图表生成: {e}")


DATA_DIR = "data__附件"
RESULT_DIR = "results__输出结果"
ATTACHMENT1 = os.path.join(DATA_DIR, "附件1.xlsx")
ATTACHMENT2 = os.path.join(DATA_DIR, "附件2.xlsx")

# 问题1突水点
SOURCE_A1 = (5349.03, 4931.90, 10.00)
SOURCE_A2 = (4143.12, 4376.28, 6.33)

# 问题3第二个突水点
SOURCE_B1 = (3760.40, 3808.33, 10.00)
SOURCE_B2 = (5883.14, 5643.35, 40.37)

# 出入口 & 矿工位置
EXITS_1 = [
    (3252.16, 3326.63, 10.00),
    (3173.10, 2819.97, 10.00)
]
MINERS_1 = [
    (5808.18, 5367.75, 10.00),
    (5194.00, 4785.31, 10.00),
    (6190.81, 3434.29, 10.00)
]

EXITS_2 = [
    (6336.99, 6073.22, 36.15),
    (6416.05, 6579.88, 8.69)
]
MINERS_2 = [
    (4395.15, 4614.53, 6.59),
    (3398.34, 5965.56, 1.31),
    (3879.44, 4125.47, 6.22)
]

# 全局变量用于存储可视化数据
visualization_data = {
    'attachment1': {},
    'attachment2': {}
}


def problem1_2(network_file, source_coord, output_suffix):
    endpoints_df, tunnels_df = load_attachment(network_file)
    net = TunnelNetwork(endpoints_df, tunnels_df)
    flood = FloodModel(net)

    source_node = net.find_closest_node(*source_coord)
    print(f"突水点坐标 {source_coord} 对应节点: {source_node}")

    # 使用时间步进模拟替代快速模拟
    results = flood.time_step_simulation(source_node)
    arrival = results['arrival_times']
    full = results['full_times']
    flow_rates = results['flow_rates']  # 新增
    water_levels = results['water_levels']  # 新增

    # 存储可视化数据
    if output_suffix == "1":
        visualization_data['attachment1']['network'] = net
        visualization_data['attachment1']['arrival_times'] = arrival
        visualization_data['attachment1']['full_times'] = full
        visualization_data['attachment1']['flow_rates'] = flow_rates  # 新增
        visualization_data['attachment1']['water_levels'] = water_levels  # 新增
    else:
        visualization_data['attachment2']['network'] = net
        visualization_data['attachment2']['arrival_times'] = arrival
        visualization_data['attachment2']['full_times'] = full
        visualization_data['attachment2']['flow_rates'] = flow_rates  # 新增
        visualization_data['attachment2']['water_levels'] = water_levels  # 新增

    # 构建端点水流到达时刻表
    node_results = []
    for node_id, attrs in net.endpoints.items():
        node_results.append({
            '端点编号': node_id,
            '水流到达时刻（分钟）': round(arrival[node_id], 2)
        })

    # 构建巷道充满水时刻表
    tunnel_results = []
    for tunnel in net.tunnels:
        tunnel_results.append({
            '巷道编号': tunnel['id'],
            '巷道充满水时刻（分钟）': round(full[tunnel['id']], 2)
        })

    # 创建Excel写入器
    output_path = os.path.join(RESULT_DIR, f"result1-{output_suffix}.xlsx")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with pd.ExcelWriter(output_path) as writer:
        pd.DataFrame(node_results).to_excel(writer, sheet_name='端点水流到达时刻', index=False)
        pd.DataFrame(tunnel_results).to_excel(writer, sheet_name='巷道水流充满时刻', index=False)

    print(f"结果已保存至: {output_path}")

    return net, arrival, full


def problem2(net, arrival, full, miners_coords, exits_coords, output_suffix):
    exits = [net.find_closest_node(*pos) for pos in exits_coords]
    
    # 获取流量和水位数据
    flow_rates = visualization_data[f'attachment{output_suffix}']['flow_rates']
    water_levels = visualization_data[f'attachment{output_suffix}']['water_levels']
    
    # 使用改进的逃生规划器
    planner = EscapePlanner(net, arrival, full, flow_rates, water_levels)

    output_path = os.path.join(RESULT_DIR, f"result2-{output_suffix}.xlsx")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # 存储逃生路径数据
    escape_paths = {}

    with pd.ExcelWriter(output_path) as writer:
        for i, pos in enumerate(miners_coords):
            start_node = net.find_closest_node(*pos)
            print(f"矿工{i + 1}位置 {pos} 对应节点: {start_node}")

            # 使用plan_escape_detailed方法获取详细路径信息
            exit_node, escape_time, path, path_times = planner.plan_escape_detailed(
                start_node, exits, notification_time=60
            )

            # 计算路径总长度
            path_length = 0
            for j in range(1, len(path)):
                prev_node = path[j - 1]
                curr_node = path[j]
                for neighbor, tunnel in net.get_neighbors(prev_node):
                    if neighbor == curr_node:
                        path_length += tunnel['length']
                        break

            # 存储逃生路径信息
            escape_paths[f'miner_{i + 1}'] = {
                'path_nodes': path,
                'escape_time': escape_time,
                'path_length': path_length,
                'path_times': path_times
            }

            # 构建路径详情
            path_details = []
            current_time = 60  # 通知时间

            for j, node_id in enumerate(path):
                attrs = net.endpoints[node_id]

                tunnel_id = ''
                if j > 0:
                    # 查找连接前一个节点和当前节点的巷道
                    prev_node = path[j - 1]
                    for neighbor, tunnel in net.get_neighbors(prev_node):
                        if neighbor == node_id:
                            tunnel_id = tunnel['id']
                            # 计算通过该巷道的时间
                            travel_time = planner.get_travel_time(tunnel, current_time, direction='forward')
                            if travel_time is not None:
                                current_time += travel_time
                            break

                path_details.append({
                    '序号': j + 1,
                    '工人位置': node_id,
                    'x (m)': round(attrs['x (m)'], 2),
                    'y (m)': round(attrs['y (m)'], 2),
                    'z (m)': round(attrs['z (m)'], 2),
                    '到达时刻': round(current_time, 2) if j > 0 else 60.0,
                    '巷道编号': tunnel_id
                })

            # 保存到不同的工作表
            sheet_name = f'工人{i + 1}逃生路径'
            pd.DataFrame(path_details).to_excel(writer, sheet_name=sheet_name, index=False)

    # 存储逃生路径数据
    if output_suffix == "1":
        visualization_data['attachment1']['escape_paths'] = escape_paths
    else:
        visualization_data['attachment2']['escape_paths'] = escape_paths

    print(f"结果已保存至: {output_path}")
    return escape_paths


def problem3(network_file, source1_coord, source2_coord, delay, output_suffix):
    """双水源突水模拟"""
    endpoints_df, tunnels_df = load_attachment(network_file)
    net = TunnelNetwork(endpoints_df, tunnels_df)
    flood = FloodModel(net)

    source1_node = net.find_closest_node(*source1_coord)
    source2_node = net.find_closest_node(*source2_coord)

    print(f"突水点1 {source1_coord} 对应节点: {source1_node}")
    print(f"突水点2 {source2_coord} 对应节点: {source2_node}")

    # 使用时间步进的双水源模拟
    arrival, full = flood.simulate_dual_flood_time_step(source1_node, source2_node, delay)

    # 存储双源数据
    if output_suffix == "1":
        visualization_data['attachment1']['dual_arrival'] = arrival
        visualization_data['attachment1']['dual_full'] = full
    else:
        visualization_data['attachment2']['dual_arrival'] = arrival
        visualization_data['attachment2']['dual_full'] = full

    # 构建端点水流到达时刻表
    node_results = []
    for node_id, attrs in net.endpoints.items():
        node_results.append({
            '端点编号': node_id,
            '水流到达时刻（分钟）': round(arrival[node_id], 2)
        })

    # 构建巷道充满水时刻表
    tunnel_results = []
    for tunnel in net.tunnels:
        tunnel_results.append({
            '巷道编号': tunnel['id'],
            '巷道充满水时刻（分钟）': round(full[tunnel['id']], 2)
        })

    # 创建Excel写入器
    output_path = os.path.join(RESULT_DIR, f"result3-{output_suffix}.xlsx")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with pd.ExcelWriter(output_path) as writer:
        pd.DataFrame(node_results).to_excel(writer, sheet_name='端点水流到达时刻', index=False)
        pd.DataFrame(tunnel_results).to_excel(writer, sheet_name='巷道水流充满时刻', index=False)

    print(f"结果已保存至: {output_path}")

    return net, arrival, full


def problem4(net, arrival, full, miners_coords, exits_coords, output_suffix):
    exits = [net.find_closest_node(*pos) for pos in exits_coords]
    
    # 获取流量和水位数据
    flow_rates = visualization_data[f'attachment{output_suffix}']['flow_rates']
    water_levels = visualization_data[f'attachment{output_suffix}']['water_levels']
    
    # 使用改进的逃生规划器
    planner = EscapePlanner(net, arrival, full, flow_rates, water_levels)
    output_path = os.path.join(RESULT_DIR, f"result4-{output_suffix}.xlsx")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # 存储逃生路径数据
    escape_paths_dual = {}

    with pd.ExcelWriter(output_path) as writer:
        for i, pos in enumerate(miners_coords):
            start_node = net.find_closest_node(*pos)
            print(f"矿工{i + 1}位置 {pos} 对应节点: {start_node}")

            # 使用plan_escape_detailed方法获取详细路径信息
            exit_node, escape_time, path, path_times = planner.plan_escape_detailed(
                start_node, exits, notification_time=60
            )

            # 计算路径总长度
            path_length = 0
            for j in range(1, len(path)):
                prev_node = path[j - 1]
                curr_node = path[j]
                for neighbor, tunnel in net.get_neighbors(prev_node):
                    if neighbor == curr_node:
                        path_length += tunnel['length']
                        break

            # 存储逃生路径信息
            escape_paths_dual[f'miner_{i + 1}'] = {
                'path_nodes': path,
                'escape_time': escape_time,
                'path_length': path_length,
                'path_times': path_times
            }

            # 构建路径详情
            path_details = []
            current_time = 60  # 通知时间

            for j, node_id in enumerate(path):
                attrs = net.endpoints[node_id]

                tunnel_id = ''
                if j > 0:
                    # 查找连接前一个节点和当前节点的巷道
                    prev_node = path[j - 1]
                    for neighbor, tunnel in net.get_neighbors(prev_node):
                        if neighbor == node_id:
                            tunnel_id = tunnel['id']
                            # 计算通过该巷道的时间
                            travel_time = planner.get_travel_time(tunnel, current_time, direction='forward')
                            if travel_time is not None:
                                current_time += travel_time
                            break

                path_details.append({
                    '序号': j + 1,
                    '工人位置': node_id,
                    'x (m)': round(attrs['x (m)'], 2),
                    'y (m)': round(attrs['y (m)'], 2),
                    'z (m)': round(attrs['z (m)'], 2),
                    '到达时刻': round(current_time, 2) if j > 0 else 60.0,
                    '巷道编号': tunnel_id
                })

            # 保存到不同的工作表
            sheet_name = f'工人{i + 1}逃生路径'
            pd.DataFrame(path_details).to_excel(writer, sheet_name=sheet_name, index=False)

    # 存储双源逃生路径数据
    if output_suffix == "1":
        visualization_data['attachment1']['dual_escape_paths'] = escape_paths_dual
    else:
        visualization_data['attachment2']['dual_escape_paths'] = escape_paths_dual

    print(f"结果已保存至: {output_path}")
    return escape_paths_dual


def generate_visualizations():
    """生成所有可视化图表"""
    if not VISUALIZATION_AVAILABLE:
        print("可视化模块不可用，跳过图表生成")
        return
    
    print("\n开始生成可视化图表...")
    
    # 附件1 - 问题1: 单突水点水流漫延
    if (visualization_data['attachment1'].get('network') and 
        visualization_data['attachment1'].get('arrival_times') and
        visualization_data['attachment1'].get('full_times')):
        
        print("为附件1生成问题1图表...")
        try:
            figures1_1 = generate_all_figures(
                network=visualization_data['attachment1']['network'],
                arrival_times=visualization_data['attachment1']['arrival_times'],
                full_times=visualization_data['attachment1']['full_times'],
                escape_paths={},  # 问题1不需要逃生路径
                source_points=[SOURCE_A1],
                exit_points=EXITS_1,
                miner_points=MINERS_1,
                output_dir=os.path.join(RESULT_DIR, "figures_attachment1_problem1"),
                problem_number=1
            )
            print("附件1问题1图表生成完成")
        except Exception as e:
            print(f"生成附件1问题1图表时出错: {e}")
    
    # 附件1 - 问题2: 单源逃生路径
    if (visualization_data['attachment1'].get('network') and 
        visualization_data['attachment1'].get('arrival_times') and
        visualization_data['attachment1'].get('escape_paths')):
        
        print("为附件1生成问题2图表...")
        try:
            figures1_2 = generate_all_figures(
                network=visualization_data['attachment1']['network'],
                arrival_times=visualization_data['attachment1']['arrival_times'],
                full_times=visualization_data['attachment1']['full_times'],
                escape_paths=visualization_data['attachment1']['escape_paths'],
                source_points=[SOURCE_A1],
                exit_points=EXITS_1,
                miner_points=MINERS_1,
                output_dir=os.path.join(RESULT_DIR, "figures_attachment1_problem2"),
                problem_number=2
            )
            print("附件1问题2图表生成完成")
        except Exception as e:
            print(f"生成附件1问题2图表时出错: {e}")
    
    # 附件1 - 问题3: 双突水点水流漫延
    if (visualization_data['attachment1'].get('dual_arrival') and
        visualization_data['attachment1'].get('dual_full')):
        
        print("为附件1生成问题3图表...")
        try:
            figures1_3 = generate_all_figures(
                network=visualization_data['attachment1']['network'],
                arrival_times=visualization_data['attachment1']['dual_arrival'],
                full_times=visualization_data['attachment1']['dual_full'],
                escape_paths={},  # 问题3不需要逃生路径
                source_points=[SOURCE_A1, SOURCE_B1],
                exit_points=EXITS_1,
                miner_points=MINERS_1,
                output_dir=os.path.join(RESULT_DIR, "figures_attachment1_problem3"),
                problem_number=3,
                dual_arrival_times=visualization_data['attachment1']['dual_arrival']
            )
            print("附件1问题3图表生成完成")
        except Exception as e:
            print(f"生成附件1问题3图表时出错: {e}")
    
    # 附件1 - 问题4: 双源逃生路径
    if (visualization_data['attachment1'].get('dual_arrival') and
        visualization_data['attachment1'].get('dual_escape_paths')):
        
        print("为附件1生成问题4图表...")
        try:
            figures1_4 = generate_all_figures(
                network=visualization_data['attachment1']['network'],
                arrival_times=visualization_data['attachment1']['dual_arrival'],
                full_times=visualization_data['attachment1']['dual_full'],
                escape_paths=visualization_data['attachment1']['dual_escape_paths'],
                source_points=[SOURCE_A1, SOURCE_B1],
                exit_points=EXITS_1,
                miner_points=MINERS_1,
                output_dir=os.path.join(RESULT_DIR, "figures_attachment1_problem4"),
                problem_number=4,
                dual_arrival_times=visualization_data['attachment1']['dual_arrival']
            )
            print("附件1问题4图表生成完成")
        except Exception as e:
            print(f"生成附件1问题4图表时出错: {e}")
    
    # 附件2 - 问题1: 单突水点水流漫延
    if (visualization_data['attachment2'].get('network') and 
        visualization_data['attachment2'].get('arrival_times') and
        visualization_data['attachment2'].get('full_times')):
        
        print("为附件2生成问题1图表...")
        try:
            figures2_1 = generate_all_figures(
                network=visualization_data['attachment2']['network'],
                arrival_times=visualization_data['attachment2']['arrival_times'],
                full_times=visualization_data['attachment2']['full_times'],
                escape_paths={},  # 问题1不需要逃生路径
                source_points=[SOURCE_A2],
                exit_points=EXITS_2,
                miner_points=MINERS_2,
                output_dir=os.path.join(RESULT_DIR, "figures_attachment2_problem1"),
                problem_number=1
            )
            print("附件2问题1图表生成完成")
        except Exception as e:
            print(f"生成附件2问题1图表时出错: {e}")
    
    # 附件2 - 问题2: 单源逃生路径
    if (visualization_data['attachment2'].get('network') and 
        visualization_data['attachment2'].get('arrival_times') and
        visualization_data['attachment2'].get('escape_paths')):
        
        print("为附件2生成问题2图表...")
        try:
            figures2_2 = generate_all_figures(
                network=visualization_data['attachment2']['network'],
                arrival_times=visualization_data['attachment2']['arrival_times'],
                full_times=visualization_data['attachment2']['full_times'],
                escape_paths=visualization_data['attachment2']['escape_paths'],
                source_points=[SOURCE_A2],
                exit_points=EXITS_2,
                miner_points=MINERS_2,
                output_dir=os.path.join(RESULT_DIR, "figures_attachment2_problem2"),
                problem_number=2
            )
            print("附件2问题2图表生成完成")
        except Exception as e:
            print(f"生成附件2问题2图表时出错: {e}")
    
    # 附件2 - 问题3: 双突水点水流漫延
    if (visualization_data['attachment2'].get('dual_arrival') and
        visualization_data['attachment2'].get('dual_full')):
        
        print("为附件2生成问题3图表...")
        try:
            figures2_3 = generate_all_figures(
                network=visualization_data['attachment2']['network'],
                arrival_times=visualization_data['attachment2']['dual_arrival'],
                full_times=visualization_data['attachment2']['dual_full'],
                escape_paths={},  # 问题3不需要逃生路径
                source_points=[SOURCE_A2, SOURCE_B2],
                exit_points=EXITS_2,
                miner_points=MINERS_2,
                output_dir=os.path.join(RESULT_DIR, "figures_attachment2_problem3"),
                problem_number=3,
                dual_arrival_times=visualization_data['attachment2']['dual_arrival']
            )
            print("附件2问题3图表生成完成")
        except Exception as e:
            print(f"生成附件2问题3图表时出错: {e}")
    
    # 附件2 - 问题4: 双源逃生路径
    if (visualization_data['attachment2'].get('dual_arrival') and
        visualization_data['attachment2'].get('dual_escape_paths')):
        
        print("为附件2生成问题4图表...")
        try:
            figures2_4 = generate_all_figures(
                network=visualization_data['attachment2']['network'],
                arrival_times=visualization_data['attachment2']['dual_arrival'],
                full_times=visualization_data['attachment2']['dual_full'],
                escape_paths=visualization_data['attachment2']['dual_escape_paths'],
                source_points=[SOURCE_A2, SOURCE_B2],
                exit_points=EXITS_2,
                miner_points=MINERS_2,
                output_dir=os.path.join(RESULT_DIR, "figures_attachment2_problem4"),
                problem_number=4,
                dual_arrival_times=visualization_data['attachment2']['dual_arrival']
            )
            print("附件2问题4图表生成完成")
        except Exception as e:
            print(f"生成附件2问题4图表时出错: {e}")
    
    print("所有图表生成完成！")


if __name__ == "__main__":
    # 问题1&2 - 附件1
    print("处理附件1...")
    net1, arr1, full1 = problem1_2(ATTACHMENT1, SOURCE_A1, "1")
    escape_paths1 = problem2(net1, arr1, full1, MINERS_1, EXITS_1, "1")

    # 问题1&2 - 附件2
    print("处理附件2...")
    net2, arr2, full2 = problem1_2(ATTACHMENT2, SOURCE_A2, "2")
    escape_paths2 = problem2(net2, arr2, full2, MINERS_2, EXITS_2, "2")

    # 问题3 - 双水源突水模拟
    print("处理问题3...")
    # 附件1双水源
    net3_1, arr3_1, full3_1 = problem3(ATTACHMENT1, SOURCE_A1, SOURCE_B1, 4, "1")
    # 附件2双水源
    net3_2, arr3_2, full3_2 = problem3(ATTACHMENT2, SOURCE_A2, SOURCE_B2, 5, "2")

    # 问题4 - 双水源逃生规划
    print("处理问题4...")
    # 附件1逃生规划 (延迟1分钟通知)
    escape_paths_dual1 = problem4(net3_1, arr3_1, full3_1, MINERS_1, EXITS_1, "1")
    # 附件2逃生规划 (延迟1分钟通知)
    escape_paths_dual2 = problem4(net3_2, arr3_2, full3_2, MINERS_2, EXITS_2, "2")

    # 生成可视化图表
    generate_visualizations()

    print("所有处理完成！")