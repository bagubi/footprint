import json

# ... (之前定义的 Contact 类和 save_to_json, load_from_json 函数保持不变) ...

# 添加联系人
def add_contact():
    name = input("Enter the name: ")
    phone = input("Enter the phone number: ")
    email = input("Enter the email address: ")
    contact = Contact(name, phone, email)
    address_book.append(contact)
    print("Contact added successfully!")

# 显示所有联系人
def display_contacts():
    for idx, contact in enumerate(address_book, start=1):
        print(f"{idx}. Name: {contact.name}, Phone: {contact.phone}, Email: {contact.email}")

# 搜索联系人
def search_contact():
    keyword = input("Enter a keyword to search: ")
    found = [contact for contact in address_book if keyword.lower() in contact.name.lower()]
    if found:
        print("Search Results:")
        for idx, contact in enumerate(found, start=1):
            print(f"{idx}. Name: {contact.name}, Phone: {contact.phone}, Email: {contact.email}")
    else:
        print("No contacts found matching the keyword.")

# 编辑联系人
def edit_contact():
    index = int(input("Enter the index of the contact to edit: ")) - 1
    if 0 <= index < len(address_book):
        contact = address_book[index]
        contact.name = input(f"Enter new name ({contact.name}): ") or contact.name
        contact.phone = input(f"Enter new phone number ({contact.phone}): ") or contact.phone
        contact.email = input(f"Enter new email address ({contact.email}): ") or contact.email
        print("Contact updated successfully!")
    else:
        print("Invalid contact index.")

# 删除联系人
def delete_contact():
    index = int(input("Enter the index of the contact to delete: ")) - 1
    if 0 <= index < len(address_book):
        deleted_contact = address_book.pop(index)
        print(f"Deleted contact: {deleted_contact.name}")
    else:
        print("Invalid contact index.")

# 主函数
def main():
    load_from_json()  # 加载现有数据
    while True:
        print("\nPersonal Address Book")
        print("1. Add Contact")
        print("2. Display Contacts")
        print("3. Search Contact")
        print("4. Edit Contact")
        print("5. Delete Contact")
        print("6. Save and Exit")
        
        choice = input("Enter your choice: ")
        
        if choice == '1':
            add_contact()
        elif choice == '2':
            display_contacts()
        elif choice == '3':
            search_contact()
        elif choice == '4':
            edit_contact()
        elif choice == '5':
            delete_contact()
        elif choice == '6':
            save_to_json(address_book)
            print("Address book saved. Exiting the program. Goodbye!")
            break
        else:
            print("Invalid choice. Please choose again.")

if __name__ == "__main__":
    main()