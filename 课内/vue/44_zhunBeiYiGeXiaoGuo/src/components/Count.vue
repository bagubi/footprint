<template>
  <div class="count">
    <h2>当前求和为: {{ sum }}</h2>
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
import { ref } from "vue";
//数据
let sum = ref(1); //当前求和
let selected = ref(1); //用户选择的数字
//方法
function add() {
  sum.value += selected.value;
}
function sub() {
  sum.value -= selected.value;
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
