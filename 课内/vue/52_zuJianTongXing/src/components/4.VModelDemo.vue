<template>
  <div class="demo">
    <h2>4. v-model 双向绑定</h2>
    <h3>
      父组件的值：{{ text }}&nbsp;&&nbsp;{{ username }}&nbsp;&&nbsp;{{ eee }}
    </h3>
    <!-- v-model用在组件标签上 -->
    <!-- <Son v-model="text" /> -->

    <!-- 修改model-value 和 update:model-value-->
    <!-- 方法一: -->
    <Son v-model:WQ="text" v-model:FL="eee" />
    <!-- 这里 WQ 和 FL 是起名 -->
    <!-- 方法二: -->
    <!-- <Son
      :model-value2="username"
      @update:model-value3="username = $event"
    ></Son> -->

    <!-- 父组件传的 prop 名是 modelValue2
        父组件监听的事件名是 update:modelValue（没有 2） -->

    <!-- v-model用在html标签上,不对应任何子组件 -->
    <!-- <input v-model="text" /> -->
    <!-- 上下相等 -->
    <input
      :value="username"
      @input="username = ($event.target as HTMLInputElement).value"
    />
    <!-- $event到底是啥?什么时候能.target
     对于原生事件,$event就是事件对象=====>能.target
     对于自定义事件时,所传递的数据=====>不能.target(没有)
      -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Son from "./communication/VModelSon.vue";
//数据
const text = ref("初始值");
const username = ref("老师的初始值");
const eee = ref("这是Son组件传的第二个值");
</script>
