let ob = {
    'pig-name': 'why',
    age: 18
}

// 获取属性值
console.log(ob['pig-name']);

// 直接访问对象属性age（无需变量）
console.log(ob['age']); // 或者 console.log(ob.age);

let str = 'age';

// 使用变量str作为属性名访问对象属性
console.log(ob[str]);