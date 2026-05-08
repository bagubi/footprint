//http 模块
//1.加载http模块，创建web服务对象
const http = require("http");
const server = http.createServer();

//2.监听request请求事件，设置请求处理函数 
server.on("request", (req, res) => {
    //设置请求头：内容类型，普通文本，编码格式为utf-8
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Hello World!");
});

//3.绑定端口号，启动web服务
server.listen(8080, () => {
    console.log("http server is running at http://127.0.0.1:8080");
});