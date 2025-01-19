# 字典
# key是键，value是值
my_dict = {
    'key1': 'value1',
    'key2': 'value2',
    'key3': 'value3'
}

# 增加一个新的键值对
my_dict['key4'] = 'value4'

# 删除一个键值对
del my_dict['key1']

# 或者使用 pop 方法删除并返回被删除的值
value = my_dict.pop('key2')

# 修改一个已有的键的值
my_dict['key3'] = 'new_value3'

# 查询一个键的值
value = my_dict['key3']

# 使用 get 方法查询，如果键不存在则返回默认值
value = my_dict.get('key3', 'default_value')

print(my_dict)