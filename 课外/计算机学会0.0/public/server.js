const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

// 指定静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 处理文件上传
app.post('/upload', upload.single('file'), (req, res) => {
    // 文件已上传到服务器，可以在这里对文件进行处理或保存到指定位置
    const filePath = req.file.path;
    const fileName = req.file.filename;
    res.json({ filePath, fileName });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});