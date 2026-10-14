<template>
  <div class="box">
    <h4>组件 B（接收方）</h4>
    <p>收到的消息：{{ msgB }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import emitter from "@/utils/emitter";

const msgB = ref("");
// 如果没有上面这行就会改了，但页面不会更新

function handler(data: any) {
  msgB.value = data;
}
// 组件挂载到页面后
onMounted(() => {
  // 绑定某一个事件(必要的)
  emitter.on("msgA", handler);
});
// 组件从页面卸载后
onUnmounted(() => {
  // 解绑某一个事件
  emitter.off("msgA", handler);
});
</script>

<style scoped>
.box {
  padding: 16px;
  border: 2px dashed #f59e0b;
  border-radius: 8px;
}
</style>
