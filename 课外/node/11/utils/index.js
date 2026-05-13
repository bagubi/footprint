// 本文件是，utils工具包的唯一出口
//作用：统一导出utils工具包中所有内容

//引入所有内容
const arrObj = require('./lib/arr.js');
const strObj = require('./lib/str.js');
// 按需引入
const { getArraySum } = require('./lib/arr.js');
const { checkUserName, checkPassWord } = require('./lib/str.js');


//统一暴露出去
module.exports = {
    arrObj,
    strObj,
    getArraySum,
    checkUserName,
    checkPassWord
};