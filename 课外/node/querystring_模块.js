// querystring 模块（低层工具）
const querystring = require("querystring");

// 解析
const str = "name=%E5%BC%A0%E4%B8%89&age=20";
const obj = querystring.parse(str);
console.log(obj); // { name: '张三', age: '20' }

// 序列化
const back = querystring.stringify({ name: "李四", city: "北京" });
console.log(back); // name=%E6%9D%8E%E5%9B%9B&city=%E5%8C%97%E4%BA%AC