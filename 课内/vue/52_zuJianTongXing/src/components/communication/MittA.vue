<template>
  <div class="box">
    <h4>组件 A（发送方）</h4>
    <button @click="send">发送消息给 B</button>
    <!-- 老师教： -->
    <button @click="emitter.emit('msgA', '来自 A 的消息，老师版')">
      老师写法的发送
    </button>
  </div>
</template>

<script setup lang="ts">
// 引入mitt
import emitter from "@/utils/emitter";

function send() {
  //emitter.emit():触发某一个事件
  emitter.emit("msgA", "来自 A 的消息");
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
