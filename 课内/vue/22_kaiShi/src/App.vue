<template>
  <!-- 23.意思是他们不同组件之间同样ref="title2"互不影响 -->
  <!-- <h2 ref="title2">你好</h2>
  <button @click="showLog">点我输出h2这个元素</button> -->

  <!-- <person ref="personRef" /> -->
  <!-- <button @click="showLog1">点我输出person这个元素</button> -->

  <person />
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
</script>

<style scoped></style>
