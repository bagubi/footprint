import functools

def example_func(a, b, c, d=10):
    return a + b + c + d

# 创建偏函数
partial_func = functools.partial(example_func, 1, 2, d=20)

# 查看偏函数的信息
print("函数名称:", partial_func.func.__name__)
print("固定的位置参数:", partial_func.args)
print("固定的关键词参数:", partial_func.keywords)

# 调用偏函数
result = partial_func(3)  # 相当于 example_func(1, 2, 3, d=20)
print("结果:", result)  # 输出: 26