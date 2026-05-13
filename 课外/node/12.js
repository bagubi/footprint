//用dayjs包
const dayjs = require('dayjs');
console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'));
/**
 * 
 *  
 * 其他常用 dayjs 方法
 * 方法	                               作用
dayjs().format('YYYY-MM-DD')	    格式化日期
dayjs('2024-01-01').add(7, 'day')	日期加减
dayjs().isBefore(dayjs('2025'))	    比较日期
dayjs().unix()	                    获取时间戳

 */