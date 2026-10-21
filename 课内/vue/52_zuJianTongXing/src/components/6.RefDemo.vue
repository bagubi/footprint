<template>
  <div class="demo">
    <h2>6. ref 父取子</h2>
    <button @click="getSonData">获取子组件数据</button>
    <!-- 第 1 步：父组件用 ref 绑定子组件 -->
    <Son ref="sonRef" />
    <!-- 上面这 -->
    <!-- 假设我有个需求，得到所有的孩子 -->
    <button @click="gatAllChild($refs)">获得所有的子组件示例对象</button>
    <h2>$parent子取父</h2>
    <ParentDemo />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Son from "./communication/RefSon.vue";
import ParentDemo from "./communication/ParentDemo.vue";
// 和这个sonRef名称必须一样
const sonRef = ref();
// 渲染完成后，sonRef.value 就指向子组件实例（组件公开的接口）。

function getSonData() {
  // 用儿子数据
  console.log("子组件的数据：", sonRef.value.sonMsg);
  // 用儿子方法
  sonRef.value.sonMethod();
}

function gatAllChild(refs: { [key: string]: any }) {
  // 意思是：我refs对象里面有key，它是个字符串（string），里面存的千奇百怪（any)
  //refs已经是响应式对象所以读它不用.value
  for (let key in refs) {
    console.log("用$refs找子组件数据：", refs[key].sonMsg);
  }
}
</script>
