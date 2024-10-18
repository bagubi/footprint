import json
import re
import os
   
file_path = "main.json"

if not os.path.isfile(file_path):
       # 创建一个空的JSON文件
       with open(file_path, "w") as f:
           json.dump([], f)

class AddressBook:
    def __init__(self, filename="main.json"):
        self.filename = filename
        self.address_book = []

    def load_contacts(self):
        try:
            with open(self.filename, 'r', encoding='utf-8') as file:
                data_loaded = json.load(file)
                self.address_book = [Contact(**contact_data) for contact_data in data_loaded]
                print(f"通讯录已从 {self.filename} 加载")
        except FileNotFoundError:
            print(f"文件未找到错误：确保 '{self.filename}' 存在于程序运行目录。")
        except json.JSONDecodeError:
            print(f"无法解析 {self.filename} 中的数据。")
        except Exception as e:
            print(f"加载通讯录时发生错误：{e}")

            print(f"加载通讯录时发生错误：{e}")

    def save_contacts(self):
        try:
            with open(self.filename, 'w', encoding='utf-8', newline='') as file:
                json.dump([contact.__dict__ for contact in self.address_book], file, ensure_ascii=False, indent=4)
        except Exception as e:
            print(f"保存通讯录时发生错误：{e}")
        print(f"通讯录已保存到 {self.filename}")
    def add_contact(self):
        while True:
            name = input("请输入姓名：")
            if not name:
                print("姓名不能为空。")
                continue
            if not self.validate_field(name, '姓名'):
                continue
            phone = input("请输入电话号码：")
            if not self.validate_phone(phone):
                print("电话号码格式不正确。请重新输入。")
                continue
            email = input("请输入电子邮件地址：")
            if not self.validate_email(email):
                print("电子邮件地址格式不正确。请重新输入。")
                continue
            contact = Contact(name, phone, email)
            self.address_book.append(contact)
            print("联系人添加成功！")
            break

    def validate_field(self, value, field_name):
        if not value:
            print(f"{field_name} 不能为空。")
            return False
        return True
    def display_contacts(self):
        for idx, contact in enumerate(self.address_book, start=1):
            print(f"{idx}. 姓名：{contact.name}, 电话：{contact.phone}, 电子邮件：{contact.email}")

    def search_contact(self):
        keyword = input("请输入搜索关键词：")
        found = [contact for contact in self.address_book if keyword.lower() in contact.name.lower()]
        if found:
            print("搜索结果：")
            for idx, contact in enumerate(found, start=1):
                print(f"{idx}. 姓名：{contact.name}, 电话：{contact.phone}, 电子邮件：{contact.email}")
        else:
            print("未找到匹配关键词的联系人。")

    def edit_contact(self):
        while True:
            index = int(input("请输入要编辑的联系人的索引：")) - 1
            if 0 <= index < len(self.address_book):
                contact = self.address_book[index]
                new_name = input(f"请输入新姓名（当前：{contact.name}）：") or contact.name
                new_phone = input(f"请输入新电话号码（当前：{contact.phone}）：") or contact.phone
                new_email = input(f"请输入新电子邮件地址（当前：{contact.email}）：") or contact.email
                if not self.validate_phone(new_phone):
                    print("电话号码格式不正确。请重新输入。")
                    continue
                if not self.validate_email(new_email):
                    print("电子邮件地址格式不正确。请重新输入。")
                    continue
                contact.name = new_name
                contact.phone = new_phone
                contact.email = new_email
                print("联系人更新成功！")
                break
            else:
                print("无效的联系人索引。")

    def delete_contact(self):
        index = int(input("请输入要删除的联系人的索引：")) - 1
        if 0 <= index < len(self.address_book):
            deleted_contact = self.address_book.pop(index)
            print(f"已删除联系人：{deleted_contact.name}")
        else:
            print("无效的联系人索引。")
    
    @staticmethod
    def validate_phone(phone):
        pattern = re.compile(r'^1[3-9]\d{9}$')  # 假设手机号码为常见的中国手机号格式
        return pattern.match(phone) is not None

    @staticmethod
    def validate_email(email):
        pattern = re.compile(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
        return pattern.match(email) is not None

class Contact:
    def __init__(self, name, phone, email):
        self.name = name
        self.phone = phone
        self.email = email

    def __repr__(self):
        return json.dumps(self.__dict__)
def main():
    address_book_app = AddressBook()
    address_book_app.load_contacts()
    while True:
        print("\n个人通讯录")
        print("1. 添加联系人")
        print("2. 显示联系人")
        print("3. 搜索联系人")
        print("4. 编辑联系人")
        print("5. 删除联系人")
        print("6. 保存并退出")
        
        try:
            choice = int(input("请输入您的选择："))
        except ValueError:
            print("无效的选择，请输入数字。")
            continue
        
        if choice == 1:
            address_book_app.add_contact()
        elif choice == 2:
            address_book_app.display_contacts()
        elif choice == 3:
            address_book_app.search_contact()
        elif choice == 4:
            address_book_app.edit_contact()
        elif choice == 5:
            address_book_app.delete_contact()
        elif choice == 6:
            address_book_app.save_contacts()
            print("通讯录已保存。退出程序。再见！")
            break
        else:
            print("无效的选择。请重新选择。")

if __name__ == "__main__":
    main()