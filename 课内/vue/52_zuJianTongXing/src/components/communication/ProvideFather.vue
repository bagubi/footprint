<template>
  <div class="box">
    <h3>父组件</h3>
    <Son />
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
// 这里的provide
import Son from "./ProvideSon.vue";

const msg = ref("我是 provide 的数据");
function updateMsg(value: any) {
  msg.value += value;
}
//格式（向其后代提供数据
// provide("名字", 值);
provide("msg", { msg, updateMsg });
// 千万不能.value如：
// provide("msg", msg.value);===错
// provide("msg", msg);===对

//如果：
// provide("msg",{msg:msg.value,updateMsg})
// 传的就是msg.value这个具体的值，就不是响应式
</script>
