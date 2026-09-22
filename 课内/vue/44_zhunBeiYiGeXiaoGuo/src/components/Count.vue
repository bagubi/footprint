<template>
  <div class="count">
    <h2>当前求和为: {{ countStore.sum }}</h2>
    <h3>
      欢迎查看！血液中咖啡浓度：{{ countStore.caffeineLevel }},代码bug剩余：{{
        countStore.bugCount
      }}，程序员心情等级：{{ countStore.moodLevel }}
    </h3>
    <select v-model.number="selected">
      <!-- 把下拉框选中的值双向绑定到 selected，并且自动转成数字（而不是字符串） -->
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="add">加</button>
    <button @click="sub">减</button>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
// 46.引入useCountStore
import { useCountStore } from "@/stores/count";
//使用useCountStore,得到一个专门保存count相关的store
const countStore = useCountStore();
//46.以下两种方式都可以拿到state中的数据
console.log("这是countStore：", countStore.sum);
// 麻烦方法
console.log("这是countStore：", countStore.$state.sum);

//46.创建一个响应式对象obj，说明reactive里面的不用.value
// let obj = reactive({
//   a: 1,
//   b: 2,
//   c: ref(3),
// });
// console.log(obj.c);

// let x = ref(9);
// console.log(x.value);
//46.注意：自己定义的ref要.value拆包
//但是在reactive里面的不用.value

//数据
// let sum = ref(1); //当前求和
let selected = ref(1); //用户选择的数字
//方法
function add() {
  // sum.value += selected.value;

  // 47.修改数据（三种方式）
  // 第一种
  // countStore.sum += selected.value;
  // countStore.caffeineLevel = 25;

  // 第二种，批量变更（想要一次性发生变话的用）
  // countStore.$patch({
  //   // patch有碎片的意思
  //   // 比如：
  //   sum: 10086,
  //   moodLevel: "开朗",
  // });

  //第三种，方便复用，在/store/count.ts里加一段（最麻烦
  countStore.increment(selected.value);
  // if (countStore.sum < 15) {
  //   countStore.sum += 1;
  // }
}
function sub() {
  // sum.value -= selected.value;
}
</script>
<style scoped>
.count {
  background-color: skyblue;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}
select,
button {
  margin: 0 5px;
  height: 25px;
}
</style>
