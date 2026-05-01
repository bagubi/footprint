let a = () => {
  console.log("箭头函数");
};
// 1. 箭头函数和普通函数的 this 区别？
// 普通函数：
// this 的值由调用方式决定（如作为对象方法调用、call / apply / bind、构造函数等），遵循动态绑定规则。

// 箭头函数：
// 没有自己的 this，它会继承外层作用域的 this 值（词法作用域），且无法通过 call / apply / bind 改变。
const obj = {
  name: 'Alice',
  regular() { console.log(this.name); },     // 'Alice'
  arrow: () => { console.log(this.name); }   // undefined（this 指向全局或 undefined）
};