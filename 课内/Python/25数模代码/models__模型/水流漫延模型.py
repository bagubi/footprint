# models__模型/水流漫延模型.py
import heapq
from collections import defaultdict
import numpy as np
from utils__工具.几何计算工具 import get_slope, is_downhill

class FloodModel:
    def __init__(self, network):
        self.network = network
        self.flow_rate = 30  # m³/min
        self.cross_section_width = 4  # m
        self.cross_section_height = 3  # m
        self.initial_water_level = 0.1  # m
        self.initial_effective_area = self.cross_section_width * self.initial_water_level
        
        # 初始流速基于初始水位计算
        self.initial_velocity = self.flow_rate / self.initial_effective_area  # m/min
    
        # 时间步进模拟参数
        self.dt = 0.5  # 时间步长（分钟）- 调整为0.5以提高性能
        self.max_simulation_time = 1000  # 最大模拟时间（分钟）
        
    def time_step_simulation(self, source_node, simulation_time=None):
        """
        时间步进模拟方法
        更精确地模拟水流传播过程
        """
        if simulation_time is None:
            simulation_time = self.max_simulation_time
        
        # 初始化状态变量
        water_levels = {node: 0.0 for node in self.network.endpoints}
        flow_rates = {node: 0.0 for node in self.network.endpoints}
        arrival_times = {node: float('inf') for node in self.network.endpoints}
        full_times = {tunnel['id']: float('inf') for tunnel in self.network.tunnels}
        
        # 初始化源节点
        water_levels[source_node] = self.initial_water_level
        flow_rates[source_node] = self.flow_rate
        arrival_times[source_node] = 0.0
        
        # 巷道状态跟踪
        tunnel_states = {}
        for tunnel in self.network.tunnels:
            tunnel_states[tunnel['id']] = {
                'water_level': 0.0,
                'flow_rate': 0.0,
                'is_flooded': False,
                'flood_start_time': float('inf')
            }
        
        # 时间步进循环
        current_time = 0.0
        
        while current_time <= simulation_time:
            # 更新每个节点的水流状态
            new_water_levels = water_levels.copy()
            new_flow_rates = flow_rates.copy()
            
            for node in self.network.endpoints:
                if arrival_times[node] <= current_time:
                    # 处理节点分流
                    self.process_node_flow(
                        node, water_levels, flow_rates, new_water_levels, new_flow_rates, 
                        current_time, arrival_times, full_times, tunnel_states
                    )
            
            # 更新状态
            water_levels = new_water_levels
            flow_rates = new_flow_rates
            
            # 检查是否所有重要节点都已淹没或达到稳定状态
            if self.check_simulation_complete(water_levels, current_time):
                break
            
            current_time += self.dt
        
        return {
            'arrival_times': arrival_times,
            'full_times': full_times,
            'flow_rates': flow_rates,
            'water_levels': water_levels
        }

    def process_node_flow(self, node, water_levels, flow_rates, new_water_levels, 
                         new_flow_rates, current_time, arrival_times, full_times, tunnel_states):
        """
        处理单个节点的水流分配
        """
        current_flow = flow_rates[node]
        if current_flow <= 0:
            return
        
        # 获取所有可行的出口巷道
        outlets = self.get_valid_outlets(node, water_levels)
        if not outlets:
            return
        
        # 分配流量
        total_weight = sum(outlet['weight'] for outlet in outlets)
        for outlet in outlets:
            neighbor = outlet['neighbor']
            tunnel = outlet['tunnel']
            weight = outlet['weight']
            
            # 计算分配的流量
            allocated_flow = current_flow * (weight / total_weight)
            
            # 更新巷道状态
            self.update_tunnel_state(
                tunnel, allocated_flow, current_time, 
                full_times, tunnel_states, water_levels
            )
            
            # 计算水流传播时间
            travel_time = self.calculate_travel_time(
                tunnel, water_levels[node], allocated_flow
            )
            
            # 更新邻居节点状态
            arrival_time = current_time + travel_time
            if arrival_time < arrival_times[neighbor]:
                arrival_times[neighbor] = arrival_time
                new_flow_rates[neighbor] = allocated_flow
                new_water_levels[neighbor] = self.initial_water_level
    
    def get_valid_outlets(self, node, water_levels):
        """
        获取有效的出口巷道（水平或下行）
        """
        outlets = []
        node_coords = (self.network.endpoints[node]['x (m)'], 
                      self.network.endpoints[node]['y (m)'], 
                      self.network.endpoints[node]['z (m)'])
        
        for neighbor, tunnel in self.network.get_neighbors(node):
            neighbor_coords = (self.network.endpoints[neighbor]['x (m)'], 
                              self.network.endpoints[neighbor]['y (m)'], 
                              self.network.endpoints[neighbor]['z (m)'])
            
            # 计算坡度和流向
            slope = get_slope(node_coords, neighbor_coords)
            is_downstream = is_downhill(node_coords, neighbor_coords)
            
            # 只考虑水平或下行巷道，且水位未满
            if (is_downstream or abs(slope) < 0.001) and water_levels.get(neighbor, 0) < 3.0:
                # 计算权重
                if abs(slope) < 0.001:  # 水平巷道
                    weight = 1.0
                else:  # 下行巷道
                    weight = 1.0  # 保持相同权重实现平均分流
                                
                outlets.append({
                    'neighbor': neighbor,
                    'tunnel': tunnel,
                    'slope': slope,
                    'weight': weight,
                    'is_downstream': is_downstream
                })
        
        return outlets

    def get_effective_velocity(self, water_level, flow_rate=None):
        """
        根据水位计算有效流速
        """
        if flow_rate is None:
            flow_rate = self.flow_rate
        
        effective_area = self.cross_section_width * min(water_level, self.cross_section_height)
        if effective_area < 1e-6:
            return 0
        return flow_rate / effective_area  # m/min

    def calculate_fill_time(self, tunnel, arrival_time, inflow_rate):
        """
        精确计算巷道充满时间（积分模型）
        """
        L = tunnel['length']
        w = self.cross_section_width
        h0 = self.initial_water_level
        H = self.cross_section_height
        
        if inflow_rate < 1e-6:
            return float('inf')
        
        # 充满时间 = 从h0到H所需时间
        fill_time = (H - h0) * w * L / inflow_rate
        return arrival_time + fill_time

    def update_tunnel_state(self, tunnel, flow_rate, current_time, 
                           full_times, tunnel_states, water_levels):
        """
        更新巷道状态
        """
        tunnel_id = tunnel['id']
        state = tunnel_states[tunnel_id]
        
        if not state['is_flooded']:
            state['flood_start_time'] = current_time
            state['is_flooded'] = True
        
        state['flow_rate'] = flow_rate
        
        # 计算水位增长
        w = self.cross_section_width
        L = tunnel['length']
        growth_rate = flow_rate / (w * L)  # m/min
        
        # 更新水位（考虑时间步长）
        elapsed_time = current_time - state['flood_start_time']
        new_water_level = min(self.initial_water_level + growth_rate * elapsed_time, 3.0)
        state['water_level'] = new_water_level
        
        # 检查是否充满
        if new_water_level >= 3.0 and full_times[tunnel_id] == float('inf'):
            full_times[tunnel_id] = current_time

    def calculate_travel_time(self, tunnel, water_level, flow_rate):
        """
        计算水流通过巷道的时间
        """
        effective_velocity = self.get_effective_velocity(water_level, flow_rate)
        if effective_velocity < 1e-6:
            return float('inf')
        
        return tunnel['length'] / effective_velocity

    def check_simulation_complete(self, water_levels, current_time):
        """
        检查模拟是否完成（所有节点都已处理或达到稳定状态）
        """
        # 检查是否有节点仍在变化
        active_nodes = sum(1 for level in water_levels.values() 
                          if 0 < level < 3.0)
        
        # 如果长时间没有变化或所有节点都已处理完毕
        if active_nodes == 0 or current_time > self.max_simulation_time * 0.9:
            return True
        
        return False

    def simulate_dual_flood_time_step(self, source1, source2, delay):
        """
        改进的双水源模拟 - 考虑流量叠加
        """
        # 初始化状态变量
        water_levels = {node: 0.0 for node in self.network.endpoints}
        flow_rates = defaultdict(float)  # 使用defaultdict避免键不存在问题
        arrival_times = {node: float('inf') for node in self.network.endpoints}
        full_times = {tunnel['id']: float('inf') for tunnel in self.network.tunnels}
        
        # 初始化源节点
        water_levels[source1] = self.initial_water_level
        flow_rates[source1] += self.flow_rate
        arrival_times[source1] = 0.0
        
        water_levels[source2] = self.initial_water_level
        flow_rates[source2] += self.flow_rate
        arrival_times[source2] = delay  # 第二个水源在delay分钟后开始
        
        # 巷道状态跟踪
        tunnel_states = {}
        for tunnel in self.network.tunnels:
            tunnel_states[tunnel['id']] = {
                'water_level': 0.0,
                'flow_rate': 0.0,
                'is_flooded': False,
                'flood_start_time': float('inf')
            }
        
        # 时间步进循环
        current_time = 0.0
        dt = 0.5  # 时间步长
        
        while current_time <= self.max_simulation_time:
            # 更新每个节点的水流状态
            new_water_levels = water_levels.copy()
            new_flow_rates = flow_rates.copy()
            
            for node in self.network.endpoints:
                if arrival_times[node] <= current_time:
                    # 处理节点分流
                    self.process_node_flow(
                        node, water_levels, flow_rates, new_water_levels, new_flow_rates, 
                        current_time, arrival_times, full_times, tunnel_states
                    )
            
            # 更新状态
            water_levels = new_water_levels
            flow_rates = new_flow_rates
            
            # 检查是否所有重要节点都已淹没或达到稳定状态
            if self.check_simulation_complete(water_levels, current_time):
                break
            
            current_time += dt
        
        return arrival_times, full_times