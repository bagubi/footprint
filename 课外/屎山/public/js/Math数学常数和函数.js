//==========================================//
//----------------常用属性------------------//
//==========================================//
// Math.PI;圆周率
console.log(Math.PI); // 输出: 3.141592653589793
// Math.E;表示自然对数的底数 e，约等于 2.718。
console.log(Math.E);
// Math.LN2;表示 2 的自然对数
console.log(Math.LN2);
// Math.LOG2E;表示 e 的以 2 为底的对数。
console.log(Math.LOG2E); // 输出: 1.4426950408889634
//Math.SQRT1_2; 表示1/2 的平方根。
console.log(Math.SQRT1_2); // 输出: 0.7071067811865476
// Math.SQRT2;表示 2 的平方根。
console.log(Math.SQRT2); // 输出: 1.4142135623730951
//==========================================//
//----------------常用方法------------------//
//==========================================//

// 1.Math.abs(x) 返回 x 的绝对值。
console.log(Math.abs(-5)); // 输出: 5

// 2.Math.ceil(x) 返回大于或等于 x 的最小整数。
console.log(Math.ceil(4.2)); // 输出: 5

// 3.Math.floor(x) 返回小于或等于 x 的最大整数。
console.log(Math.floor(4.7));

// 4.Math.random() 返回一个 0 到 1 之间的随机数（不包括 1）。
console.log(Math.random());
// 组合技（随机输出数组长度里的整数字）
// Math.floor(Math.random() * 某个数组或字符串数组.length)
