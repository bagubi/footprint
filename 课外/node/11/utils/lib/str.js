//封装校验用户名和密码长度的函数
//用户名最少8位，密码最少6位
const checkUserName = (username) => username.length >= 8;
const checkPassWord = (password) => password.length >= 6;
//CommonJS规范 - 导出模块
module.exports = {
    checkUserName,
    checkPassWord
};