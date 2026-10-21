<template>
  <div class="box">
    <h3>父组件</h3>
    <Son :a="a" class="my-class" data-test="abc" v-bind="$attrs" />
    <!-- 重点:v-bind="$attrs"加上这一段就可以祖传孙 -->
  </div>
</template>

<script setup lang="ts">
import Son from "./AttrsSon.vue";
import { ref } from "vue";
let a = ref(233);
</script>
