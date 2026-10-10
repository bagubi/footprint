<template>
  <div class="box">
    <h4>组件 A（发送方）</h4>
    <button @click="send">发送消息给 B</button>
  </div>
</template>

<script setup lang="ts">
import emitter from "@/utils/emitter";

function send() {
  emitter.emit("msg", "来自 A 的消息");
}
</script>

<style scoped>
.box {
  padding: 16px;
  border: 2px solid #f59e0b;
  border-radius: 8px;
  margin-bottom: 12px;
}
</style>
