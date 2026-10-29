<template>
  <div class="talk">
    <button @click="getLoveTalk">获取一句土味情话</button>
    <ul>
      <!-- 46.用 -->
      <li v-for="talk in talkList" :key="talk.id">
        {{ talk.title }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
// import { reactive } from "vue";
// import axios from "axios";
// import { nanoid } from "nanoid";

// 46.
import { useLoveTalkStore } from "@/stores/loveTalk";
const loveTalkStore = useLoveTalkStore();
// 48.解构赋值
import { storeToRefs } from "pinia";
const { talkList } = storeToRefs(loveTalkStore);
// nanoid是分别暴露，所以要加花括号引入

//数据
// let talkList = reactive([

//此处数据是笑话，46的时候删了

// ]);
// 50.$subscribe的使用
loveTalkStore.$subscribe((mutate, state) => {
  // $subscribe接收两个信息，mutate：本次修改的信息，state：数据
  console.log(
    "loveTalkStore里面保存的数据发生了变化",
    "mutate：",
    mutate,
    "state：",
    state,
  );
  //使用场景假设：
  localStorage.setItem("talkList", JSON.stringify(state.talkList));
  // 上面这是个浏览器本地存储,localStorage里必须存字符串,如果不是字符串，底层会调用toString(),
  //对象和数组直接存进去会变成无意义的字符串,如：{ a: 1 }  ==toString()==>>	 "[object Object]"
  //JSON.stringify()把对象/数组转成字符串
});
//方法
async function getLoveTalk() {
  // //发情求,下面这个的写法是连续解构覅赋值+重命名
  // let {
  //   data: { data: gaiMing },
  // } = await axios.get(`https://hmajax.itheima.net/api/randjoke`);
  // //   async:这个函数是异步的
  // //   await:等它完成，拿到结果

  // //   console.log(result.data.data);
  // //   alert(result.data.data);
  // //把请求回来的字符串，包装成一个对象
  // //安装npm i nanoid
  // let obj = { id: nanoid(), title: gaiMing };
  // //放到数组中(46.加了loveTalkStore)
  // loveTalkStore.talkList.unshift(obj);

  // 48.storeToRefs
  loveTalkStore.getATalk();
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
