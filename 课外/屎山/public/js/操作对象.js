let ob = {
  "pig-name": "why",
  age: 18,
};

// 获取属性值
console.log(ob["pig-name"]);

// 直接访问对象属性age（无需变量）
console.log(ob["age"]); // 或者 console.log(ob.age);

let str = "age";

// 使用变量str作为属性名访问对象属性
console.log(ob[str]);

// 操作对象：对数据 查、增、改、删
let pig = {
  uname: "佩奇",
  sing: function () {
    console.log("唱歌");
  },
};

// 1. 查： 对象.属性 对象.方法
console.log(pig.uname); // 得到属性值
pig.sing();

// 2. 增：对象.新属性 = 新值   对象.新方法 = function(){}
pig.age = 4;
pig.dance = function () {
  console.log("跳舞");
};
console.log(pig);

// 3. 改：对象.属性 = 新值  对象.方法 = 新匿名函数
pig.uname = "小猪佩奇";
pig.sing = function () {
  console.log("哼哼哼！！");
};
console.log(pig);

// 4. 删： 了解，因为我们很少对对象里面的数据做删除操作  delete
delete pig.age;
delete pig.dance;
console.log(pig);

//=====================
// 动态查看对象的所有属性
// 对对象属性进行批量操作
//=====================
var obj = { 
  name: "why",
  age: 18,
  height: 1.88,
};
for (var key in obj) {
  // 会打印每个属性的键名和对应的值
  // obj[key] 使用方括号语法动态访问对象属性
  console.log(key, obj[key]);
}