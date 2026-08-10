import { ref, onMounted, computed } from "vue";
// ref - 适用于基本类型（数字、字符串、布尔值、null、undefined）、也能包对象/数组（但不推荐）
// reactive - 适用于对象/数组
//*不能整体重新赋值...解决：使用 toRefs
export default function () {
  //数据
  let sum = ref(0); //数字用 ref，需要.value访问
  let bigSum = computed(() => {
    return sum.value * 10;
  });
  //方法
  function add() {
    sum.value += 1;
  }
  //钩子
  onMounted(() => {
    sum.value = 100;
  });
  //向外部提供东西
  return {
    //数据
    sum,
    //方法
    add,
    //计算属性(也是数据)
    bigSum,
  };
}
