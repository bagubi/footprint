<template>
    <div class="Person">
        <h2>{{ name }}</h2>
        <h2>{{ age }}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="showTel">查看联系方式</button>
    </div>
</template>

<!-- 到9 -->
<!-- <script  lang="ts">
export default {
    name: 'PersonH', // 修改组件名称
    // 选项式API===>Vue2
    // data() {
    //     return {
    //         name: '张三',
    //         age: 25,
    //         tel: '13800138000'
    //     };
    // },
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
<script setup lang="ts">
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
</script>
<style scoped>
.Person {
    background-color: sandybrown;
}
</style>