import pulp

# 创建问题实例（最大化问题）
prob = pulp.LpProblem("Production_Optimization", pulp.LpMaximize)

# 定义变量（下限为0）
x1 = pulp.LpVariable("x1", lowBound=0)
x2 = pulp.LpVariable("x2", lowBound=0)

# 定义目标函数
prob += 3 * x1 + 5 * x2, "Total Profit"

# 添加约束条件
prob += 4 * x1 + 2 * x2 <= 80, "Material A"
prob += x1 + 3 * x2 <= 60, "Material B"

# 求解问题
prob.solve()

# 输出结果
print("Status:", pulp.LpStatus[prob.status])
print("Optimal Solution:")
print(f"x1 = {x1.varValue}, x2 = {x2.varValue}")
print("Max Profit =", pulp.value(prob.objective))