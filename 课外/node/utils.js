//工具模块
//ECMAScript 标准 - 默认导出
// const baseURL = 'http://hmajax.itheima.net'
// //箭头函数：(arr) => { ... }
// //
// const getArraySum = (arr) => arr.reduce((sum, item) => sum += item, 0);
//是个工具模块, 要基于CommonJS规范, 暴露出去
// module.exports = {
//     url: baseURL,
//     arraySum: getArraySum
// };
//ECMAScript 标准 - 命名导出(在前面加export)
export const baseURL = 'http://hmajax.itheima.net'

export const getArraySum = (arr) => arr.reduce((sum, item) => sum += item, 0);