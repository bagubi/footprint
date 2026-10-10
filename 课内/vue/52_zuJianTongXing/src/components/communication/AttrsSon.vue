<template>
  <div class="box">
    <h4>子组件</h4>
    <p>attrs：{{ attrs }}</p>
  </div>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";

const attrs = useAttrs();
</script>
