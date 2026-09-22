// import { ref, computed } from "vue";
//引入”小仓库“&“总经理”
import { defineStore } from "pinia";
import axios from "axios";
import { nanoid } from "nanoid";

//官方建议用use开头的，hooks（钩子函数）的命名规范。
export const useLoveTalkStore = defineStore("talk", {
  // 这个花括号里是配置对象
  // 48.
  actions: {
    async getATalk() {
      //发情求,下面这个的写法是连续解构覅赋值+重命名
      let {
        data: { data: gaiMing },
      } = await axios.get(`https://hmajax.itheima.net/api/randjoke`);
      //   async:这个函数是异步的
      //   await:等它完成，拿到结果

      //把请求回来的字符串，包装成一个对象
      //安装npm i nanoid
      let obj = { id: nanoid(), title: gaiMing };
      //放到数组中(46.加了loveTalkStore)
      this.talkList.unshift(obj);
    },
  },
  // 配置项state:状态&数据（写成函数）真正存储数据的地方
  state() {
    return {
      talkList: JSON.parse(localStorage.getItem("talkList") || "[]"),
      //这里要不是 || "[]"   要不是 as string
    };
  },
});
//这里就是一个仓库，统计相关的和、差、开根号的结果，都可以存这里
