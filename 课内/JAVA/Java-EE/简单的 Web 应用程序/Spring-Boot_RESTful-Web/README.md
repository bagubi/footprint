# Spring Boot ѧ����Ϣ����ϵͳ API

����һ������ Spring Boot ʵ�ֵļ� RESTful Web Ӧ�ó���������ʾ������ѧ����Ϣ�����ܣ�������ɾ�Ĳ������

---

## ? ����ջ

- Spring Boot 3.x
- Spring Web (MVC)
- Spring Data JPA
- H2 In-Memory Database
- Maven ��������
- Java 17
- RESTful API ��ƹ淶

---

## ? ���ܸ���

| ���� | ��ַ                  | ����˵��              |
|------|-----------------------|------------------------|
| GET  | /api/students         | ��ȡ����ѧ���б�       |
| GET  | /api/students/{id}    | ���� ID ��ȡ����ѧ��   |
| POST | /api/students         | ������ѧ��             |
| PUT  | /api/students/{id}    | ����ָ��ѧ����Ϣ       |
| DELETE | /api/students/{id}  | ɾ��ָ��ѧ��           |

---

## ?? ���ݿ�����

ʹ���� H2 �ڴ����ݿ⣬�ʺ�ѧϰ�Ͳ�����;��

```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.h2.console.enabled=true