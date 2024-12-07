const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

// 静态文件服务
app.use(express.static(path.join(__dirname, "public")));

// 处理根路径的请求
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "阿贾克斯.html"));
});

// 获取 JSON 数据的路由
app.get("/json/data.json", (req, res) => {
  const filePath = path.join(__dirname, "json/data.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("读取文件出错");
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
