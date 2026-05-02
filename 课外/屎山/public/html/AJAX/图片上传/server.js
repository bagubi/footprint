// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

// 允许跨域（前端可能是 file:// 或 http://localhost:8080）
app.use(cors());

app.use((req, res, next) => {
    // 防止任何自动刷新
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});
// 确保 uploads 目录存在
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('✅ 创建 uploads 目录');
}

// 配置 multer 存储位置
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // 生成唯一文件名：时间戳+随机数+原始文件名
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    }
});

// 文件过滤函数
const fileFilter = (req, file, cb) => {
    // 只允许图片格式
    const allowedTypes = /jpeg|jpg|png|gif|webp|bmp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('只允许上传图片文件！'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 限制10MB
    fileFilter: fileFilter
});

// 图片上传接口
app.post('/api/uploadimg', upload.single('img'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                code: 400,
                message: '未上传文件或文件上传失败'
            });
        }

        // 返回图片访问 URL
        const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

        console.log(`✅ 文件上传成功: ${req.file.originalname} -> ${imageUrl}`);

        res.json({
            code: 200,
            msg: '上传成功',
            url: imageUrl,
            filename: req.file.filename,
            size: req.file.size
        });

    } catch (error) {
        console.error('上传处理错误:', error);
        res.status(500).json({
            code: 500,
            message: '服务器内部错误'
        });
    }
});

// 提供静态文件服务（让前端能访问上传的图片）
app.use('/uploads', express.static(uploadDir));

// 添加根路径测试
app.get('/', (req, res) => {
    res.json({ message: '图片上传服务器运行正常', status: 'ok' });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`\n✅ 服务器运行在 http://localhost:${PORT}`);
    console.log(`📁 上传目录: ${uploadDir}`);
    console.log(`🌐 图片访问地址: http://localhost:${PORT}/uploads/图片文件名\n`);
});

