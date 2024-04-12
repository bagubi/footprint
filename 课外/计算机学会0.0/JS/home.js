function registerEvent() {
    alert('您已报名参加活动！');
}

function joinClub() {
    alert('您的入会申请已提交，我们将尽快与您联系！');
}
//上传
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
    // 文件已上传到服务器，可以在这里对文件进行处理或保存到指定位置
    const filePath = req.file.path;
    const fileName = req.file.filename;
    res.json({ filePath, fileName });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
