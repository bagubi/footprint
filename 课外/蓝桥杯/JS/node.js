// 1.__filename
// 表示当前正在执行的脚本的文件名。
console.log(__filename);

// 2.__dirname
// 表示当前执行脚本所在的目录。
console.log(__dirname);

// 3.setTimeout(cb, ms)
// 全局函数在指定的毫秒（ms）数后执行指定函数（cb），只执行一次函数。
function foo() {
  console.log("Hello, hhyz!");
}
// 两秒后执行以上函数
setTimeout(foo, 2000);

// 4.clearTimeout(t)
// 用于停止一个之前通过 setTimeout() 创建的定时器。
// 参数 t 是通过 setTimeout() 函数创建的定时器。
function foo1() {
  console.log("Hello, syl!");
}
// 三秒后执行以上函数
var t = setTimeout(foo1, 3000);
// 清除定时器
clearTimeout(t);

// 5.setInterval(cb, ms)
// 与 setTimeout(cb, ms) 类似，不同的是这个方法会不停的执行函数。
// 直到 clearInterval() 被调用或窗口被关闭，也可以按 Ctrl + C 停止。
function foo2() {
  console.log("Hello, syl!");
}
// 三秒后执行以上函数
var t = setInterval(foo2, 3000);
// 清除定时器
clearInterval(t);
