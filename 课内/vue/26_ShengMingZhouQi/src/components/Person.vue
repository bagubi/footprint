<template>
  <div class="person">
    <!-- <h2>当前求和为：{{ sum }}</h2>
    <button @click="add">+</button> -->
    <h2>当前求和为：{{ sum }}，放大10倍为：{{ bigSum }}</h2>
    <button @click="add">点我sum+1</button>
    <hr />
    <img v-for="(dog, index) in dogList" :src="dog" :key="index" />
    <button @click="getDog">点我加一只狗狗</button>
  </div>
</template>
<script setup lang="ts">
/* import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";
//数据
const sum = ref(0);
//方法
function add() {
  sum.value++;
}
//生命周期创建(没有创建前和创建完毕，只有创建)
console.log("创建");

//挂载前onBeforeMount
onBeforeMount(() => {
  console.log("挂载前");
});

//挂载完毕onMounted
onMounted(() => {
  console.log("子---挂载完毕");
});
//更新前onBeforeUpdate
onBeforeUpdate(() => {
  console.log("更新前");
});
//更新完毕onUpdated
onUpdated(() => {
  console.log("更新完毕");
});
//卸载前onBeforeUnmount
onBeforeUnmount(() => {
  console.log("卸载前");
});
//卸载完毕onUnmounted
onUnmounted(() => {
  console.log("卸载完毕");
}); */
import useSum from "../hooke/useSum";
import useDog from "../hooke/useDog";
const { sum, add, bigSum } = useSum();
const { dogList, getDog } = useDog();
</script>
<style scoped>
.person {
  padding: 20px;
}

img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin: 10px;
  border-radius: 8px;
}
</style>
