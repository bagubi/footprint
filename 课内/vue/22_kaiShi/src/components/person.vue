<template>
  <div class="person">
    <!-- 22:watchEffect -->
    <!-- 需求：当水温达到60度，或水位达到80cm，给服务器发请求 -->
    <!-- <h2>当前水温：{{waterTemperature}}°C</h2>
        <h2>当前水位：{{waterLevel}}cm</h2>
        <button @click="changeWaterTemperature">水温+10</button>
        <button @click="changeWaterLevel">水位+10</button> -->
    <!-- 23:标签的ref属性 -->
    <!-- <h1>中国</h1>
    <h2 ref="title2">广西</h2>
    <h3>南宁</h3>
    <button @click="showLog">点击输出h2这个元素</button> -->
  </div>
</template>

<script setup lang="ts" name="person">
import { ref, watch, watchEffect } from "vue";
//watch：明确写被监视的数据，执行回调函数
//watchEffect：

//23.
// import { defineExpose } from "vue";
//defineExpose：它的作用是让父组件能通过模板引用（ref）访问到子组件内部定义的变量或方法。
/* 注意此处报错：Vue 3 的 <script setup> 在编译时，会自动为 defineProps、defineEmits、defineExpose 这些宏生成声明。这种“自动声明”就相当于你的代码里已经有了一个“局部”的 defineExpose。
当你再从 vue 包里手动 import 它时，就等同于你在同一个作用域里声明了两次同名变量，因此 TypeScript 和 ESLint 都会报错“冲突”。 */

/*     //数据
let waterTemperature = ref(0)
let waterLevel = ref(0)

    //方法
function changeWaterTemperature(){
    waterTemperature.value += 10
}
function changeWaterLevel(){
    waterLevel.value += 10
} */
//监视（两个数据）

// watch([waterTemperature,waterLevel],(value)=>{
//     //输出
//    console.log(value);
//     // if(newWaterTemperature >= 60 || newWaterLevel >= 80){
//     //     console.log('水温达到60度，或水位达到80cm，给服务器发请求')
//     // }
//     //从value中解构出两个值，获取最新的水温（newTemp）和水位（newLevel）
//     const [newTemp, newLevel] = value;
//     if (newTemp >= 60 || newLevel >= 80) {
//       console.log('触发警报！');
//     }
// })

//如果要监视所有数据，且只要其中一个数据发生变化，就执行回调函数，可以使用watchEffect
// watchEffect(() => {
//     //不用写要监视什么，它全监视了
//     if(waterTemperature.value >= 60 || waterLevel.value >= 80){
//         console.log('水温达到60度，或水位达到80cm，给服务器发请求')
//     }
// })
// 23：标签的ref属性
//需要创建一个容器title2，来存储ref标记的内容-->h2这个元素
let title2 = ref();
function showLog() {
  console.log(title2.value);
  //这里会拿到dom元素，dom元素是一个对象，里面有很多属性和方法
}
// 一般来说，ref标记的元素是html标签
//写defineExpose（{}）就可以在父组件看子组件的变量和方法
defineExpose({
  title2,
});
</script>

<!-- 加了sccoped 属性，表示这个样式只对当前组件有效 -->
<style scoped></style>
