//path 模块
//path.join() 拼接路径
//引入path模块
const path = require("path");

//拼接路径
console.log(path.join('课外', 'node', 'fs.txt'));

//__dirname 当前文件所在目录的绝对路径
console.log(__dirname);
const filePath = path.join(__dirname, "fs.txt");
console.log(filePath);
//fs 模块
const fs = require("fs");
fs.writeFile(filePath, "Hello, fs!", err => {
    if (err) {
        console.error(err);
    } else {
        console.log("写入成功！");
    }
});
// or
fs.readFile(path.join(__dirname, "fs.txt"), (err, data) => {
    if (err) console.error(err);
    else console.log(data.toString());
});