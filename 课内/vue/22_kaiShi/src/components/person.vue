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

    <!-- 25.props的使用 -->
    <p>接收到的属性值a：{{ a }}</p>
    <!-- <p>接收到的属性值list：{{ list }}</p> -->
    <ul>
      <!-- v-for="数据源的每一项（自由命名） in 数据源" -->
      <li v-for="item in list" :key="item.id">
        <!-- 没有key时，索引值会成为key，如果更新数据会报错 -->
        {{ item.name }}--{{ item.age }}
      </li>
    </ul>
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
/* let title2 = ref();
function showLog() {
  console.log(title2.value);
  //这里会拿到dom元素，dom元素是一个对象，里面有很多属性和方法
}
// 一般来说，ref标记的元素是html标签
//写defineExpose（{}）就可以在父组件看子组件的变量和方法
defineExpose({
  title2,
}); */

//24:回顾TS中的_接口_泛型_自定义类型
// 引入PersonInter
import { type PersonInter } from "@/types";
//因为PersonInter是一个接口（一个规范），告诉编译器我只导入类型，不导入值
// let person: PersonInter = { id: "asyud7asfd01", name: "张三", age: 18 }; //意思是定义的person变量，它要符合PersonInter这个接口的规范

// 方法一：使用接口
/* let personList: Array<PersonInter> = [
  { id: "asyud7asfd01", name: "张三", age: 18 },
  { id: "asyud7asfd02", name: "张四", age: 180 },
  { id: "asyud7asfd03", name: "张五", age: 1 },
];//意思是定义的personList变量，它是一个数组，数组里面的每一项都要符合PersonInter这个接口的规范 */

// 方法二：使用自定义类型
/* import { type Persons } from "@/types";
// Persons 是一个自定义类型（type alias），它等价于 PersonInter[]
// 所以 personList 必须是一个数组，且每一项符合 PersonInter 规范
let personList: Persons = [
  { id: "asyud7asfd1", name: "张三", age: 18 },
  { id: "asyud7asfd2", name: "张四", age: 180 },
  { id: "asyud7asfd3", name: "张五", age: 1 },
]; */

//25.props（父组件给子组件递东西的通道）的使用：
// import { defineProps } from "vue";// 直接使用，不需要导入
import { type Persons } from "@/types"; //在index.ts传出的规范
// import { withDefaults } from 'vue'
//with是伴随，Defaults是默认值，意思是给props设置默认值（直接使用，不需要导入）

//接收a
// defineProps(["a", "list"]); //接收一个参数，参数是一个数组，数组里面放的是属性名

//接收a同时将props保存起来
// let x = defineProps(["a", "b"]);
// 想要a
// console.log(x.a);

//接收list + 限制类型
// defineProps<{ list: Persons }>();

/* 终极写法！！！核心 */
//接收list
// + 限制类型
// + 限制必要性（在list【属性名】后面加一个？）
// + 指定默认值(用withDefaults包裹后写：，{})
withDefaults(defineProps<{ list?: Persons }>(), {
  list: () => [{ id: "ausydgyu01", name: "王刚•瑞欣•特仑苏", age: 18 }],
});
</script>

<!-- 加了sccoped 属性，表示这个样式只对当前组件有效 -->
<style scoped></style>
