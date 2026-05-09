//1.基于http模块，创建web服务器
const http = require("http");
const path = require("path");
const fs = require("fs");
const server = http.createServer();
//2.使用req.url属性，获取请求的URL地址,判断并读取index.html文件，返回给客户端
server.on("request", (req, res) => {
    if (req.url === "/index.html") {
        fs.readFile(path.join(__dirname, "/index.html"), (err, data) => {
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(data.toString());
        });

    } else {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end("你要访问的页面不存在");
    }
});
//3.绑定端口号，启动web服务器
server.listen(8080, () => {
    console.log("http server is running at http://localhost:8080/index.html");
});
