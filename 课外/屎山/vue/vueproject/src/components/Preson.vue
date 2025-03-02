<template>
    <div class="Person">
        <h2>{{ name }}</h2>
        <h2>{{ age }}</h2>
        <h2>{{ addroute }}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="showTel">查看联系方式</button>
    </div>
</template>
<!---------------------- 写一个组件 ----------------------->
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
    setup() {
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
<script setup lang="ts" name="bagubi">
// VUE3组合式API
let name = '张三';
let age = 25;
let tel = '13800138000';
let addroute ="北京"
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
</script>
<style scoped>
.Person {
    background-color: sandybrown;
}
</style>