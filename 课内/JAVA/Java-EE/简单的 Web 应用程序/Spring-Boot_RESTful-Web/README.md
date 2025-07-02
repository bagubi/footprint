# Spring Boot 学生信息管理系统 API

这是一个基于 Spring Boot 实现的简单 RESTful Web 应用程序，用于演示基本的学生信息管理功能，包括增删改查操作。

---

## ? 技术栈

- Spring Boot 3.x
- Spring Web (MVC)
- Spring Data JPA
- H2 In-Memory Database
- Maven 构建工具
- Java 17
- RESTful API 设计规范

---

## ? 功能概览

| 方法 | 地址                  | 功能说明              |
|------|-----------------------|------------------------|
| GET  | /api/students         | 获取所有学生列表       |
| GET  | /api/students/{id}    | 根据 ID 获取单个学生   |
| POST | /api/students         | 创建新学生             |
| PUT  | /api/students/{id}    | 更新指定学生信息       |
| DELETE | /api/students/{id}  | 删除指定学生           |

---

## ?? 数据库配置

使用了 H2 内存数据库，适合学习和测试用途：

```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.h2.console.enabled=true