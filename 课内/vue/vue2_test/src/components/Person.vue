<!-- components是专门放组件的 -->
<template>
  <div class="person">
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="add">点我sum+1</button>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "Person",
  // 数据
  data() {
    return {
      sum: 1, //这里sum被放到一个地方
    };
  },
  // 方法
  methods: {
    add() {
      this.sum++; //这个this就是指的就是这个地方
    },
  },
  //创建前的钩子
  beforeCreate() {
    console.log("组件创建前");
  },
  //创建完毕的钩子
  created() {
    console.log("组件创建完毕");
  },
  //挂载前的钩子
  beforeMount() {
    console.log("组件挂载前");
    // debugger;
  },
  //挂载完毕的钩子
  mounted() {
    console.log("组件挂载完毕");
  },
  //更新前的钩子
  beforeUpdate() {
    console.log(
      "组件更新前，数据：" + this.sum,
      "; DOM内容：" + document.querySelector("h2").textContent,
    );
  },
  //更新完毕的钩子
  updated() {
    console.log(
      "组件更新完毕，数据：" + this.sum,
      "; DOM内容：" + document.querySelector("h2").textContent,
    );
  },
  //vue2的销毁钩子
  /*   //销毁前的钩子
  beforeDestroy() {
    console.log("组件销毁前");
  },
  //销毁完毕的钩子
  destroyed() {
    console.log("组件销毁完毕");
  }, */
  //vue3的销毁钩子
  beforeUnmount() {
    console.log("组件销毁前");
  },
  unmounted() {
    console.log("组件销毁完毕");
  },
};
</script>
<style scoped>
.person {
  /* 设置背景颜色为粉色 */
  background-color: pink;

  /* 设置内边距为 20px */
  padding: 20px;

  /* 设置圆角为 10px */
  border-radius: 10px;

  /* 设置阴影效果 */
  box-shadow: 0 0 10px;
}
</style>
