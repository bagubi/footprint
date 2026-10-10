<template>
  <div class="demo">
    <h2>1. props 父传子</h2>
    <!--     
    若父传子：属性值是非函数
    若子传父：属性值是 函数
    《尽量不用props一层层 父传孙
    -->
    <Father />
  </div>
</template>

<script setup lang="ts">
import Father from "./communication/Father.vue";
</script>
