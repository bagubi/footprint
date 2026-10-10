<template>
  <div class="box">
    <h4>子组件</h4>
    <p>{{ sonMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const sonMsg = ref("我是子组件的数据");

function sonMethod() {
  console.log("子组件的方法被调用了");
}

// 必须暴露出去，父组件才能访问
defineExpose({ sonMsg, sonMethod });
</script>
