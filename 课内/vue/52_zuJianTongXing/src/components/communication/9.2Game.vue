<template>
  <div class="game">
    <!-- 
    作用域插槽---子
    -->
    <slot :youxi1="games" x="哈哈" y="凯亚"></slot>
    <!-- 传递games、x、y,他们三都被打包成一个对象 -->

    <slot :youxi2="games" name="www"></slot>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
let games = reactive([
  { id: 1, name: "无限暖暖" },
  { id: 2, name: "QQ飞车" },
]);
</script>

<style scoped>
.game {
  width: 200px;
  height: 300px;
  background-color: rgb(255, 245, 198);
  /* 圆角 */
  border-radius: 10px;
  /* 阴影 */
  box-shadow: 0 0 1;
  margin: 16px;
}
</style>
