// node创建第一个应用;
var http = require("http"); // 加载 http 模块，并将实例化的 HTTP 赋值给变量 http

http
  .createServer(function (request, response) {
    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, { "Content-Type": "text/plain" });

    response.end("Hello World\n"); // 发送响应数据 "Hello World"
  })
  .listen(8080);

// 终端打印如下信息
console.log("Server running at http://127.0.0.1:8080/");
