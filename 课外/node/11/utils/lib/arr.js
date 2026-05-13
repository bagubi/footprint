//数组求和函数
const getArraySum = (arr) => arr.reduce((sum, item) => sum += item, 0);
//CommonJS规范 - 导出模块
module.exports = { getArraySum };