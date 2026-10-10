<template>
  <div class="demo">
    <h2>2. emit 子传父(自定义事件)</h2>
    <h3 v-show="message">父组件收到的消息：{{ message }}</h3>
    <!-- 把函数绑定到子组件的事件上 -->
    <!-- 监听：当子组件触发 send-msg 事件时，调用 handleMsg。 -->
    <Son @send-msg="handleMsg" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Son from "./communication/EmitSon.vue";
//数据
const message = ref("");
//方法（处理消息函数）
function handleMsg(msg: string) {
  message.value = msg;
}
</script>
