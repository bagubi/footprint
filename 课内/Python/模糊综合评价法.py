# 模糊综合评价法基本原理
# 模糊综合评价法是一种基于模糊数学的综合评价方法，适用于处理具有模糊性、不确定性的问题。

# 基本步骤：
# 确定评价因素集：建立评价指标体系
# 确定评语集：建立评价等级标准
# 确定权重集：确定各指标的权重
# 构建模糊关系矩阵：确定各因素对评语的隶属度
# 模糊综合评价：进行模糊合成运算
import numpy as np
import pandas as pd

class FuzzyComprehensiveEvaluation:
    def __init__(self, factors, comments):
        """
        初始化模糊综合评价模型
        :param factors: 评价因素集
        :param comments: 评语集
        """
        self.factors = factors  # 评价因素
        self.comments = comments  # 评语集
        
    def set_weights(self, weights):
        """
        设置各因素权重
        :param weights: 权重向量
        """
        self.weights = np.array(weights)
        # 权重归一化
        self.weights = self.weights / np.sum(self.weights)
        
    def set_membership_matrix(self, matrix):
        """
        设置隶属度矩阵
        :param matrix: 隶属度矩阵，行表示因素，列表示评语等级
        """
        self.membership_matrix = np.array(matrix)
        
    def evaluate(self, method='max_min'):
        """
        进行模糊综合评价
        :param method: 合成算子方法 ('max_min', 'max_product', 'weighted_average')
        :return: 综合评价结果
        """
        if method == 'max_min':
            # max-min合成算子
            result = np.zeros(len(self.comments))
            for i in range(len(self.comments)):
                result[i] = np.max(np.minimum(self.weights, self.membership_matrix[:, i]))
                
        elif method == 'max_product':
            # max-product合成算子
            result = np.zeros(len(self.comments))
            for i in range(len(self.comments)):
                result[i] = np.max(self.weights * self.membership_matrix[:, i])
                
        elif method == 'weighted_average':
            # 加权平均合成
            result = np.dot(self.weights, self.membership_matrix)
            
        # 结果归一化
        result = result / np.sum(result)
        return result
    
    def get_evaluation_level(self, result):
        """
        根据评价结果确定等级
        :param result: 评价结果向量
        :return: 最大隶属度对应的等级
        """
        max_idx = np.argmax(result)
        return self.comments[max_idx], result[max_idx]

# 示例：教学质量模糊综合评价
def example_teaching_quality():
    """
    教学质量模糊综合评价示例
    """
    # 评价因素集
    factors = ['教学态度', '教学内容', '教学方法', '教学效果']
    
    # 评语集
    comments = ['很好', '较好', '一般', '较差', '很差']
    
    # 权重向量（可根据AHP方法确定）
    weights = [0.2, 0.3, 0.3, 0.2]
    
    # 隶属度矩阵（通过专家打分或统计确定）
    membership_matrix = [
        [0.7, 0.2, 0.1, 0.0, 0.0],  # 教学态度
        [0.6, 0.3, 0.1, 0.0, 0.0],  # 教学内容
        [0.5, 0.4, 0.1, 0.0, 0.0],  # 教学方法
        [0.6, 0.3, 0.1, 0.0, 0.0]   # 教学效果
    ]
    
    # 创建模糊综合评价模型
    fuzzy_eval = FuzzyComprehensiveEvaluation(factors, comments)
    fuzzy_eval.set_weights(weights)
    fuzzy_eval.set_membership_matrix(membership_matrix)
    
    # 进行评价
    print("=== 教学质量模糊综合评价 ===")
    print("评价因素:", factors)
    print("评语集:", comments)
    print("权重向量:", weights)
    print("隶属度矩阵:")
    for i, factor in enumerate(factors):
        print(f"  {factor}: {membership_matrix[i]}")
    
    # 使用不同方法进行评价
    methods = ['max_min', 'max_product', 'weighted_average']
    for method in methods:
        result = fuzzy_eval.evaluate(method)
        level, score = fuzzy_eval.get_evaluation_level(result)
        print(f"\n{method}方法评价结果: {result}")
        print(f"评价等级: {level} (隶属度: {score:.4f})")

# 简化的模糊综合评价实现
def simple_fuzzy_evaluation():
    """
    简化版模糊综合评价示例
    """
    # 权重向量
    weights = np.array([0.3, 0.4, 0.3])
    
    # 隶属度矩阵
    R = np.array([
        [0.8, 0.15, 0.05, 0, 0],  # 指标1
        [0.6, 0.3, 0.1, 0, 0],    # 指标2
        [0.7, 0.2, 0.1, 0, 0]     # 指标3
    ])
    
    # 评语集
    comments = ['优', '良', '中', '较差', '差']
    
    # 模糊合成 (加权平均)
    B = np.dot(weights, R)
    
    print("=== 简化版模糊综合评价 ===")
    print("权重:", weights)
    print("隶属度矩阵:")
    print(R)
    print("综合评价结果:", B)
    
    # 确定评价等级
    max_index = np.argmax(B)
    print(f"评价等级: {comments[max_index]} (隶属度: {B[max_index]:.4f})")
    
    # 计算加权平均分（如果有分数）
    scores = [95, 85, 75, 65, 55]  # 各等级的代表分数
    weighted_score = np.sum(B * scores)
    print(f"加权平均分: {weighted_score:.2f}")

# 多级模糊综合评价
def multi_level_fuzzy_evaluation():
    """
    多级模糊综合评价示例
    """
    print("\n=== 多级模糊综合评价示例 ===")
    print("一级评价: 各子系统评价")
    print("二级评价: 系统总体评价")
    
    # 一级评价 - 子系统1
    weights1 = np.array([0.4, 0.6])
    R1 = np.array([
        [0.7, 0.2, 0.1, 0, 0],
        [0.6, 0.3, 0.1, 0, 0]
    ])
    B1 = np.dot(weights1, R1)
    
    # 一级评价 - 子系统2
    weights2 = np.array([0.5, 0.3, 0.2])
    R2 = np.array([
        [0.8, 0.15, 0.05, 0, 0],
        [0.7, 0.2, 0.1, 0, 0],
        [0.6, 0.3, 0.1, 0, 0]
    ])
    B2 = np.dot(weights2, R2)
    
    # 二级评价 - 总体评价
    system_weights = np.array([0.4, 0.6])  # 两个子系统的权重
    overall_R = np.array([B1, B2])  # 各子系统的评价结果作为输入
    overall_B = np.dot(system_weights, overall_R)
    
    comments = ['优', '良', '中', '较差', '差']
    max_index = np.argmax(overall_B)
    
    print(f"子系统1评价结果: {B1}")
    print(f"子系统2评价结果: {B2}")
    print(f"系统总体评价结果: {overall_B}")
    print(f"最终评价等级: {comments[max_index]} (隶属度: {overall_B[max_index]:.4f})")

if __name__ == "__main__":
    # 运行示例
    example_teaching_quality()
    simple_fuzzy_evaluation()
    multi_level_fuzzy_evaluation()