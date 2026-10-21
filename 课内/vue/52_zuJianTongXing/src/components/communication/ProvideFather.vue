<template>
  <div class="box">
    <h3>父组件</h3>
    <Son />
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import Son from "./ProvideSon.vue";

const msg = ref("我是 provide 的数据");
provide("msg", msg);
</script>
