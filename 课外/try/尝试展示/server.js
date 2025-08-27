// server.js
const express = require("express");
const path = require("path");
const db = require("./db"); // 修正路径，添加 ./

const app = express();
const port = 3000; // 改为3000端口，避免与Live Server冲突

// 中间件
app.use(express.static(__dirname));
app.use(express.json());

// 路由 - 首页
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 路由 - 获取用户列表 API
app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, username, email FROM users");
    res.json(rows);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "获取用户数据失败" });
  }
});

// 路由 - 获取学生列表 API
app.get("/api/students", async (req, res) => {
  try {
    const query1 = "SELECT sname AS name FROM students";
    const query2 = "SELECT name FROM acm";
    const [rows] = await db.query(`${query1} UNION ${query2}`);
    res.json(rows);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "获取学生数据失败" });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});