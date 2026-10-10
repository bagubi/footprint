<template>
  <div class="demo">
    <h2>9. slot 插槽</h2>
    <SlotSon>
      <p>这是父组件传进来的内容</p>
    </SlotSon>
  </div>
</template>

<script setup lang="ts">
import SlotSon from "./communication/SlotSon.vue";
</script>

<style scoped>
.demo {
  padding: 16px;
}
</style>
