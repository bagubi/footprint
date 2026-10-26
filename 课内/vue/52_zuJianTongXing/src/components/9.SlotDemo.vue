<template>
  <div class="demo">
    <h2>9. slot 插槽</h2>
    <!-- 
    默认插槽:
父：<Category title="游戏推荐"> 内容 </Category>
子： <slot>默认内容</slot>

    具名插槽:
    如：
父：<Category v-slot:s2>
    <template v-slot:s2>（ v-slot:2   =   #2
子：<slot name="s2">

    作用域插槽
    -->

    <Category title="游戏推荐">
      <template v-slot:s2>
        <ul>
          <li v-for="g in games" :key="g.id">{{ g.name }}</li>
        </ul>
      </template>

      <template #s1>
        <p>这是父组件传进来的内容</p>
      </template>
    </Category>
    <!-- 上面这双标签的优势：自定义！！！ -->

    <!--下面这个放在默认slot里 -->
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
