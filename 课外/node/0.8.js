//CommonJS 是 Node.js 采用的模块化规范，用于在服务器端组织和复用代码。它的核心思想是：每个文件就是一个模块，拥有自己的作用域。

// 在 Node.js 中，默认使用 CommonJS；
// 而浏览器端通常用 ES Modules（import/export）。
//为了兼容旧代码，Node.js 默认仍将 .js 文件当作 CommonJS 处理




// //1.modeule.exports：暴露模块接口
// //格式：
// const baseURL = 'http://localhost:8080'
// const getArraySum = (arr) => arr.reduce((sum, val) => sum += val, 0);
// //暴露出去
module.exports = {
    对应属性名1: baseURL,
    对应属性名2: getArraySum
};


// //2.require：引入模块
// //格式：require('模块名/路径')
const obj = require('模块名/路径');
// //obj就等于module.exports暴露的对象

//什么时候写模块名？用内置模块时（如：fs、path、http、https、os、url、querystring、events、util、stream、zlib、buffer）
//什么时候写路径？用自定义模块时写文件路径（如：./math.js、../utils.js）

//需求：定义utils.js模块，封装基地址和求数组总和的函数；
//导入
const obj = require('./utils.js');
console.log(obj);
const result = obj.arraySum([1, 2, 3]);
console.log(result);


// // math.js（定义模块）
// function sum(arr) {
//     return arr.reduce((a, b) => a + b, 0);
// }
// module.exports = { sum };

// // main.js（使用模块）
// const { sum } = require('./math.js');
// console.log(sum([1, 2, 3])); // 6