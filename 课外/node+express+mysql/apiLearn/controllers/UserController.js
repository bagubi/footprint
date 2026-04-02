
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const ValidatePhoneCode = [];
// 检测该验证码是否发送过验证码
const sendCodeP = (phone) => {
    for (var item of ValidatePhoneCode) {
        if (item.phone === phone) {
            return true;
        }
    }
    return false;
}


//参数phone:手机号 code:验证码
const findCodeAndPhone = (phone, code) => {
    for (const item of ValidatePhoneCode) {
        // 转为字符串比较，避免类型不一致
        if (String(item.phone) === String(phone) && String(item.code) === String(code)) {
            return 'login';
        }
    }
    return 'error';
};
//1.该手机是否发送过验证码
sendCode = (req, res) => {
    let phone = req.query.phone || req.body.user_phone;
    if (sendCodeP(phone)) {
        res.send({
            code: 400,
            message: '该手机已发送过验证码'
        });
        return;
    }
    let code = rand(100000, 999999);
    ValidatePhoneCode.push({
        'phone': phone,
        'code': code
    });
    console.log(ValidatePhoneCode);
    res.send({
        code: 200,
        message: '验证码发送成功',
        data: {
            code: code
        }
    });
    // if (phone) {
    //     res.json({
    //         code: 200,/////////
    //         message: '验证码发送成功',
    //         data: {
    //             code: '123456' // 模拟验证码
    //         }
    //     });
    // }phone 
}
// 验证码登录接口
const codePhoneLogin = (req, res) => {
    const phone = req.body.phone || req.query.phone;
    const code = req.body.code || req.query.code;
    //该手机号是否发送过验证码
    if (!phone || !code) {
        return res.status(400).json({ code: 400, message: '手机号和验证码不能为空' });
    }

    if (!sendCodeP(phone)) {
        return res.status(400).json({ code: 400, message: '未发送过验证码' });
    }

    const result = findCodeAndPhone(phone, code);
    if (result === 'login') {
        res.json({ code: 200, message: '登录成功' });
    } else {
        res.status(400).json({ code: 400, message: '验证码错误' });
    }
}
// 导出函数本身
// module.exports = sendCode;
// 导出对象
// 验证码登录接口
module.exports = { sendCode, codePhoneLogin };