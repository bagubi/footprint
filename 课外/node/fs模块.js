//1.加载fs
const fs = require("fs");
// //2.写入格式
// fs.writeFile("文件路径", "写入内容", err => {
//     //”写入“后的回调函数
//     //err为错误对象，成功时为null
// });
// //3.读取格式
// fs.readFile("文件路径", (err, data) => {
//     //”读取“后的回调函数
//     //err为错误对象，成功时为null
//     //data为读取到的数据，为Buffer对象
// });
// 例子
//写入
fs.writeFile("./fs.txt", "Hello, fs!", err => {
    if (err) {
        console.error(err);
    } else {
        console.log("写入成功！");
    }
});
//读取
fs.readFile("./fs.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});