<template>
  <div class="box">
    <h3>$parent父组件</h3>
    <p>父组件的数据：{{ fatherMsg }}</p>
    <ChildDemo />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ChildDemo from "./ChildDemo.vue";

const fatherMsg = ref("我是父组件的数据");
defineExpose({ fatherMsg });
</script>

<style scoped>
.box {
  padding: 16px;
  border: 2px solid #667eea;
  border-radius: 8px;
}
</style>
