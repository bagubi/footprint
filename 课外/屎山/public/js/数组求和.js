// 数组求和
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum = 0
let avg// 平均值
for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
}
avg = sum / arr.length
console.log('数组的和是：' + sum, '数组的平均值是：' + avg)