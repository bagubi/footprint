//引入mitt
import mitt from "mitt";
//调用mitt得emitter,emitter能 绑事件、触发事件
const emitter = mitt();

// 老师教语法：
// 绑定事件
// emitter.all:拿到所以绑定事件
// emitter.emit：触发某一个事件
// emitter.off:解绑某一个事件
// emitter.on:绑定某一个事件
/* emitter.on("test1", () => {
  console.log("test1被调用了");
});
emitter.on("test2", () => {
  console.log("test2被调用了");
});
//每隔10秒触发一下
setInterval(() => {
  //触发
  emitter.emit("test1");
  emitter.emit("test2");
}, 10000);
//3秒后开始做一件事
setTimeout(() => {
  //解绑test1
  //   emitter.off("test1");
  //清空事件
  emitter.all.clear();
}, 3000); */
//暴露emitter
export default emitter;
