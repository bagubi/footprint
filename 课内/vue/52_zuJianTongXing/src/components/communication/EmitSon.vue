<template>
  <div class="box">
    <h4>子组件</h4>
    <button @click="send(2, 3, $event)">发送消息给父组件</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

// 声明要触发哪些事件
const emit = defineEmits<{
  //  defineEmits声明：告诉 Vue "我这个组件会发出哪些事件"（这里是 send-msg）
  // 返回一个函数：emit，你用它来触发事件
  // 它不监听任何东西。它只是"登记表"+"发射器"。
  (e: "send-msg", msg: string): void;
  // 函数签名，表示：事件名是 send-msg，
  // 参数是 string，返回值是 void（无返回值）
}>();

// 触发自定义事件
function send(a: number, b: number, c: MouseEvent) {
  /*   Event（所有事件的基类）   <---$event(事件对象)
├── MouseEvent（鼠标事件）   <---c
│   ├── PointerEvent（指针事件）
│   └── WheelEvent（滚轮事件）
├── KeyboardEvent（键盘事件）
├── TouchEvent（触摸事件）
└── ... */
  emit("send-msg", "我是子组件的数据");
  console.log("test", a, b, c);
}

// 老师教用生命周期函数触发
onMounted(() => {
  setTimeout(() => {
    emit("send-msg", "我是子组件的数据，用老师生命周期触发的");
  }, 5000);
});
</script>

<style scoped>
.box {
  padding: 16px;
  border: 2px dashed #42b883;
  border-radius: 8px;
}
</style>
