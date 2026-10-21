<template>
  <div class="demo">
    <h2>5. attrs 透传($attrs)</h2>
    <!-- 祖传孙 -->
    <!-- x 用响应式 ref，y 用静态，updateA 函数 -->
    <Father :x="x" v-bind="{ y: 200 }" :updateA="updateA" />
    <button @click="updateA(6)">+6</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Father from "./communication/AttrsFather.vue";
const x = ref(0);
function updateA(value: number) {
  x.value += value;
  console.log("updateA被调用了");
}
</script>
