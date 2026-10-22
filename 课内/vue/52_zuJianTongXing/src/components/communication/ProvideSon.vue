<template>
  <div class="box">
    <h4>子组件</h4>
    <p>inject 收到的数据：{{ msg }}</p>
    <button @click="updateMsg(6)">+6</button>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
//这里的 inject 注入
//格式
// inject("名字");
// const msg = inject("msg",'收不到msg会展示这里的默认值');
//要用东西接收
const { msg, updateMsg } = inject("msg", {
  msg: 0,
  updateMsg: (param: number) => {},
});
</script>
