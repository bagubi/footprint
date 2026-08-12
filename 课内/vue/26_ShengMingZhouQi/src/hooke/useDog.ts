import { reactive, onMounted } from "vue";
// ref - 适用于基本类型（数字、字符串、布尔值、null、undefined）、也能包对象/数组（但不推荐）
// reactive - 适用于对象/数组
//*不能整体重新赋值...解决：使用 toRefs
import axios from "axios";

export default function () {
  //数据
  let dogList = reactive<string[]>([]); // 明确数组类型
  // dogList是一个数组
  //数组用 reactive

  //方法
  async function getDog() {
    /*【复习】   axios.get(url, config)
//              ↓        ↓      ↓ 
//            方法      地址   配置（可选） */

    /* 方法一 ：then/catch */
    // 不用在上面function前面加async,用then
    // axios.get("https://dog.ceo/api/breeds/image/random").then(
    //   (response) => {},
    //   (error) => {},
    // );
    /* 方法二 ：async/await + try/catch（推荐）*/
    try {
      const result = await axios.get("https://dog.ceo/api/breeds/image/random");
      // 这里result是一个对象
      dogList.push(result.data.message);

      //【复习】 push()是数组的方法，向数组末尾添加一个或多个元素，并返回新数组的长度。
      /*  const arr = [1, 2, 3]
    arr.push(4)        // [1, 2, 3, 4]
    arr.push(5, 6)     // [1, 2, 3, 4, 5, 6] */
    } catch (error) {
      // error是一个错误对象
      console.error(error);
    }
    /* 方法三 axios拦截器(批量的统一的处理错误)*/
    // 1.请求拦截器（发送请求前执行）
    // 2. 响应拦截器（收到响应后执行）
  }
  //钩子
  onMounted(() => {
    getDog();
  });

  //向外部提供东西
  return {
    //数据
    dogList,
    //方法
    getDog,
  };
}
/* export default + 可以跟什么：
1.函数： 2.类；3.对象；4.数组；5.基本类型（数字、字符串、布尔值、null、undefined）；6.箭头函数 */
