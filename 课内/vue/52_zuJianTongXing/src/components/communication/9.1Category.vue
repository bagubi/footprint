<template>
  <div class="box">
    <h4>{{ title }}</h4>
    <!-- 关键:默认插槽 -->
    <!-- <slot /> -->
    <!-- or -->
    <slot>默认内容</slot>

    <!-- 原来是这行的存在才能在父组件自定义 -->
  </div>
</template>

<script setup lang="ts">
defineProps(["title"]);
</script>

<style scoped>
.box {
  padding: 16px;
  border: 2px dashed #42b883;
  border-radius: 8px;
  margin-top: 12px;
}
</style>
