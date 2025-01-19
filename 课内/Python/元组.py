# 元组只支持查找操作
tua=(1,2,3,4,5,'a','b',[1,2,3])
# 只有一个元素时,末尾要加逗号
tub=(1,)
# 空元组
tuc=()
print(type(tua)) 

tua = (1, 2, 3, 4, 5, 'a', 'b', [1, 2, 3])

# count(value): 返回元组中值为value的元素个数
count_of_3 = tua.count(3)  # 结果为 1，因为数字 3 在元组中出现了一次
count_of_a = tua.count('a')  # 结果为 1，因为字符 'a' 在元组中出现了一次

# index(value, start, end): 返回元组中第一个值为value的元素的索引位置。
# start和end参数是可选的，用于指定搜索的起始和结束位置。
index_of_4 = tua.index(4)  # 结果为 3，因为数字 4 在元组中的索引位置是 3
index_of_b = tua.index('b')  # 结果为 5，因为字符 'b' 在元组中的索引位置是 5

# 使用 len 函数,len(tuple): 返回元组中元素的个数。
length_of_tua = len(tua)  # 结果为 8，因为元组中有 8 个元素

print("Count of 3:", count_of_3)
print("Count of 'a':", count_of_a)
print("Index of 4:", index_of_4)
print("Index of 'b':", index_of_b)
print("Length of tua:", length_of_tua)