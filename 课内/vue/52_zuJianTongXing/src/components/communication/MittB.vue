<template>
  <div class="box">
    <h4>组件 B（接收方）</h4>
    <p>收到的消息：{{ msg }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import emitter from "@/utils/emitter";

const msg = ref("");

function handler(data: any) {
  msg.value = data;
}

onMounted(() => {
  emitter.on("msg", handler);
});

onUnmounted(() => {
  emitter.off("msg", handler);
});
</script>

<style scoped>
.box {
  padding: 16px;
  border: 2px dashed #f59e0b;
  border-radius: 8px;
}
</style>
