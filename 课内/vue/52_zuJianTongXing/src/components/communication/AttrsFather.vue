<template>
  <div class="box">
    <h3>父组件</h3>
    <Son class="my-class" data-test="abc" />
  </div>
</template>

<script setup lang="ts">
import Son from "./AttrsSon.vue";
</script>
