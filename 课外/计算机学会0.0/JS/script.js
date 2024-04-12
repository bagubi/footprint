let obj = {
    uname: '狗哥',
    age: 16,
    gender: '男',
    shin: function () {
        console.log('忘情水')
    },
    'pig-name': '佩奇',
}
console.log(obj.age)
console.log(obj['pig-name'])
// 便利对象for in
// for (let 变量 ele 对象) {
//}
for (let key in obj) {
    console.log(key)
}