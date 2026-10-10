<template>
  <div class="box">
    <h4>子组件</h4>
    <button @click="getParentData">通过 $parent 获取父组件数据</button>
    <p>父组件的数据：{{ parentMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";

const parentMsg = ref("");

// 获取当前组件实例
const instance = getCurrentInstance();

function getParentData() {
  // 通过 $parent 访问父组件
  parentMsg.value = instance?.parent?.exposed?.fatherMsg;
  console.log("父组件实例：", instance?.parent);
}
</script>

<style scoped>
.box {
  padding: 16px;
  border: 2px dashed #42b883;
  border-radius: 8px;
  margin-top: 12px;
}
</style>
