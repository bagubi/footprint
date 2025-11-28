#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import numpy as np
import matplotlib.pyplot as plt
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import pandas as pd
from matplotlib.colors import LinearSegmentedColormap
from matplotlib.animation import FuncAnimation
from PIL import Image
import os

# 设置中文字体支持
plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False


class MineVisualization:
    def __init__(self, network, arrival_times=None, full_times=None, escape_paths=None, problem_number=1):
        """
        矿井可视化类
        """
        self.network = network
        self.arrival_times = arrival_times or {}
        self.full_times = full_times or {}
        self.escape_paths = escape_paths or {}
        self.problem_number = problem_number

        # 颜色配置
        self.colors = {
            'tunnel': 'lightblue',
            'node': 'black',
            'flooded': 'blue',
            'source': 'red',
            'exit': 'green',
            'miner': 'orange',
            'dry_tunnel': 'lightgray'
        }

    def plot_3d_network_structure(self, source_points=None, exit_points=None, miner_points=None, save_path=None):
        """
        图1: 矿井巷道网络三维结构图
        """
        fig = go.Figure()

        # 绘制所有巷道，但只标注第一条
        first_tunnel = True
        for tunnel in self.network.tunnels:
            p1, p2 = tunnel['coords1'], tunnel['coords2']
            # 只对第一条巷道显示图例，线宽从4调整为2
            show_legend = first_tunnel
            fig.add_trace(go.Scatter3d(
                x=[p1[0], p2[0], None],
                y=[p1[1], p2[1], None],
                z=[p1[2], p2[2], None],
                mode='lines',
                line=dict(color=self.colors['tunnel'], width=2),  
                name='巷道' if show_legend else None,
                showlegend=show_legend,
                hoverinfo='text',
                text=f"巷道 {tunnel['id']}<br>长度: {tunnel['length']:.1f}m<br>坡度: {tunnel['slope']:.3f}"
            ))
            first_tunnel = False  # 确保只有第一条巷道显示图例

        # 绘制所有节点，节点大小也可以适当调小
        node_x, node_y, node_z = [], [], []
        node_text = []
        for node_id, attrs in self.network.endpoints.items():
            node_x.append(attrs['x (m)'])
            node_y.append(attrs['y (m)'])
            node_z.append(attrs['z (m)'])
            node_text.append(f"节点 {node_id}<br>坐标: ({attrs['x (m)']:.1f}, {attrs['y (m)']:.1f}, {attrs['z (m)']:.1f})")

        fig.add_trace(go.Scatter3d(
            x=node_x, y=node_y, z=node_z,
            mode='markers',
            marker=dict(size=2, color=self.colors['node'], opacity=0.8),
            name='巷道节点',
            text=node_text,
            hoverinfo='text',
            showlegend=True
        ))

        # 标记特殊点
        legend_added = set()
        if source_points:
            for i, (x, y, z) in enumerate(source_points):
                show_legend = '突水点' not in legend_added
                fig.add_trace(go.Scatter3d(
                    x=[x], y=[y], z=[z],
                    mode='markers',
                    marker=dict(size=8, color=self.colors['source'], symbol='diamond'),
                    name='突水点' if show_legend else '',
                    text=f'突水点 {i + 1}<br>坐标: ({x:.2f}, {y:.2f}, {z:.2f})',
                    showlegend=show_legend
                ))
                legend_added.add('突水点')

        if exit_points:
            for i, (x, y, z) in enumerate(exit_points):
                show_legend = '安全出口' not in legend_added
                fig.add_trace(go.Scatter3d(
                    x=[x], y=[y], z=[z],
                    mode='markers',
                    marker=dict(size=8, color=self.colors['exit'], symbol='square'),
                    name='安全出口' if show_legend else '',
                    text=f'出口 {i + 1}<br>坐标: ({x:.2f}, {y:.2f}, {z:.2f})',
                    showlegend=show_legend
                ))
                legend_added.add('安全出口')

        if miner_points:
            for i, (x, y, z) in enumerate(miner_points):
                show_legend = '矿工位置' not in legend_added
                fig.add_trace(go.Scatter3d(
                    x=[x], y=[y], z=[z],
                    mode='markers',
                    marker=dict(size=6, color=self.colors['miner'], symbol='circle'),
                    name='矿工位置' if show_legend else '',
                    text=f'矿工 {i + 1}<br>坐标: ({x:.2f}, {y:.2f}, {z:.2f})',
                    showlegend=show_legend
                ))
                legend_added.add('矿工位置')

        fig.update_layout(
            title=dict(
                text=f'矿井巷道网络三维结构图',
                x=0.5,
                xanchor='center',
                font=dict(size=20)
            ),
            scene=dict(
                xaxis_title='X坐标 (m)',
                yaxis_title='Y坐标 (m)',
                zaxis_title='高程Z (m)',
                camera=dict(eye=dict(x=1.5, y=1.5, z=1.2))
            ),
            width=1200,
            height=800,
            legend=dict(
                x=0.8,
                y=0.9,
                bgcolor='rgba(255,255,255,0.8)'
            )
        )

        if save_path:
            if not save_path.lower().endswith('.html'):
                save_path += '.html'
            fig.write_html(save_path)
            print(f"3D网络结构图已保存至: {save_path}")
        return fig

    def plot_flood_propagation_sequence(self, time_points, save_path=None):
        """
        图2: 单突水点水流漫延过程时序图
        """
        n_plots = min(4, len(time_points))
        fig, axes = plt.subplots(2, 2, figsize=(16, 14))
        axes = axes.flatten()

        # 创建颜色映射和图例
        cmap = LinearSegmentedColormap.from_list('flood_cmap', ['white', 'lightblue', 'darkblue'])
        legend_elements = [
            plt.Line2D([0], [0], color='blue', linewidth=3, label='已淹没巷道'),
            plt.Line2D([0], [0], color='gray', linewidth=1, alpha=0.3, label='未淹没巷道'),
            plt.Line2D([0], [0], marker='o', color='b', markersize=6, linestyle='', label='已淹没节点'),
            plt.Line2D([0], [0], marker='o', color='k', markersize=4, alpha=0.3, linestyle='', label='未淹没节点')
        ]

        for idx, time_point in enumerate(time_points[:n_plots]):
            ax = axes[idx]
            
            # 绘制基础网络（未淹没巷道）
            for tunnel in self.network.tunnels:
                p1, p2 = tunnel['coords1'], tunnel['coords2']
                ax.plot([p1[0], p2[0]], [p1[1], p2[1]], 
                       color=self.colors['dry_tunnel'], linewidth=1, alpha=0.3)

            # 绘制已淹没巷道
            flooded_count = 0
            for tunnel in self.network.tunnels:
                n1_time = self.arrival_times.get(tunnel['n1'], float('inf'))
                n2_time = self.arrival_times.get(tunnel['n2'], float('inf'))

                if n1_time <= time_point or n2_time <= time_point:
                    p1, p2 = tunnel['coords1'], tunnel['coords2']
                    flood_level = min(1.0, max(0, (time_point - min(n1_time, n2_time)) / 2.0))
                    ax.plot([p1[0], p2[0]], [p1[1], p2[1]], 
                           color=cmap(flood_level), linewidth=3, alpha=0.8)
                    flooded_count += 1

            # 绘制节点
            for node_id, attrs in self.network.endpoints.items():
                if self.arrival_times.get(node_id, float('inf')) <= time_point:
                    ax.plot(attrs['x (m)'], attrs['y (m)'], 'bo', markersize=6, alpha=0.8, label='已淹没节点' if idx == 0 else "")
                else:
                    ax.plot(attrs['x (m)'], attrs['y (m)'], 'ko', markersize=3, alpha=0.3, label='未淹没节点' if idx == 0 else "")

            ax.set_title(f't = {time_point:.1f} 分钟\n已淹没: {flooded_count}/{len(self.network.tunnels)}条巷道', 
                        fontsize=12, pad=20)
            ax.set_xlabel('X坐标 (m)', fontsize=10)
            ax.set_ylabel('Y坐标 (m)', fontsize=10)
            ax.grid(True, alpha=0.2)
            ax.tick_params(axis='both', which='major', labelsize=9)

        # 添加整体标题和图例
        plt.suptitle('单突水点水流漫延过程时序图\n(颜色深度表示淹没程度)', 
                fontsize=16, y=0.95)
        
        # 添加图例
        fig.legend(handles=legend_elements, loc='lower center', ncol=4, 
                  bbox_to_anchor=(0.5, 0.02), fontsize=10, framealpha=0.9)

        plt.tight_layout()
        plt.subplots_adjust(bottom=0.15)  # 为图例留出空间

        if save_path:
            if not save_path.lower().endswith('.png'):
                save_path += '.png'
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
            print(f"水流时序图已保存至: {save_path}")
        return fig

    def plot_dual_flood_comparison(self, arrival_single, arrival_dual, time_point, save_path=None):
        """
        图3: 双突水点水流漫延对比图
        """
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(18, 8))
        
        # 设置统一的颜色和图例
        legend_elements = [
            plt.Line2D([0], [0], color='blue', linewidth=2, label='已淹没巷道'),
            plt.Line2D([0], [0], color='gray', linewidth=1, alpha=0.2, label='未淹没巷道'),
            plt.Line2D([0], [0], marker='o', color='b', markersize=5, linestyle='', label='已淹没节点'),
            plt.Line2D([0], [0], marker='o', color='k', markersize=3, alpha=0.3, linestyle='', label='未淹没节点')
        ]

        # 单突水点情况
        self._plot_flood_at_time(ax1, arrival_single, time_point, '单突水点情景')
        ax1.set_title('单突水点水流漫延', fontsize=14, pad=15)

        # 双突水点情况  
        self._plot_flood_at_time(ax2, arrival_dual, time_point, '双突水点情景')
        ax2.set_title('双突水点水流漫延', fontsize=14, pad=15)

        plt.suptitle(f'单双突水点水流漫延对比 (时间: {time_point:.1f} 分钟)', 
                fontsize=16, y=0.95)
        
        # 添加统一图例
        fig.legend(handles=legend_elements, loc='lower center', ncol=4, 
                  bbox_to_anchor=(0.5, 0.05), fontsize=11, framealpha=0.9)

        plt.tight_layout()
        plt.subplots_adjust(bottom=0.15)

        if save_path:
            if not save_path.lower().endswith('.png'):
                save_path += '.png'
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
            print(f"双突水点对比图已保存至: {save_path}")
        return fig

    def _plot_flood_at_time(self, ax, arrival_times, time_point, title):
        """辅助函数：在指定时间点绘制水流情况"""
        # 绘制基础网络
        for tunnel in self.network.tunnels:
            p1, p2 = tunnel['coords1'], tunnel['coords2']
            ax.plot([p1[0], p2[0]], [p1[1], p2[1]], 'gray', alpha=0.2, linewidth=1)

        # 绘制已淹没巷道
        flooded_count = 0
        for tunnel in self.network.tunnels:
            n1_time = arrival_times.get(tunnel['n1'], float('inf'))
            n2_time = arrival_times.get(tunnel['n2'], float('inf'))

            if n1_time <= time_point or n2_time <= time_point:
                p1, p2 = tunnel['coords1'], tunnel['coords2']
                ax.plot([p1[0], p2[0]], [p1[1], p2[1]], 'blue', linewidth=2, alpha=0.7)
                flooded_count += 1

        # 绘制节点
        for node_id, attrs in self.network.endpoints.items():
            if arrival_times.get(node_id, float('inf')) <= time_point:
                ax.plot(attrs['x (m)'], attrs['y (m)'], 'bo', markersize=5, alpha=0.8)
            else:
                ax.plot(attrs['x (m)'], attrs['y (m)'], 'ko', markersize=3, alpha=0.3)

        ax.set_title(f'{title}\n已淹没巷道: {flooded_count}', fontsize=12, pad=10)
        ax.set_xlabel('X坐标 (m)', fontsize=10)
        ax.set_ylabel('Y坐标 (m)', fontsize=10)
        ax.grid(True, alpha=0.3)
        ax.tick_params(axis='both', which='major', labelsize=9)

    def plot_miner_escape_paths(self, save_path=None):
        """
        图4: 不同矿工的逃生路径可视化
        """
        fig, ax = plt.subplots(figsize=(14, 10))

        # 绘制所有巷道背景
        for tunnel in self.network.tunnels:
            p1, p2 = tunnel['coords1'], tunnel['coords2']
            ax.plot([p1[0], p2[0]], [p1[1], p2[1]], 
                   color=self.colors['dry_tunnel'], linewidth=1, alpha=0.3)

        # 定义颜色和标记
        colors = ['red', 'blue', 'green', 'purple', 'orange']
        markers = ['o', 's', '^', 'D', 'v']

        # 绘制每个矿工的逃生路径
        for i, (miner_id, path_data) in enumerate(self.escape_paths.items()):
            if i >= len(colors):
                break

            path_nodes = path_data['path_nodes']
            path_x = [self.network.endpoints[node]['x (m)'] for node in path_nodes]
            path_y = [self.network.endpoints[node]['y (m)'] for node in path_nodes]

            # 绘制路径线
            ax.plot(path_x, path_y, color=colors[i], linewidth=3, 
                    label=f'矿工{miner_id.split("_")[1]}路径', alpha=0.8)

            # 绘制路径节点
            ax.scatter(path_x, path_y, color=colors[i], s=60, marker=markers[i], alpha=0.7)

            # 标记起点和终点
            ax.scatter(path_x[0], path_y[0], color=colors[i], s=200, marker='*', 
                      edgecolors='black', linewidth=2, zorder=5)
            ax.scatter(path_x[-1], path_y[-1], color=colors[i], s=200, marker='X', 
                      edgecolors='black', linewidth=2, zorder=5)

        # 添加图例元素
        legend_elements = [
            plt.Line2D([0], [0], color='red', linewidth=3, label='逃生路径'),
            plt.Line2D([0], [0], marker='*', color='w', markerfacecolor='red', markersize=12, 
                      label='矿工起点', markeredgecolor='black', markeredgewidth=1),
            plt.Line2D([0], [0], marker='X', color='w', markerfacecolor='red', markersize=10, 
                      label='安全出口', markeredgecolor='black', markeredgewidth=1),
            plt.Line2D([0], [0], color='gray', linewidth=1, alpha=0.3, label='巷道网络')
        ]

        ax.set_title('不同矿工的最佳逃生路径可视化', fontsize=16, pad=20)
        ax.set_xlabel('X坐标 (m)', fontsize=12)
        ax.set_ylabel('Y坐标 (m)', fontsize=12)
        ax.grid(True, alpha=0.3)
        
        # 添加图例
        ax.legend(handles=legend_elements, loc='upper left', bbox_to_anchor=(1.05, 1), 
                 fontsize=10, framealpha=0.9)

        plt.tight_layout()

        if save_path:
            if not save_path.lower().endswith('.png'):
                save_path += '.png'
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
            print(f"逃生路径图已保存至: {save_path}")
        return fig

    def plot_time_distribution(self, save_path=None):
        """
        图5: 水流到达时间与巷道充满时间统计分布
        """
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 7))

        # 水流到达时间分布
        valid_arrival_times = [t for t in self.arrival_times.values() if t < float('inf')]
        n1, bins1, patches1 = ax1.hist(valid_arrival_times, bins=20, alpha=0.7, 
                                    color='skyblue', edgecolor='black')
        
        # 设置颜色渐变
        for i, patch in enumerate(patches1):
            patch.set_facecolor(plt.cm.Blues(i / len(patches1)))
        
        ax1.set_xlabel('水流到达时间 (分钟)', fontsize=12)
        ax1.set_ylabel('节点数量', fontsize=12)
        ax1.set_title('节点水流到达时间分布', fontsize=14)
        ax1.grid(True, alpha=0.3)

        # 添加统计信息
        stats_text1 = f'统计信息:\n平均: {np.mean(valid_arrival_times):.2f} min\n最大: {np.max(valid_arrival_times):.2f} min\n最小: {np.min(valid_arrival_times):.2f} min\n总数: {len(valid_arrival_times)}个节点'
        ax1.text(0.7, 0.9, stats_text1, transform=ax1.transAxes, 
                bbox=dict(boxstyle="round", facecolor="white", alpha=0.8),
                fontsize=10, verticalalignment='top')

        # 巷道充满时间分布
        valid_full_times = [t for t in self.full_times.values() if t < float('inf')]
        n2, bins2, patches2 = ax2.hist(valid_full_times, bins=20, alpha=0.7, 
                                    color='lightcoral', edgecolor='black')
        
        # 设置颜色渐变
        for i, patch in enumerate(patches2):
            patch.set_facecolor(plt.cm.Reds(i / len(patches2)))
        
        ax2.set_xlabel('巷道充满时间 (分钟)', fontsize=12)
        ax2.set_ylabel('巷道数量', fontsize=12)
        ax2.set_title('巷道充满时间分布', fontsize=14)
        ax2.grid(True, alpha=0.3)

        # 添加统计信息
        stats_text2 = f'统计信息:\n平均: {np.mean(valid_full_times):.2f} min\n最大: {np.max(valid_full_times):.2f} min\n最小: {np.min(valid_full_times):.2f} min\n总数: {len(valid_full_times)}条巷道'
        ax2.text(0.7, 0.9, stats_text2, transform=ax2.transAxes, 
                bbox=dict(boxstyle="round", facecolor="white", alpha=0.8),
                fontsize=10, verticalalignment='top')

        plt.suptitle('水流漫延时间统计分布', fontsize=16)
        plt.tight_layout()

        if save_path:
            if not save_path.lower().endswith('.png'):
                save_path += '.png'
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
            print(f"时间分布图已保存至: {save_path}")
        return fig

    def plot_escape_time_vs_length(self, save_path=None):
        """
        图6: 逃生时间与路径长度关系散点图
        """
        fig, ax = plt.subplots(figsize=(12, 8))

        # 准备数据
        times, lengths, miner_ids = [], [], []

        for miner_id, data in self.escape_paths.items():
            times.append(data['escape_time'])
            lengths.append(data['path_length'])
            miner_ids.append(miner_id.split('_')[1])

        # 绘制散点图
        scatter = ax.scatter(lengths, times, s=120, alpha=0.7,
                            c=range(len(times)), cmap='viridis', 
                            edgecolors='black', linewidth=0.5)

        # 添加标注
        for i, (length, time, miner_id) in enumerate(zip(lengths, times, miner_ids)):
            ax.annotate(f'矿工{miner_id}', (length, time), 
                    xytext=(8, 8), textcoords='offset points', 
                    fontsize=10, alpha=0.8,
                    bbox=dict(boxstyle="round,pad=0.3", facecolor="yellow", alpha=0.5))

        # 添加趋势线
        if len(lengths) > 1:
            z = np.polyfit(lengths, times, 1)
            p = np.poly1d(z)
            ax.plot(lengths, p(lengths), "r--", alpha=0.7, linewidth=2,
                label=f'趋势线: y = {z[0]:.3f}x + {z[1]:.3f}')

        ax.set_xlabel('逃生路径长度 (米)', fontsize=12)
        ax.set_ylabel('逃生所需时间 (秒)', fontsize=12)
        ax.set_title('逃生时间与路径长度关系分析', fontsize=14, pad=20)
        ax.grid(True, alpha=0.3)
        ax.legend(fontsize=11)

        # 添加相关系数和统计信息
        if len(lengths) > 1:
            correlation = np.corrcoef(lengths, times)[0, 1]
            stats_text = f'相关系数: {correlation:.3f}\n矿工数量: {len(lengths)}'
            ax.text(0.05, 0.95, stats_text, transform=ax.transAxes, 
                bbox=dict(boxstyle="round", facecolor="white", alpha=0.8),
                fontsize=11, verticalalignment='top')

        # 添加颜色条
        if len(times) > 1:
            cbar = plt.colorbar(scatter, ax=ax)
            cbar.set_label('矿工编号', fontsize=11)

        if save_path:
            if not save_path.lower().endswith('.png'):
                save_path += '.png'
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
            print(f"散点图已保存至: {save_path}")
        return fig


def generate_all_figures(network, arrival_times, full_times, escape_paths,
                         source_points, exit_points, miner_points, output_dir="results/figures",
                         problem_number=1, dual_arrival_times=None):
    """
    生成所有6个图表
    """
    os.makedirs(output_dir, exist_ok=True)

    # 初始化可视化类
    viz = MineVisualization(network, arrival_times, full_times, escape_paths, problem_number)

    # 生成图1: 3D网络结构图
    print(f"生成问题{problem_number}-图1: 3D网络结构图...")
    fig1_save_path = os.path.join(output_dir, f"问题{problem_number}-图1-3D网络结构图")
    fig1 = viz.plot_3d_network_structure(source_points, exit_points, miner_points, fig1_save_path)

    # 生成图2: 水流时序图
    print(f"生成问题{problem_number}-图2: 水流时序图...")
    time_points = [2.0, 5.0, 8.0, 12.0]
    fig2_save_path = os.path.join(output_dir, f"问题{problem_number}-图2-水流时序图")
    fig2 = viz.plot_flood_propagation_sequence(time_points, fig2_save_path)

    # 生成图3: 双突水点对比图
    fig3 = None
    if dual_arrival_times and problem_number in [3, 4]:
        print(f"生成问题{problem_number}-图3: 双突水点对比图...")
        fig3_save_path = os.path.join(output_dir, f"问题{problem_number}-图3-双突水点对比图")
        fig3 = viz.plot_dual_flood_comparison(arrival_times, dual_arrival_times, 8.0, fig3_save_path)

    # 生成图4: 逃生路径图
    print(f"生成问题{problem_number}-图4: 逃生路径图...")
    fig4_save_path = os.path.join(output_dir, f"问题{problem_number}-图4-逃生路径图")
    fig4 = viz.plot_miner_escape_paths(fig4_save_path)

    # 生成图5: 时间分布图
    print(f"生成问题{problem_number}-图5: 时间分布图...")
    fig5_save_path = os.path.join(output_dir, f"问题{problem_number}-图5-时间分布图")
    fig5 = viz.plot_time_distribution(fig5_save_path)

    # 生成图6: 散点图
    print(f"生成问题{problem_number}-图6: 散点图...")
    fig6_save_path = os.path.join(output_dir, f"问题{problem_number}-图6-散点图")
    fig6 = viz.plot_escape_time_vs_length(fig6_save_path)

    print(f"问题{problem_number}所有图表生成完成！")
    
    figures = [fig1, fig2, fig3, fig4, fig5, fig6]
    return [fig for fig in figures if fig is not None]