let ar = [
    './images/1.jpg',
    './images/2.jpg',
    './images/3.jpg',
    './images/4.jpg',
    './images/5.jpg',
    './images/6.jpg',
    './images/7.jpg',
]
let str = ''
for (let i; i < ar.length; i++) {
    console.log('<div><img src="' + ar[i] + '" alt=""></div>')
    str = str + '<div><img src="' + ar[i] + '" alt=""></div>';
}
console.log(str);