# 层次分析法AHP基本原理
# 将复杂问题分解为多个层次结构
# 通过两两比较确定各因素相对重要性
# 构造判断矩阵并计算权重
# 进行一致性检验确保判断合理性
import numpy as np
import pandas as pd

class AHP:
    def __init__(self, criteria_matrix, alternatives_matrices):
        """
        初始化AHP模型
        :param criteria_matrix: 准则层判断矩阵
        :param alternatives_matrices: 各准则下方案层判断矩阵列表
        """
        self.criteria_matrix = np.array(criteria_matrix)
        self.alternatives_matrices = [np.array(m) for m in alternatives_matrices]
        
        # 1-9标度表
        self.scale_table = {
            1: "同等重要",
            3: "稍重要",
            5: "明显重要",
            7: "强烈重要",
            9: "极端重要"
        }
    
    def calculate_weights(self, matrix):
        """
        计算判断矩阵的权重向量
        :param matrix: 判断矩阵
        :return: 权重向量
        """
        # 方法1：特征向量法
        eig_vals, eig_vectors = np.linalg.eig(matrix)
        max_eig_idx = np.argmax(eig_vals)
        max_eig_vector = eig_vectors[:, max_eig_idx]
        weights = max_eig_vector / np.sum(max_eig_vector)
        weights = np.real(weights)  # 取实部
        
        return weights
    
    def calculate_consistency_ratio(self, matrix):
        """
        计算一致性比率(CR)
        :param matrix: 判断矩阵
        :return: (一致性指标CI, 一致性比率CR)
        """
        n = matrix.shape[0]
        
        # 计算最大特征值
        eig_vals, _ = np.linalg.eig(matrix)
        max_eig_val = np.max(np.real(eig_vals))
        
        # 计算一致性指标CI
        CI = (max_eig_val - n) / (n - 1) if n > 1 else 0
        
        # 平均随机一致性指标RI（标准值）
        RI_table = {1: 0, 2: 0, 3: 0.58, 4: 0.90, 5: 1.12, 
                   6: 1.24, 7: 1.32, 8: 1.41, 9: 1.45, 10: 1.49}
        RI = RI_table.get(n, 1.49)
        
        # 计算一致性比率CR
        CR = CI / RI if RI != 0 else 0
        
        return CI, CR
    
    def check_consistency(self, matrix, threshold=0.1):
        """
        检查判断矩阵的一致性
        :param matrix: 判断矩阵
        :param threshold: 一致性阈值，默认0.1
        :return: 是否通过一致性检验
        """
        _, CR = self.calculate_consistency_ratio(matrix)
        return CR < threshold
    
    def run_ahp(self):
        """
        执行AHP分析
        :return: 最终方案权重
        """
        # 计算准则层权重
        criteria_weights = self.calculate_weights(self.criteria_matrix)
        print("准则层权重:", criteria_weights)
        
        # 检查准则层一致性
        criteria_CI, criteria_CR = self.calculate_consistency_ratio(self.criteria_matrix)
        print(f"准则层一致性指标CI: {criteria_CI:.4f}")
        print(f"准则层一致性比率CR: {criteria_CR:.4f}")
        print(f"准则层一致性检验: {'通过' if self.check_consistency(self.criteria_matrix) else '不通过'}")
        
        # 计算各方案对每个准则的权重
        alternatives_weights = []
        for i, matrix in enumerate(self.alternatives_matrices):
            weights = self.calculate_weights(matrix)
            alternatives_weights.append(weights)
            
            print(f"\n准则{i+1}下的方案权重:", weights)
            CI, CR = self.calculate_consistency_ratio(matrix)
            print(f"准则{i+1}下的一致性比率CR: {CR:.4f}")
            print(f"准则{i+1}下一致性检验: {'通过' if self.check_consistency(matrix) else '不通过'}")
        
        # 计算方案总权重
        alternatives_weights = np.array(alternatives_weights)
        total_weights = np.dot(criteria_weights, alternatives_weights)
        
        return total_weights

# 示例应用：选择最佳旅游目的地
def example_tourism_selection():
    """
    示例：旅游目的地选择
    准则：景色、费用、居住、饮食、交通
    方案：桂林、黄山、张家界
    """
    
    # 准则层判断矩阵（景色、费用、居住、饮食、交通）
    criteria_matrix = [
        [1,   3,   5,   4,   7],  # 景色
        [1/3, 1,   2,   3,   5],  # 费用
        [1/5, 1/2, 1,   1/2, 2],  # 居住
        [1/4, 1/3, 2,   1,   3],  # 饮食
        [1/7, 1/5, 1/2, 1/3, 1]   # 交通
    ]
    
    # 方案层判断矩阵
    # 对于景色准则
    scenery_matrix = [
        [1,   1/3, 1/2],  # 桂林、黄山、张家界
        [3,   1,   2],
        [2,   1/2, 1]
    ]
    
    # 对于费用准则
    cost_matrix = [
        [1,   3,   5],
        [1/3, 1,   2],
        [1/5, 1/2, 1]
    ]
    
    # 对于居住准则
    living_matrix = [
        [1,   1/2, 1/3],
        [2,   1,   1/2],
        [3,   2,   1]
    ]
    
    # 对于饮食准则
    food_matrix = [
        [1,   2,   3],
        [1/2, 1,   2],
        [1/3, 1/2, 1]
    ]
    
    # 对于交通准则
    traffic_matrix = [
        [1,   1/2, 1/3],
        [2,   1,   1/2],
        [3,   2,   1]
    ]
    
    alternatives_matrices = [
        scenery_matrix,
        cost_matrix,
        living_matrix,
        food_matrix,
        traffic_matrix
    ]
    
    # 执行AHP分析
    ahp = AHP(criteria_matrix, alternatives_matrices)
    result = ahp.run_ahp()
    
    print("\n最终方案权重:")
    destinations = ['桂林', '黄山', '张家界']
    for i, weight in enumerate(result):
        print(f"{destinations[i]}: {weight:.4f}")
    
    # 推荐结果
    best_idx = np.argmax(result)
    print(f"\n推荐选择: {destinations[best_idx]}")

# 简化版AHP实现
def simple_ahp_example():
    """
    简化版AHP示例
    """
    # 准则判断矩阵
    criteria = np.array([
        [1, 3, 5],
        [1/3, 1, 2],
        [1/5, 1/2, 1]
    ])
    
    # 方案判断矩阵
    alternatives_1 = np.array([  # 准则1下
        [1, 2],
        [1/2, 1]
    ])
    
    alternatives_2 = np.array([  # 准则2下
        [1, 3],
        [1/3, 1]
    ])
    
    alternatives_3 = np.array([  # 准则3下
        [1, 1/2],
        [2, 1]
    ])
    
    # 计算权重的简单函数
    def calc_weights(matrix):
        normalized = matrix / matrix.sum(axis=0)
        weights = normalized.mean(axis=1)
        return weights
    
    # 计算各层权重
    criteria_weights = calc_weights(criteria)
    alt_weights_1 = calc_weights(alternatives_1)
    alt_weights_2 = calc_weights(alternatives_2)
    alt_weights_3 = calc_weights(alternatives_3)
    
    # 计算综合得分
    total_score_1 = (criteria_weights * [alt_weights_1[0], alt_weights_2[0], alt_weights_3[0]]).sum()
    total_score_2 = (criteria_weights * [alt_weights_1[1], alt_weights_2[1], alt_weights_3[1]]).sum()
    
    print("准则权重:", criteria_weights)
    print("方案1综合得分:", total_score_1)
    print("方案2综合得分:", total_score_2)

if __name__ == "__main__":
    print("=== AHP旅游目的地选择示例 ===")
    example_tourism_selection()
    
    print("\n=== 简化版AHP示例 ===")
    simple_ahp_example()