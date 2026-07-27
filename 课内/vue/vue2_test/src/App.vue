<template>
  <!-- 3. 使用组件 -->
  <Person v-if="isShow" />
  <!-- 注意：
  v-show 是通过css的display属性来控制显示和隐藏的，组件不会被销毁，只是隐藏了而已
  v-if 会把结构删除，组件会被销毁 
  -->

  <button @click="add">切换</button>
  <!-- 4.启动代码
  npm run dev -->

  <!-- 5. 项目完成，最后打包代码
  npm run build -->
</template>

<script>
// 1. 导入组件
import Person from "./components/Person.vue";
export default {
  name: "App",
  // 2. 注册组件
  components: {
    Person,
  },
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    add() {
      this.isShow = !this.isShow;
    },
  },
};
</script>
