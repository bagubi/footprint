# 请在______处使用一行代码或表达式替换
# 请在...处使用一行或多行代码替换
#
# 注意：请不要修改其他已给出代码

# 1. 考生文件夹下存在一个文件 PY101.py，请写代码替换横线，不修改其他代码，实现以下功能：
# 键盘输入正整数n，按要求把n输出到屏幕，格式要求：宽度为20个字符，减号字符- 填充，右对齐，带千位分隔符。如果输入正整数超过20位，则按照真实长度输出。例如：键盘输入正整数 n 为 1234 ，屏幕输出：
# ------------1,2348
n = eval(input("请输入正整数："))
print("{:->20,}".format(n))