// 这个方法可以逐一输出
var myCars = ["S", "V", "B"]
for (i in myCars) {
    console.log(myCars[i])
}
console.log(myCars[0])
// 定义对象
var person = { name: '1i', age: 50 }
for (i in person) {
    console.log(person[i])
}
console.log(person['age'])
console.log(person.age)
// 数组和对象输出用for