const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(express.json());

// 基础路由
app.get('/', (req, res) => {
    res.send('Hello Express API!');
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});