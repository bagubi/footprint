<template>
  <div class="box">
    <h4>{{ title }}</h4>
    <!-- 关键:默认插槽 -->
    <!-- <slot /> -->
    <!-- or -->
    <slot>单个默slot默认内容</slot>
    <!-- 原来是这行的存在（有个坑）才能在父组件自定义（坑里的内容） -->

    <!-- 关键：具名插槽 -->
    <slot name="s1">s1默认内容</slot>
    <slot name="s2">s2默认内容</slot>
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
