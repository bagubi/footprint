<template>
  <div class="talk">
    <button @click="getLoveTalk">获取一句土味情话</button>
    <ul>
      <!-- 46.用 -->
      <li v-for="talk in loveTalkStore.talkList" :key="talk.id">
        {{ talk.title }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import axios from "axios";
import { nanoid } from "nanoid";
// 46.
import { useLoveTalkStore } from "@/stores/loveTalk";
const loveTalkStore = useLoveTalkStore();

// nanoid是分别暴露，所以要加花括号引入
//数据
// let talkList = reactive([

//此处数据46的时候删了

// ]);

//方法
async function getLoveTalk() {
  //发情求,下面这个的写法是连续解构覅赋值+重命名
  let {
    data: { data: gaiMing },
  } = await axios.get(`https://hmajax.itheima.net/api/randjoke`);
  //   async:这个函数是异步的
  //   await:等它完成，拿到结果

  //   console.log(result.data.data);
  //   alert(result.data.data);
  //把请求回来的字符串，包装成一个对象
  //安装npm i nanoid
  let obj = { id: nanoid(), title: gaiMing };
  //放到数组中(46.加了loveTalkStore)
  loveTalkStore.talkList.unshift(obj);
}
</script>
<style scoped>
.talk {
  background-color: rgb(235, 202, 135);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}
</style>
