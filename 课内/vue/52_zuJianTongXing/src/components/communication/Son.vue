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

// 1. props 的本质：单向数据流
// 2. 但 props 可以传一个"函数"下去
// 关键点：props 传的不只是数据，还可以传函数。
// 父组件把一个函数作为 prop 传给子组件，
// 子组件调用这个函数，就把数据"送"回父组件了。
</script>

<style scoped>
.box {
  padding: 16px;
  border: 2px dashed #42b883;
  border-radius: 8px;
  margin-top: 12px;
}
</style>
