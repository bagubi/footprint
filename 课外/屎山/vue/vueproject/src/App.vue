<script lang="ts">
import PersonH from './components/Preson.vue';

export default {
  name: 'AppTitle',
  components: { PersonH }
 };
</script>

<template>
  <div class="AppTitle">
    <h1 class="AppTitle">Vue Project</h1>
  </div>
  <PersonH />
</template>

<style scoped>
.AppTitle {
  line-height: 1.5;
}
</style>