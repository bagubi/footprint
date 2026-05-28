const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 测试账号
const users = [
    { mobile: '13800138000', password: '123456' }
];

app.post('/login', (req, res) => {
    const { mobile, code } = req.body;

    if (!mobile || mobile.length !== 11) {
        return res.status(400).json({ message: '手机号格式不正确' });
    }
    if (!code || code.length < 6) {
        return res.status(400).json({ message: '密码至少6位' });
    }

    const user = users.find(u => u.mobile === mobile && u.password === code);
    if (!user) {
        return res.status(401).json({ message: '手机号或密码错误' });
    }

    res.json({
        token: 'fake_token_' + Date.now(),
        user: { mobile: user.mobile }
    });
});

app.listen(3000, () => console.log('后端运行在 http://127.0.0.1:3000'));