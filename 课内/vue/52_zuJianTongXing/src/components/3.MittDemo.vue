<template>
  <div class="demo">
    <h2>3. mitt 任意组件通信</h2>
    <A />
    <B />
  </div>
</template>

<script setup lang="ts">
// 安装mitt
// npm i mitt
import A from "./communication/MittA.vue";
import B from "./communication/MittB.vue";
</script>
