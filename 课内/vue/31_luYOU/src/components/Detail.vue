<template>
  <ul class="news-list">
    <li>这是老师写的新闻子组件</li>
    <li>
      从 Vue Router 的全局路由状态中获取:id6:{{ params.id6 }} title:{{
        params.title
      }}
      content:{{ query.content }}
      <br />
      <!-- props的第一种写法 -->
      props传的:id6:{{ id6 }} title:{{ title }} content:{{ content }}
      <!-- 第二种(试例) -->
      <!-- id6:{{ x }} title:{{y}} content:{{ z }} -->
      <!-- 第三种 -->
      <!-- id6:{{ a }} title:{{ b }} content:{{ c }} -->
    </li>
  </ul>
</template>
<script setup lang="ts" name="About">
// 从 Vue Router 的全局路由状态中获取
// 主动拉取：组件自己调用 Hook 去拿
import { useRoute } from "vue-router";
// useRoute():返回当前路由信息对象，包含 query、params、path 等
const route = useRoute();
console.log("Detail里的route=", route);

// 如果要用toRefs()解析route对象(路由信息对象),<RouterLink里的to就必须加:变:to才能被解析
import { toRefs } from "vue";
const { query, params } = toRefs(route);

//39.props的从父组件通过标签属性传进来的值(<Detail :id6="id6" :title="title" :content="content" />)
// 或 路由配置的 props接收
// 39.props第一种写法
defineProps([`id6`, `title`, `content`]);
//第二种(defineProps只能调用一次,第二次会覆盖第一次)
// defineProps(["x", "y", "z"]);
// 第三种:是写死的,a只能是100
// defineProps(["a", "b", "c"]);
</script>
<style scoped></style>
