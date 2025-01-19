# 以下代码为提示框架
# 请在...处使用一行或多行代码替换
# 请在______处使用一行代码替换
#
# 注意：提示框架代码可以任意修改，以完成程序功能为准


file = open("命运.txt",'r')
lines = file.read()
d = {}
for word in lines:
    if word not in "\n":
        d[word] = d.get(word,0) + 1
file.close()
ls = list(d.items())
ls.sort(key= lambda x:x[1],reverse=True)
for i in range(10):
    print(ls[i][0],end="")

