#问题一

# 读取文件内容
with open('dir_300.txt', 'r') as file:
    lines = file.readlines()

# 处理文件名信息
photo_dict = {}
for line in lines:
    # 去除换行符并分割文件名
    filename = line.strip()
    parts = filename.split('_')
    photo_number = parts[1].split('.')[0]
    student_ids = parts[0].strip('[]').split(',')
    student_ids = [id.strip().strip("'") for id in student_ids if id.strip().strip("'") != '0']
    
    # 构造字典
    photo_dict[photo_number] = student_ids

# 显示字典中的每行信息
for photo_number, student_ids in photo_dict.items():
    print(f"{photo_number}: {', '.join(student_ids)}")

#问题二

# 构造以学号为关键字的字典
student_count_dict = {}
for student_ids in photo_dict.values():
    for student_id in student_ids:
        if student_id in student_count_dict:
            student_count_dict[student_id] += 1
        else:
            student_count_dict[student_id] = 1

# 显示字典中的每行信息
for student_id, count in student_count_dict.items():
    print(f"{student_id}:{count}")

#问题三

# 计算实际参加测试的学生人数和人均被测次数
num_students = len(student_count_dict)
total_tests = sum(student_count_dict.values())
average_tests_per_student = total_tests / num_students if num_students > 0 else 0

# 显示结果
print(f"实际参加测试的人数是: {num_students}")
print(f"人均被测次数是: {average_tests_per_student:.1f}")
