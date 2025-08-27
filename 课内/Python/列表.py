
# 列表
# 登录
# name_list = ['Alice', 'Bob', 'Charlie']
# while True:
#     name = input('请输入用户名：')
#     # 判断用户名是否存在于列表中
#     if name in name_list:
#         print('欢迎回来，' + name + '！')
#     else:
#         name_list.append(name)
#         print('欢迎，' + name + '！')
#         print('当前用户列表：', name_list)
#         break


# 列表推导式
# # 格式1:[表达式 for 循环变量 in 循环列表]
li=[1,2,3,4,5,['*','*']]
# [print(i+1) for i in li]

# # 便捷加入列表
# [li.append(i) for i in range(6,10)]
# print(li)

# 格式2:[表达式 for 循环变量 in 循环列表 if 条件]
[li.append(i) for i in range(0,10) if i%2==0]
print(li)

print(li[2])
print('取出内列表元素:'+li[5][1])
