# models__模型/逃生规划类.py
import heapq
import numpy as np
from utils__工具.几何计算工具 import get_slope, is_downhill, is_uphill, is_horizontal

class EscapePlanner:
    def __init__(self, network, flood_arrival, full_times=None, flow_rates=None, water_levels=None):
        self.network = network
        self.flood_arrival = flood_arrival  # 节点：水流到达时间
        self.full_times = full_times or {}
        self.flow_rates = flow_rates or {}  # 节点：流量
        self.water_levels = water_levels or {}  # 节点：水位
        
        # 基础行走速度 (m/s)
        self.walk_speed_normal = 4.0      # 无水时正常速度
        self.walk_speed_upstream = 1.0    # 逆水行进速度
        self.walk_speed_downstream = 2.0  # 顺水行进速度
        
        # 水位对速度的影响系数
        self.water_depth_factor = 0.7     # 水位每增加0.1m，速度减少的比例

    def get_water_level_at_time(self, tunnel, current_time):
        """
        精确计算当前时间巷道内的水位
        """
        tunnel_id = tunnel['id']
        
        # 如果巷道已充满水
        if tunnel_id in self.full_times and current_time >= self.full_times[tunnel_id]:
            return 3.0  # 巷道高度
        
        # 获取水流到达时间
        arrival_time = min(
            self.flood_arrival.get(tunnel['n1'], float('inf')),
            self.flood_arrival.get(tunnel['n2'], float('inf'))
        )
        
        # 如果水流尚未到达
        if current_time < arrival_time:
            return 0.0
        
        # 计算水位增长（线性模型）
        # 估算流量（取两端节点的平均值）
        flow1 = self.flow_rates.get(tunnel['n1'], 0)
        flow2 = self.flow_rates.get(tunnel['n2'], 0)
        flow_rate = (flow1 + flow2) / 2 if flow1 + flow2 > 0 else 30
        
        # 水位增长速率：dh/dt = Q / (w * L)
        w = 4.0  # 巷道宽度
        L = tunnel['length']
        growth_rate = flow_rate / (w * L)  # m/min
        
        # 当前水位 = 初始水位 + 增长速率 × 时间
        elapsed_time = current_time - arrival_time  # 分钟
        water_level = min(0.1 + growth_rate * elapsed_time, 3.0)
        
        return water_level

    def get_walking_speed_advanced(self, tunnel, current_time, direction='forward'):
        """
        改进的行走速度计算模型
        考虑水位深度、水流方向、坡度等因素
        """
        # 获取当前水位
        water_level = self.get_water_level_at_time(tunnel, current_time)
        
        # 检查是否可通行
        if water_level > 0.3:
            return None  # 水位超过0.3m，不可通行
        
        # 获取巷道坡度信息
        p1 = tunnel['coords1']
        p2 = tunnel['coords2']
        slope = get_slope(p1, p2)
        
        # 确定行进方向相对于水流的方向
        water_direction = self.get_water_direction(tunnel)
        is_against_flow = self.is_against_water_flow(direction, water_direction)
        
        # 基础速度选择
        if water_level == 0:
            base_speed = self.walk_speed_normal
        elif is_against_flow:
            base_speed = self.walk_speed_upstream
        else:
            base_speed = self.walk_speed_downstream
        
        # 水位深度对速度的影响
        if water_level > 0:
            # 水位越深，速度越慢（线性衰减）
            depth_factor = 1.0 - (water_level / 0.3) * self.water_depth_factor
            adjusted_speed = base_speed * depth_factor
        else:
            adjusted_speed = base_speed
        
        # 坡度对速度的影响（轻微调整）
        if abs(slope) > 0.1:  # 较大坡度
            slope_factor = 1.0 - min(abs(slope) * 0.2, 0.4)  # 坡度每0.1减少2%速度
            adjusted_speed *= slope_factor
        
        return max(adjusted_speed, 0.1)  # 确保最小速度

    def get_water_direction(self, tunnel):
        """
        确定水流方向（从高到低）
        返回：'n1_to_n2' 或 'n2_to_n1'
        """
        p1 = tunnel['coords1']
        p2 = tunnel['coords2']
        
        if p1[2] > p2[2]:  # n1比n2高，水流从n1流向n2
            return 'n1_to_n2'
        elif p2[2] > p1[2]:  # n2比n1高，水流从n2流向n1
            return 'n2_to_n1'
        else:  # 水平巷道，需要根据流量分布判断
            # 默认从先被淹没的一端流向另一端
            time1 = self.flood_arrival.get(tunnel['n1'], float('inf'))
            time2 = self.flood_arrival.get(tunnel['n2'], float('inf'))
            if time1 < time2:
                return 'n1_to_n2'
            else:
                return 'n2_to_n1'

    def is_against_water_flow(self, walk_direction, water_direction):
        """
        判断是否逆水行进
        """
        if walk_direction == 'forward':
            # 正向行进：从n1到n2
            return water_direction == 'n2_to_n1'
        else:
            # 反向行进：从n2到n1
            return water_direction == 'n1_to_n2'

    def get_travel_time(self, tunnel, start_time, direction='forward'):
        """
        通过巷道的时间计算
        """
        length = tunnel['length']
        
        # 获取行走速度
        speed = self.get_walking_speed_advanced(tunnel, start_time, direction)
        if speed is None:
            return None  # 不可通行
        
        # 计算通过时间（秒）
        travel_time = length / speed
        return travel_time

    def plan_escape_detailed(self, start_node, exits, notification_time=60):
        """
        逃生路径规划
        """
        # 将通知时间从分钟转换为秒
        notification_time_sec = notification_time * 60
        
        dist = {node: float('inf') for node in self.network.endpoints}
        prev = {}
        dist[start_node] = notification_time_sec
        
        pq = [(notification_time_sec, start_node)]

        while pq:
            current_time, current_node = heapq.heappop(pq)
            
            if current_time > dist[current_node]:
                continue

            for neighbor, tunnel in self.network.get_neighbors(current_node):
                # 确定行进方向
                direction = 'forward' if tunnel['n1'] == current_node else 'backward'
                
                # 计算通过时间
                travel_time = self.get_travel_time(tunnel, current_time/60, direction)
                
                if travel_time is None:
                    continue  # 不可通行
                
                arrival_time = current_time + travel_time
                
                if arrival_time < dist[neighbor]:
                    dist[neighbor] = arrival_time
                    prev[neighbor] = current_node
                    heapq.heappush(pq, (arrival_time, neighbor))

        # 找到最佳出口
        best_exit = None
        best_time = float('inf')
        for exit_node in exits:
            if dist[exit_node] < best_time:
                best_time = dist[exit_node]
                best_exit = exit_node

        if best_exit is None:
            return None, float('inf'), [], []

        # 回溯路径
        path = []
        path_times = {}
        curr = best_exit
        
        while curr in prev:
            path.append(curr)
            path_times[curr] = dist[curr]
            curr = prev[curr]
            if curr == start_node:
                path.append(curr)
                path_times[curr] = dist[curr]
                break
        
        path.reverse()
        
        return best_exit, best_time - notification_time_sec, path, path_times