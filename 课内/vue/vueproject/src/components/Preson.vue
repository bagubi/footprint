//在组件文件夹中
<template>
  <!-- html 代码 -->
  <!-- <div class="Person">
    <h2>{{ name }}</h2>
    <h2>{{ age }}</h2>
    <h2>{{ addroute }}</h2> -->
    <!-- 
    @：是 v-on: 的简写
    click：DOM 的点击事件
    ="..."：事件触发时要执行的代码 
    -->
    <!-- <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看联系方式</button>
  </div> -->
  <div class="Person"> 
    <!-- 这里是在14课后注释掉 -->
    <!-- <h2>一件{{shirt.brand}}衬衫的价格是{{shirt.price}}镑</h2>
    <button @click="changePrice">修改衣服的价格</button>
    <button @click="changeShirt">修改衣服</button>
    <br>
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="changeSum">点我sum+1</button> -->
    
    <!-- <h2>游戏列表：</h2>
    <ul> -->
       <!-- v-for="变量 in 数组" -->
      <!-- <li v-for="game in games" :key="game.id">{{game.name}}</li>
    </ul>
    <button @click="changeGameName">修改第一个游戏名字</button> -->

    <div class="person">
      <h2>名字：{{person.name}}</h2>
      <h2>年龄：{{person.age}}</h2>
      <button @click="changeName">修改名字</button>
      <button @click="changeAge">修改年龄</button>
      <!-- 注：按Alt键可以选择多个东西 -->
    </div>

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
//  ref() 函数可以定义一个响应式数据、对象
//  reactive() 函数可以定义一个对象，对象中的属性也可以是响应式数据 -->
import { ref } from "vue";
// //哪个是基本类型响应式就给哪个加 ref() 就完事了


// let name = ref("张三");
// let age = ref(25);
// let tel = "13800138000";
// let addroute = "北京";
// function changeName() {
//   name.value = "李四";
// //ref()在JS层面要碰到数据要.value
//   console.log(name.value);
// }
// function changeAge() {
//   age.value += 1;
//   console.log(age.value);
// }
// function showTel() {
//   alert(tel);
// }

//12:reactive创建_对象类型的响应式数据
import { reactive } from "vue";
// 被reactive包裹后不是单纯的原对象，是响应式对象，也是proxy对象了（不重要）

//数据（14后注）
// let shirt = reactive({ brand: "李宁", price: 100 })
// let sum = ref(0)
//reactive里面不止可以包裹对象，还可以包裹数组，不能包裹基本类型
// let games = reactive([
//   { id: 1, name: '原神' },
//   { id: 2, name: 'DNF' },
//   { id: 3, name: 'CSGO' },
//   { id: 4, name: 'NF' },
//   { id: 5, name: 'LOL' },

// ])

// let games = ref([
//   { id: 1, name: '原神' },
//   { id: 2, name: 'DNF' },
//   { id: 3, name: 'CSGO' },
//   { id: 4, name: 'NF' },
//   { id: 5, name: 'LOL' },

// ])

//方法（14后注）
// function changePrice(){
// shirt.price += 10;
// }
// //修改游戏名字方法
// // function changeGameName(){
// //   games.value[0].name = '绝区零'
// // }

// function changeSum(){
//   sum.value += 1;
// }
// function changeShirt() {
//   //注意这个，reactive的对象修改要用这种方法
//   Object.assign(shirt, { brand: '耐克', price: 200 })
//   //但是ref的对象修改要用这种方法
//   // shirt.value = { brand: '耐克(用ref改的)', price: 250 }
// }
//15.数据
let person = reactive({
  name: '张三',
  age: 25,
})
//15
import { toRefs } from "vue";
//知道就好:toRefs()一个一个取
import { toRef } from "vue";
let nl = toRef(person, 'name');
console.log(nl);


// 《《《《《《《《在外面写这个
// let { name, age } = person;

//这句话的意思是下面两句：
// let name = person.name;
// let age = person.age;

//要用toRefs()包裹,里面的name和age是ref响应式数据,他顺便把person.name和person.age也改了
let { name, age } = toRefs(person);
//方法
function changeName() {
  //直接修改 reactive 对象属性 → 响应式更新
  person.name = '李四'

  //里面写这个，是没用的》》》》》》》
  // name = '王五'

  //用toRefs()包裹的，修改 toRefs 解构出的 ref → 同步更新 person.name
  name.value = '王五'

  console.log(name, person.name, name.value);
  // 输出是：
  // RefImpl {value: "王五", __v_isRef: true}
  // "王五"
  // "王五"
  // 他顺便把person.name也改了
}
function changeAge() {
  person.age += 1
  console.log(age,person.age, age.value);
}
</script>




<style scoped>
/* CSS 样式 */
.Person {
  background-color: sandybrown;
}
li{
  font-size: 20px;
}
</style>