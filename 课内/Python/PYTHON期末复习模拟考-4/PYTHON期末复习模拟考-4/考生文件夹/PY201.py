# 请在______处使用一行代码或表达式替换
# 请在...处使用一行或多行代码替换
#
# 注意：请不要修改其他已给出代码

# 1. 考生文件夹下存在一个文件 PY201.py，参照代码模板完善代码，实现下述功能，不得修改其他代码。使用turtle库的turtle.seth()函数绘制同心圆套圈，最小的圆圈半径为10像素，不同圆圈之间的半径差是40像素，效果如下图所示。
import turtle
r = 10
dr = 40
head = 90
for i in range(5):  # 设置循环次数为5
    turtle.seth(head)  # 设置乌龟的方向为head
    turtle.circle(r)
    r += dr
    turtle.seth(-head)  # 设置乌龟的方向为-head
    turtle.fd(dr)
    turtle.seth(0)  # 重置乌龟的方向为0度
turtle.done()