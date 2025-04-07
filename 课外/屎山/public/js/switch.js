语法: switch (表达式) {
  case 表达式值1:
    语句1;
    break;
  case 表达式值2:
    语句2;
    break;
  case 表达式值3:
    语句3;
    break;
  default:
    语句4;
    break;
}
{
  /* <input type="number" id="num" size="10" />; */
}
{
  /* <input type="button" value="解析数字" id="btnsubmit" />; */
}
// 选择按钮元素
var button = document.getElementById("btnsubmit");

// 添加点击事件监听器
button.addEventListener("click", function () {
  // 获取输入框的值
  num = 1;
  var num = parseInt(document.getElementById("num").value);
  switch (num) {
    case 1:
      console.log("一");
    default:
      console.log("其他");
  }
});
// 例题:
// 60以下不及格
// 其中拿 num<60 和 true 比较
switch (true) {
  case num < 60:
    console.log("不及格");
    break;
  default:
    console.log("及格");
    break;
}
