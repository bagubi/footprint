<template>
  <ul class="news-list">
    <li>这是老师写的新闻子组件</li>
    <li>
      id6:{{ params.id6 }} title:{{ params.title }} content:{{ query.content }}
    </li>
  </ul>
</template>
<script setup lang="ts" name="About">
import { useRoute } from "vue-router";
// useRoute():返回当前路由信息对象，包含 query、params、path 等
const route = useRoute();
console.log("Detail里的route=", route);

// 如果要用toRefs()解析route对象(路由信息对象),<RouterLink里的to就必须加:变:to才能被解析
import { toRefs } from "vue";
const { query, params } = toRefs(route);
</script>
<style scoped></style>
