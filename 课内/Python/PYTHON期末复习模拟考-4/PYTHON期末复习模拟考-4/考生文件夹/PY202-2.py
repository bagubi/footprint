# 以下代码为提示框架
# 请在...处使用一行或多行代码替换
# 请在______处使用一行代码替换
#
# 注意：提示框架代码可以任意修改，以完成程序功能为准

# 问题2：考生文件夹下存在一个文件 PY202-2.py，在问题1的基础上，统计分词后的词汇出现的次数，用字典结构保存。显示输出每个词汇出现的次数，以及出现次数最多的词汇。如果有多个词汇出现次数一样多，都要显示出来。示例如下：
# 继续输出：
# 控制: 1
# 物理: 2
# 通信: 1
# 交叉: 1
# 互联网: 1
# …
# 出现最多的词是（的  系统）: 3次

# 假设分词后的词汇列表为 word_list
word_list = [...]  # 这里应该是从问题1中得到的分词结果

# 1. 使用字典统计每个词汇出现的次数
word_count = {}
for word in word_list:
    if word in word_count:
        word_count[word] += 1
    else:
        word_count[word] = 1

# 2. 输出每个词汇出现的次数
for word, count in word_count.items():
    print(f"{word}: {count}")

# 3. 找出出现次数最多的词汇
max_count = max(word_count.values())
most_frequent_words = [word for word, count in word_count.items() if count == max_count]

# 4. 输出出现次数最多的词汇
most_frequent_words_str = " ".join(most_frequent_words)
print(f"出现最多的词是（{most_frequent_words_str}）: {max_count}次")