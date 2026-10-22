<template>
  <div class="demo">
    <h2>7. provide（爷提供） / inject（后代注入）</h2>
    <Father />
    <!-- 祖传孙，比起attrs，provide / inject 零打扰 -->
  </div>
</template>

<script setup lang="ts">
import Father from "./communication/ProvideFather.vue";
</script>
