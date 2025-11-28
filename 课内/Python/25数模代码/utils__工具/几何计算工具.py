# utils__工具/几何计算工具.py
import numpy as np

def distance_3d(p1, p2):
    """计算两点间三维欧氏距离"""
    return np.sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2 + (p1[2]-p2[2])**2)

def get_slope(p1, p2):
    """计算巷道坡度（z方向变化 / 水平距离）"""
    dx = p2[0] - p1[0]
    dy = p2[1] - p1[1]
    dz = p2[2] - p1[2]
    horizontal_dist = np.sqrt(dx*dx + dy*dy)
    return dz / horizontal_dist if horizontal_dist > 0 else 0

def is_downhill(p1, p2, tolerance=1e-5):
    """
    判断是否下行巷道（从p1到p2）
    tolerance: 容差，考虑测量误差
    """
    return (p2[2] - p1[2]) < -tolerance

def is_uphill(p1, p2, tolerance=1e-5):
    """判断是否上行巷道"""
    return (p2[2] - p1[2]) > tolerance

def is_horizontal(p1, p2, tolerance=1e-3):
    """判断是否水平巷道"""
    return abs(p2[2] - p1[2]) < tolerance

def get_vertical_drop(p1, p2):
    """计算垂直落差"""
    return abs(p2[2] - p1[2])