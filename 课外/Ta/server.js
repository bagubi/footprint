const express = require('express');
const path = require('path');
const app = express();
const port = 80;

// 路由
app.use(express.static(path.join(__dirname)));

app.use('/fonts', express.static(path.join(__dirname, 'fonts')));
app.use('/js', express.static(path.join(__dirname, 'js')));

app.use(express.json());

// 路由
app.get('/', (req, res) => {
    res.sendFile(path.join('index.html'));
});
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/images/post/', express.static(path.join(__dirname, 'images/post')));
app.use('/assets/images/post', express.static(path.join(__dirname, 'assets/images/post')));
app.use('/Ta/cybox/assets/images/post', express.static(path.join(__dirname, 'cybox/assets/images/post')));
// 启动服务器
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});