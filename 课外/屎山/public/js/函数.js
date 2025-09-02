function getSum(num1, num2) {
    console.log("开始");
    var sum = 0;
    for (var i = num1; i <= num2; i++) {
        sum += i;
    }
    return sum;
    console.log("结束");
}
// 第一次调用
var result1 = getSum(1, 100);
console.log("结果是:" + result1);
// 第二次调用
var result2 = getSum(1, 1000);
console.log("结果是:" + result2);


// 根据条件计算总和
function getSumWithCondition(num1, num2, fn) {

    var sum = 0;
    for (var i = num1; i <= num2; i++) {
        if (fn(i)) {
            sum += i;
        }
    }
    return sum;

}
var result3 = getSumWithCondition(1, 100, function (num) {
    if (num % 2 == 0) {//偶数
        return true;
    }
    return false
});
console.log("结果是:" + result3);
