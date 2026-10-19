<template>
  <div class="box">
    <h4>子组件</h4>
    <!-- <input
      :value="modelValue"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    /> -->
    <!-- 原始输入框,用value,值是:modelValue2 -->
    <!-- <input
      :value="modelValue2"
      @input="
        emit('update:modelValue3', ($event.target as HTMLInputElement).value)
      "
    /> -->

    <!-- 父写 <Son v-model:WQ="text" v-model:FL="eee" />后 -->
    <input
      :value="WQ"
      @input="emit('update:WQ', ($event.target as HTMLInputElement).value)"
    />
    <input
      :value="FL"
      @input="emit('update:FL', ($event.target as HTMLInputElement).value)"
    />
    <!-------------------------------- 注释-------------------------------->
    <!-- :value 是"把 modelValue 的值渲染到 input 上" -->

    <!-- @input 里写的是"用户输入时，把输入框的新值 emit 给父组件" 
          用户每输入一个字符，@input 就会触发一次。
    -->
    <!-- @input="
        emit('update:modelValue3',<<<点击或者改变输入框,这个位置有什么输入框就有什么>>>)
      " -->
  </div>
</template>

<script setup lang="ts">
// ============================================================
// defineProps：声明接收父组件传下来的 prop
// - prop 名必须叫 modelValue（v-model 的约定）
// ============================================================
// defineProps<{ modelValue: string }>();
// defineProps<{ modelValue2: string }>();
// 这里modelValue加了个2是因为父亲中属性名加了个2
// (接收了下面这个model-value2,收到后放<input里了)
// <Son
//       :model-value2="username1"
// 儿子需要接收同名的

// 老师教的写法--->
// defineProps(["modelValue2"]);

// 修改model-value后
defineProps(["WQ", "FL"]);
// ============================================================
// defineEmits：声明本组件会发出哪些事件（登记表 + 返回发射器）
// - 事件名必须是 "update:modelValue"（v-model 的约定：update: + prop名）
// - 参数 value 是 string（用户输入的新值）
// - 返回值 void（事件不需要返回值）
// ============================================================
// const emit = defineEmits<{
//   (e: "update:modelValue3", value: string): void;
// }>();

// 老师教的写法--->
const emit = defineEmits(["update:WQ", "update:FL"]);
// const emit = defineEmits(["update:modelValue3"]);
</script>

<style scoped>
.box {
  padding: 16px;
  border: 2px dashed #42b883;
  border-radius: 8px;
}
</style>
