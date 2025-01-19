# 以下代码为提示框架
# 请在...处使用一行或多行代码替换
# 请在______处使用一行代码替换
#
# 注意：提示框架代码可以任意修改，以完成程序功能为准

# 2.参照代码模板完善代码，实现下述功能，不得修改其他代码。从键盘输入一个中文字符串变量s，内部包含中文标点符号。
# 问题1：考生文件夹下存在一个文件 PY202-1.py，用jieba分词，计算字符串s中的中文词汇个数，不包括中文标点符号。显示输出分词后的结果，用”/”分隔，以及中文词汇个数。示例如下：
# 输入：
# “工业互联网实施的方式是通过通信、控制和计算技术的交叉应用，建造一个信息物理系统，促进物理系统和数字系统的融合。”
# 输出：
# 工业/互联网/实施/的方式/是/通过/通信/控制/和/计算技术/的/交叉/应用/建造/一个/信息/物理/系统/促进/物理/系统/和/数字/系统/的/融合
# 中文词语数是：27
import jieba

s = input("请输入一段中文，包含逗号和句号：")
words = jieba.lcut(s)  # 使用jieba进行分词

# 去除标点符号
words = [word for word in words if word.strip() and not all('\u4e00' <= char <= '\u9fff' for char in word)]

# 输出分词结果
print("/".join(words))
print("\n中文词语数是：{}".format(len(words)))

all_words = {}
max_count = 0
high_words = ''

# 统计每个词出现的次数
for i in words:
    if i in all_words:
        all_words[i] += 1
    else:
        all_words[i] = 1

    # 更新出现次数最多的词
    if all_words[i] > max_count:
        max_count = all_words[i]
        high_words = i

# 输出每个词及其出现次数
for key in all_words:
    print("{}:{}".format(key, all_words[key]))

print("出现最多的词是({})：{}次".format(high_words, max_count))