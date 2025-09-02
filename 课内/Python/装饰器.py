# 装饰器（Decorators）
def decorator_function(original_function):
    def wrapper_function(*args, **kwargs):
        # 在原函数执行前的操作
        result = original_function(*args, **kwargs)
        # 在原函数执行后的操作
        return result
    return wrapper_function

@decorator_function
def my_function():
    pass


# 示例1：简单装饰器
def my_decorator(func):
    def wrapper():
        print("函数执行前")
        func()
        print("函数执行后")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
# 输出:
# 函数执行前
# Hello!
# 函数执行后

# 示例2：带参数的装饰器
def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
# 输出:
# Hello, Alice!
# Hello, Alice!
# Hello, Alice!


# 常见内置装饰器
# @property: 将方法变为属性
# @staticmethod: 静态方法
# @classmethod: 类方法
# @abstractmethod: 抽象方法