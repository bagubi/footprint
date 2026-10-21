<template>
  <div class="box">
    <h4>子组件</h4>
    <p>父的a:{{ a }}; 爷的x:{{ x }};</p>
    <p>其他：{{ attrs }}</p>
  </div>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";
defineProps(["a", "x"]);

const attrs = useAttrs();
// 父组件传了一堆属性过来，子组件只 defineProps
// 接收了其中一部分，剩下的全在 useAttrs() 里。
</script>
