<template>
  <div class="box">
    <h4>子组件</h4>
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.box {
  padding: 16px;
  border: 2px dashed #42b883;
  border-radius: 8px;
  margin-top: 12px;
}
</style>
