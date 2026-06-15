//在组件文件夹中
<template>
  <!-- html 代码 -->
  <div class="Person">
    <h2>{{ name }}</h2>
    <h2>{{ age }}</h2>
    <h2>{{ addroute }}</h2>
    <!-- 
    @：是 v-on: 的简写
    click：DOM 的点击事件
    ="..."：事件触发时要执行的代码 
    -->
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看联系方式</button>
  </div>
</template>
<!-------------- -------- 写一个组件 ----------------------->
<!-- 到10 -->
<!-- <script  lang="ts">
export default {
    name: 'PersonH', // 修改组件名称
    // 选项式API===>Vue2
    ////数据
    // data() {
    //     return {
    //         name: '张三',
    //         age: 25,
    //         tel: '13800138000'
    //     };
    // },
    ////方法
    // methods: {
    //     changeName(){
    //         this.name = '李四';
    //     },
    //     changeAge(){
    //         this.age +=1;
    //     },

    //     showTel() {
    //         alert(this.tel);
    //     }
    // },

    //VUE3
    //data和methods合并为setup函数，他们可以同时存在
    // setup不能用this,但是data和methods可以用this
    // setup不能读取data和methods中的数据，但data和methods中的数据可以读取setup中的数据
    setup() {
        //数据
        //setup函数中没有this,是undefined
        let name = '张三';
        let age = 25;
        let tel = '13800138000';

        function changeName(){
            name= '李四';
            console.log(name);
        }
        function changeAge(){
            age +=1;
            console.log(age);
        }
        function showTel() {
            alert(tel);
        }
       
        return {
            name,
            age,
            tel,
            changeName,
            changeAge,
            showTel
        };
        // return ()=>'哈哈';
    },
};
</script> -->


<!-- 一个插件便于组件命名npm i vite-plugin-vue-setup-extend -D -->
 <!-- 原本要写---用来定义组件名字,用了上面这个就不用了
 <script>
  export default {
    name: "bagubi",
  },
 } 
 </script>
 -->
<script setup lang="ts" name="bagubi">
// 在这里写JS或TS
// 有了 setup 这个语法糖可以不用写 setup 和 return 了
// VUE3组合式API


// <!-- 11.基本类型的响应式数据 -->
//  <!-- VUE3有两个可以定义响应式数据 ref & reactive 
//  ref() 函数可以定义一个响应式数据，
//  reactive() 函数可以定义一个对象，对象中的属性也可以是响应式数据 -->
import { ref } from "vue";
//哪个是响应式就给哪个加 ref() 就完事了

let name = ref("张三");
let age = ref(25);
let tel = "13800138000";
let addroute = "北京";
function changeName() {
  name.value = "李四";
  console.log(name.value);
}
function changeAge() {
  age.value += 1;
  console.log(age.value);
}
function showTel() {
  alert(tel);
}
</script>




<style scoped>
/* CSS 样式 */
.Person {
  background-color: sandybrown;
}
</style>