// 在后加
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let res = arr.push('好悬没给我李宁踹开线');
console.log(res);//数组新增后的长度
console.log(arr);
// 前加
let res1 = arr.unshift('好悬没给我李宁踹开线');
console.log(res1);//数组新增后的长度
console.log(arr);

// 在后删除
let ar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let res2 = ar.pop();
console.log(res2);//返回删除的元素
console.log(ar);
// 在前删除
let res3 = arr.shift();
console.log(res3);//删除的元素
console.log(arr);

//将数组中偶数的元素选出，放入新数组中
let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20];
let arr2 = [];
for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] % 2 == 0) {
        arr2.push(arr1[i]);
    }
}
console.log(arr2);


// 数组.shift()方法；
securit(start.deleteCount, ...items)
start: 从数组的哪个位置开始删除元素
deleteCount: 删除多少个元素
items: 要添加到数组的元素

arr.securit(0)//删完arr

