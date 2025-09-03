def outer_function():
    def inner_function():
        return "Hello from inner function!"
    return inner_function  # 返回函数而不是调用函数

# 获取返回的函数
my_func = outer_function()
# 调用返回的函数
print(my_func())  # 输出: Hello from inner function!

# 带参数的返回函数
def create_multiplier(n):
    def multiplier(x):
        return x * n
    return multiplier

# 创建不同的乘法器
double = create_multiplier(2)
triple = create_multiplier(3)

print(double)
print(double(5))   # 输出: 10   # 调用double函数，相当于5*2
print(triple(5))   # 输出: 15   # 调用triple函数，相当于5*3

# 闭包（Closure）
# 当内部函数引用了外部函数的变量时，就形成了闭包：
def create_counter():
    count = 0
    def counter():
        nonlocal count
        count += 1
        return count
    return counter

# 创建计数器
my_counter = create_counter()
print(my_counter())  # 输出: 1
print(my_counter())  # 输出: 2
print(my_counter())  # 输出: 3

# 实际应用示例
def create_validator(min_length):
    def validate(password):
        if len(password) >= min_length:
            return True
        else:
            return False
    return validate

# 创建不同要求的验证器
password_checker_8 = create_validator(8)
password_checker_12 = create_validator(12)

print(password_checker_8("hello"))      # 输出: False
print(password_checker_8("hello123"))   # 输出: True
print(password_checker_12("hello123"))  # 输出: False

# 与装饰器的关系
# 装饰器返回一个包装函数，包装函数返回一个被装饰的函数。
# 装饰器本质上是闭包的一种应用。
def my_decorator(func):
    def wrapper():
        print("Before function execution")
        func()
        print("After function execution")
    return wrapper  # 返回包装后的函数

@my_decorator
def say_hello():
    print("Hello!")

# 等价于 say_hello = my_decorator(say_hello)
say_hello()

# 在这里更好理解”@“是装饰器语法糖，用于给函数添加额外的功能，而无需修改原函数的代码。
# 假设定义了一个日志装饰器
def log(func):
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__)
        return func(*args, **kw)
    return wrapper

# 使用装饰器的方式1：传统写法
def my_function(): 
    print("执行函数")

my_function = log(my_function)  # 手动应用装饰器
my_function()  # 输出: call my_function(): 执行函数
# 使用装饰器的方式2：@语法糖
@log
def my_function():
    print("执行函数")