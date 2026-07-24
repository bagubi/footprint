<template>
  <!-- 23.意思是他们不同组件之间同样ref="title2"互不影响 -->
  <!-- <h2 ref="title2">你好</h2>
  <button @click="showLog">点我输出h2这个元素</button> -->

  <!-- <person ref="personRef" /> -->
  <!-- <button @click="showLog1">点我输出person这个元素</button> -->

  <person a="哈哈" b="嘿嘿" :list="personList" />
  <!-- ：list加了冒号就是表达式，这样写可以传参、运算。。 -->
  <!-- 但是：list还可以直接写次数 -->
</template>

<script setup lang="ts" name="App">
import person from "./components/person.vue";

/* //23.标签的ref属性
import { ref } from "vue";
// let title2 = ref();
// function showLog() {
//   console.log(title2.value);
// }

let personRef = ref();
function showLog1() {
  console.log(personRef.value);
  //这里会拿到person这个组件的实例
} */

// 现在是正常数组=>问：怎么做成响应式数组？
// let personList = [
//   { id: 1, name: "张三", age: 18 },
//   { id: 2, name: "李四", age: 20 },
//   { id: 3, name: "王五", age: 22 },
// ];

//引入reactive
import { reactive } from "vue";
//此时没有限制（这里如果没有reactive包就比较简单）
import { type Persons } from "@/types";

let personList = reactive<Persons>([
  { id: "abc1", name: "张三", age: 18 },
  { id: "abc2", name: "李四", age: 20 },
  { id: "abc3", name: "王五", age: 22 },
]);
// console.log(personList);
</script>

<style scoped></style>
