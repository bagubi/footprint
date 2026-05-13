// ECMAScript 标准 - 命名导出和导入
//为了按需加载，使用命名导出和导入
//要是想全部加载就用0。9的默认导出和导入



//需求：封装并导出基地址和求数组元素和的函数
// const baseURL = 'http://hmajax.itheima.net'
// const getArraySum = (arr) => arr.reduce((sum, item) => sum += item, 0);
//1.命名导出：export {}
// export { baseURL, getArraySum }
//2.命名导入：import {同名变量} from '模块名/模块路径'
import { baseURL, getArraySum } from './utils.js'
console.log(baseURL);
const result = getArraySum([1, 2, 3]);
console.log(result);