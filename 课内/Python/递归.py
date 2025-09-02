def fact(n):
    """计算n的阶乘"""
    if n == 1:
        return 1
    return n * fact(n - 1)
print(fact(5))  # 输出120