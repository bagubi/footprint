<template>
  <div class="demo">
    <h2>4. v-model 双向绑定</h2>
    <h3>父组件的值：{{ text }}</h3>
    <Son v-model="text" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Son from "./communication/VModelSon.vue";

const text = ref("初始值");
</script>
