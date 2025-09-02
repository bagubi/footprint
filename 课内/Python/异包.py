# 异常处理
try:
    # 可能出错的代码
    pass
except ExceptionType:
    # 处理特定异常
    pass
except:
    # 处理所有其他异常
    pass
else:
    # 没有异常时执行
    pass
finally:
    # 无论是否有异常都会执行
    pass


# 示例
try:
    num = int(input("请输入一个数字: "))
    result = 10 / num
    print(f"结果是: {result}")
except ValueError:
    print("输入的不是有效数字")
except ZeroDivisionError:
    print("不能除以零")
except Exception as e:
    print(f"发生了未知错误: {e}")
finally:
    print("程序执行完毕")
    

# 常见异常类型
# ValueError: 值错误
# TypeError: 类型错误
# IndexError: 索引错误
# KeyError: 键错误
# FileNotFoundError: 文件未找到错误
# StopIteration: 迭代停止异常（如你代码中的使用）