<template>
  <div class="demo">
    <h2>9. slot 插槽</h2>
    <!-- 
    默认插槽
    具名插槽
    作用域插槽
    -->
    <Category title="游戏推荐">
      <p>这是父组件传进来的内容</p>
      <ul>
        <li v-for="g in games" :key="g.id">{{ g.name }}</li>
      </ul>
    </Category>
    <!-- 上面这双标签的优势：自定义！！！ -->
    <Category title="影视推荐">
      <img :src="imgUrl" alt="" />
    </Category>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import Category from "./communication/9.1Category.vue";
let games = reactive([
  { id: 1, name: "无限暖暖" },
  { id: 2, name: "QQ飞车" },
]);
let imgUrl = "https://z1.ax1x.com/2023/11/19/piNxLo4.jpg";
</script>

<style scoped>
.demo {
  padding: 16px;
}
img {
  width: 100%;
}
</style>
