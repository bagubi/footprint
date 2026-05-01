// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// 允许跨域（前端可能是 file:// 或 http://localhost:8080）
app.use(cors());

// 配置 multer 存储位置
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 文件保存到 ./uploads 目录
    },
    filename: (req, file, cb) => {
        // 保留原始文件名（实际项目建议加时间戳或哈希防重名）
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// 础保 uploads 目录存在（可手动创建或用 fs 检查）
if (!require('fs').existsSync('uploads')) {
    require('fs').mkdirSync('uploads');
}

// 图片上传接口（对应前端的 URL）
app.post('/api/uploadimg', upload.single('img'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: '未上传文件' });
    }

    // 返回图片访问 URL（假设前端能通过 /uploads 访问）
    const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    res.json({
        code: 200,
        msg: '上传成功',
        url: imageUrl
    });
});

// 提供静态文件服务（让前端能访问上传的图片）
app.use('/uploads', express.static('uploads'));

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});