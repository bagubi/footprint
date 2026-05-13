// ECMAScript 标准 - 默认导出和导入
// JavaScript 推出的
//1.默认导出：export default{}
const baseURL = 'http://hmajax.itheima.net'
const getArraySum = (arr) => arr.reduce((sum, item) => sum += item, 0);
export default {
    对应属性名1: baseURL,
    对应属性名2: getArraySum
};
//2.默认导入：import 变量名 from '模块名/模块路径'
import obj from '模块名/模块路径'