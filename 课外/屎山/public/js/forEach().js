var array = [1, 2, "白龙马"];
// 要一个函数作为参数
// 回调函数：由我们创造但是不由我们调用的函数
// 数组由几个元素就会执行几次，没次执行时，
// 浏览器端在回调函数中，会自动传入三个参数
// a：当前元素
// b：当前元素的索引
// c：数组本身
array.forEach(function (item, index, arr) {
  console.log("索引—— " + index + "   hello！" + item);
});

// 结果：
// 索引—— 0   hello！1
// 索引—— 1   hello！2
// 索引—— 2   hello！白龙马
