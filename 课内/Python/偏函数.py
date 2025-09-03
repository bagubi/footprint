# 偏函数（Partial Function）
# 它可以将一个函数的部分参数固定住，并返回一个新的函数。

# 使用 functools.partial 创建偏函数
import functools

# 原始函数
def multiply(x, y, z):
    return x * y * z

# 创建偏函数 - 固定第一个参数为2
double = functools.partial(multiply, 2)
print(double(3, 4))  # 输出: 24 (相当于 multiply(2, 3, 4))

# 创建偏函数 - 固定前两个参数
multiply_by_6 = functools.partial(multiply, 2, 3)
print(multiply_by_6(4))  # 输出: 24 (相当于 multiply(2, 3, 4))

# 创建偏函数 - 使用关键字参数
multiply_by_10 = functools.partial(multiply, x=2, y=5)
print(multiply_by_10(3))  # 输出: 30 (相当于 multiply(x=2, y=5, z=3))



# 偏函数的属性
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