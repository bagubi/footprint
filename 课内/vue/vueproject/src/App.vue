<script lang="ts">
//VUE2
// import PersonH from "./components/Preson.vue";

// VUE3
import bagubi from "./components/Preson.vue";

//是根组件

export default {
  //组件名
  name: "AppTitle",
  //注册组件
  // components: { PersonH},
  components: { bagubi},
};
</script>

<template>
  <div class="AppTitle">
    <h1 class="AppTitle">Vue Project 这里是App.vue文件夹，下面是bagubi组件</h1>
  </div>
  <!-- vue2 -->
  <!-- <PersonH /> -->

  <!-- vue3 -->
  <bagubi />
  
</template>

<style scoped>
.AppTitle {
  line-height: 1.5;
}
</style>