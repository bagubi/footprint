<template>
  <div class="demo">
    <h2>8. pinia 全局状态管理</h2>
    <!-- 直接参考之前45集的pinia -->
    <h3>当前求和：{{ sum }}，放大 10 倍：{{ bigSum }}</h3>
    <h3>
      咖啡因浓度：{{ caffeineLevel }}，bug 剩余：{{ bugCount }}，心情等级：{{
        uppermoodLevel
      }}
    </h3>

    <select v-model.number="selected">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>

    <button @click="add">加</button>
    <button @click="sub">减</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useCountStore } from "@/stores/count";

const countStore = useCountStore();

// 用 storeToRefs 解构 state 和 getters，保持响应式
const { sum, caffeineLevel, bugCount, uppermoodLevel, bigSum } =
  storeToRefs(countStore);

const selected = ref(1);

function add() {
  countStore.increment(selected.value);
}

function sub() {
  countStore.decrement(selected.value);
}
</script>

<style scoped>
.demo {
  padding: 16px;
}

select,
button {
  margin: 0 5px;
  height: 28px;
}
</style>
