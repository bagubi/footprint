<template>
  <h2>9. slot 作用域插槽</h2>
  <div class="demo">
    <!-- 
    作用域插槽---父
    -->
    <!-- 数据在 子 ，但是生成结构的 父 需要 子 的数据 -->
    <Game>
      <template>
        <ul>
          <!-- 错误演示 -->
          <!-- <li v-for="g in games" :key="g.id">{{ g.name }}</li> -->
          <!-- 此时games访问不到-> 作用域问题 -->
        </ul>
      </template>
    </Game>

    <Game>
      <template v-slot:www="a233">
        <!-- 放在 www 槽里 -->
        <!-- 一般不叫a233，叫params -->

        <ol>
          <li v-for="y in a233.youxi2" :key="y.id">{{ y.name }}</li>
        </ol>
      </template>
    </Game>

    <Game>
      <template v-slot="{ youxi1 }">
        <!-- 解构出youxi -->
        <h3 v-for="p in youxi1" :key="p.id">{{ p.name }}</h3>
      </template>
    </Game>
  </div>
</template>

<script setup lang="ts">
import Game from "./communication/9.2Game.vue";
</script>

<style scoped>
.demo {
  padding: 16px;
  justify-content: center;
  display: flex;
}
img {
  width: 100%;
}
</style>
