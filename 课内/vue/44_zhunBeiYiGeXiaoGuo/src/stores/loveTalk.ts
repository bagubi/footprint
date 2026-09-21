// import { ref, computed } from "vue";
//引入”小仓库“&“总经理”
import { defineStore } from "pinia";
//官方建议用use开头的，hooks（钩子函数）的命名规范。
export const useLoveTalkStore = defineStore("talk", {
  // 这个花括号里是配置对象

  // 配置项state:状态&数据（写成函数）真正存储数据的地方
  state() {
    return {
      talkList: [
        {
          id: "ftrfasdf01",
          title: "今天你有点怪，哪里怪？怪好看的！",
        },
        {
          id: "ftrfasdf02",
          title: "草莓、蓝莓、蔓越莓，今天想我了没？",
        },
        {
          id: "ftrfasdf03",
          title: "心里给你留了一块地，我的死心塌地",
        },
      ],
    };
  },
});
//这里就是一个仓库，统计相关的和、差、开根号的结果，都可以存这里
