<template>
  <div class="demo">
    <h2>6. ref 父取子</h2>
    <button @click="getSonData">获取子组件数据</button>
    <Son ref="sonRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Son from "./communication/RefSon.vue";

const sonRef = ref();

function getSonData() {
  console.log("子组件的数据：", sonRef.value.sonMsg);
  sonRef.value.sonMethod();
}
</script>
