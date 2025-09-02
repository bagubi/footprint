# 可迭代对象（Iterable）:可以被迭代的对象，但不一定能记住当前迭代位置
# 可迭代对象是实现了 __iter__() 方法的对象，可以使用 for...in 循环进行遍历。
# 常见的可迭代对象
my_list = [1, 2, 3]  # 列表
my_tuple = (1, 2, 3)  # 元组
my_string = "hello"  # 字符串
my_dict = {"a": 1, "b": 2}  # 字典

# 都可以使用 for 循环遍历
for item in my_list:
    print(item)


# 迭代器（Iterator）:不仅可迭代，还能记住当前迭代位置，可以逐个访问元素
# 迭代器是实现了 __iter__() 和 __next__() 方法的对象，可以使用 next() 函数获取下一个元素。
# 创建迭代器
my_list = [1, 2, 3]
iterator = iter(my_list)  # 使用 iter() 获取迭代器

# 使用 next() 获取元素
print(next(iterator))  # 输出: 1
print(next(iterator))  # 输出: 2
print(next(iterator))  # 输出: 3
# print(next(iterator))  # 会抛出 StopIteration 异常

# 自定义迭代器示例
class MyIterator:
    def __init__(self, data):
        self.data = data      # 存储要迭代的数据
        self.index = 0        # 初始化索引为0，用于跟踪当前位置
    
    def __iter__(self):
        return self           # 返回自身，因为这个类既是迭代器又是可迭代对象
    
    def __next__(self):
        if self.index >= len(self.data):  # 检查是否已经迭代完所有元素
            raise StopIteration           # 如果是，则抛出StopIteration异常
        value = self.data[self.index]     # 获取当前位置的值
        self.index += 1                   # 索引递增，指向下一个位置
        return value                      # 返回当前值

# 使用自定义迭代器
my_iter = MyIterator([1, 2, 3, 4])
for item in my_iter:
    print(item)