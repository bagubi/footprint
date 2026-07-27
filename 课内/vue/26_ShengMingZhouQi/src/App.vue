<template>
  <Person v-if="isShow" />
</template>
<script setup lang="ts">
import Person from "./components/Person.vue";
import { ref, onMounted } from "vue";
let isShow = ref(true);
//挂载完毕onMounted
onMounted(() => {
  console.log("父---挂载完毕");
});
</script>
