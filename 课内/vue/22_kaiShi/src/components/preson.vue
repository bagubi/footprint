<template>
    <div class="person">
    <!-- 22:watchEffect -->
     <!-- 需求：当水温达到60度，或水位达到80cm，给服务器发请求 -->
        <h2>当前水温：{{waterTemperature}}°C</h2>
        <h2>当前水位：{{waterLevel}}cm</h2>
        <button @click="changeWaterTemperature">水温+10</button>
        <button @click="changeWaterLevel">水位+10</button>
    </div>


</template>

<script setup lang="ts" >
import { ref, watch, watchEffect } from 'vue'
//watch：明确写被监视的数据，执行回调函数
//watchEffect：
    //数据
let waterTemperature = ref(0)
let waterLevel = ref(0)
    //方法
function changeWaterTemperature(){
    waterTemperature.value += 10
}
function changeWaterLevel(){
    waterLevel.value += 10
}
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
watchEffect(()=>{
    if(waterTemperature.value >= 60 || waterLevel.value >= 80){
        console.log('水温达到60度，或水位达到80cm，给服务器发请求')
    }
})

</script>

<style>

</style>