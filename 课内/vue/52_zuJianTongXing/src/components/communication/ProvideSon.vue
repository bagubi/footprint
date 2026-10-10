<template>
  <div class="box">
    <h4>子组件</h4>
    <p>inject 收到的数据：{{ msg }}</p>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

const msg = inject("msg");
</script>
