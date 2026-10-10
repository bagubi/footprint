<template>
  <div class="box">
    <h4>子组件</h4>
    <!-- <p>收到父组件的 msg：{{ msg }}</p>
    <p>收到父组件的 count：{{ count }}</p> -->
    <p>收到父组件的 fatherMsg：{{ fatherMsg }}</p>
  </div>
</template>

<script setup lang="ts">
// 声明接收props
defineProps([`fatherMsg`]);
// defineProps<{
//   msg: string;
//   count: number;
// }>();
</script>

<style scoped>
.box {
  padding: 16px;
  border: 2px dashed #42b883;
  border-radius: 8px;
  margin-top: 12px;
}
</style>
