<template>
  <div class="box">
    <h4>子组件</h4>
    <button @click="send">发送消息给父组件</button>
  </div>
</template>

<script setup lang="ts">
// 声明要触发哪些事件
const emit = defineEmits<{
  (e: "send-msg", msg: string): void;
  // 函数签名，表示：事件名是 send-msg，
  // 参数是 string，返回值是 void（无返回值）
}>();

// 触发事件
function send() {
  emit("send-msg", "我是子组件的数据");
}
</script>

<style scoped>
.box {
  padding: 16px;
  border: 2px dashed #42b883;
  border-radius: 8px;
}
</style>
