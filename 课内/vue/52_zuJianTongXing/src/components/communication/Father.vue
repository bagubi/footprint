<template>
  <div class="box">
    <h3>父组件</h3>
    <p>父组件的数据：{{ fatherMsg }}</p>

    <!-- 用子组件标签 -->
    <Son :msg="fatherMsg" :count="100" :fatherMsg="fatherMsg" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// 引入子组件
import Son from "./Son.vue";

const fatherMsg = ref("我是父组件的数据");
</script>

<style scoped>
.box {
  padding: 16px;
  border: 2px solid #667eea;
  border-radius: 8px;
}
</style>
