# models__模型/巷道网络类.py
import pandas as pd
from utils__工具.几何计算工具 import distance_3d, get_slope, is_horizontal, is_downhill

class TunnelNetwork:
    def __init__(self, endpoints_df, tunnels_df):
        print("端点表列名:", endpoints_df.columns.tolist())
    
        # 验证必需列是否存在
        required_columns = ['x (m)', 'y (m)', 'z (m)', '端点编号']
        for col in required_columns:
            if col not in endpoints_df.columns:
                raise ValueError(f"端点表缺少必需列: {col}")
            
        self.endpoints = endpoints_df.set_index('端点编号').to_dict('index')
        self.tunnels = []
        self.graph = {}  # 邻接表：node -> [(neighbor, tunnel_info), ...]
        self.tunnel_data = {}  # tunnel_id -> info

        # 构建巷道与图结构
        for _, row in tunnels_df.iterrows():
            t_id = row['巷道编号']
            n1, n2 = row['巷道端点1'], row['巷道端点2']
            if n1 not in self.endpoints or n2 not in self.endpoints:
                print(f"警告: 巷道 {t_id} 的端点 {n1} 或 {n2} 不存在")
                continue
            p1 = self.endpoints[n1]
            p2 = self.endpoints[n2]
            coords1 = (p1['x (m)'], p1['y (m)'], p1['z (m)'])
            coords2 = (p2['x (m)'], p2['y (m)'], p2['z (m)'])

            length = distance_3d(coords1, coords2)
            slope = get_slope(coords1, coords2)
            horizontal = is_horizontal(coords1, coords2)  # 修复：传入两个坐标点而不是坡度值

            tunnel_info = {
                'id': t_id,
                'n1': n1,
                'n2': n2,
                'length': length,
                'slope': slope,
                'horizontal': horizontal,
                'cross_section': 4 * 3,  # 宽4m，高3m => 面积12 m²
                'volume': length * 12,
                'coords1': coords1,
                'coords2': coords2
            }
            self.tunnels.append(tunnel_info)
            self.tunnel_data[t_id] = tunnel_info

            # 构建图（无向图）
            if n1 not in self.graph:
                self.graph[n1] = []
            if n2 not in self.graph:
                self.graph[n2] = []
            self.graph[n1].append((n2, tunnel_info))
            self.graph[n2].append((n1, tunnel_info))
        
        print(f"网络构建完成: {len(self.endpoints)} 个节点, {len(self.tunnels)} 条巷道")

    def get_neighbors(self, node):
        """获取相邻节点及巷道信息"""
        return self.graph.get(node, [])

    def find_closest_node(self, x, y, z):
        """找到离给定点最近的节点"""
        min_dist = float('inf')
        closest = None
        for node_id, attrs in self.endpoints.items():
            dist = (attrs['x (m)'] - x)**2 + (attrs['y (m)'] - y)**2 + (attrs['z (m)'] - z)**2
            if dist < min_dist:
                min_dist = dist
                closest = node_id
        print(f"查找最近节点 ({x}, {y}, {z}): 最近的是 {closest}, 距离: {min_dist**0.5:.2f}")
        return closest
    
    def get_downstream_neighbors(self, node_id):
        """
        获取所有下行邻居节点
        """
        downstream_neighbors = []
        for neighbor, tunnel in self.get_neighbors(node_id):
            node_coords = self.endpoints[node_id]
            neighbor_coords = self.endpoints[neighbor]
            if is_downhill(node_coords, neighbor_coords):
                downstream_neighbors.append((neighbor, tunnel))
        return downstream_neighbors
    
    def get_horizontal_neighbors(self, node_id):
        """
        获取所有水平邻居节点
        """
        horizontal_neighbors = []
        for neighbor, tunnel in self.get_neighbors(node_id):
            node_coords = (self.endpoints[node_id]['x (m)'], 
                          self.endpoints[node_id]['y (m)'], 
                          self.endpoints[node_id]['z (m)'])
            neighbor_coords = (self.endpoints[neighbor]['x (m)'], 
                              self.endpoints[neighbor]['y (m)'], 
                              self.endpoints[neighbor]['z (m)'])
            if is_horizontal(node_coords, neighbor_coords):
                horizontal_neighbors.append((neighbor, tunnel))
        return horizontal_neighbors