// import { ref, computed } from "vue";
//引入”小仓库“&“总经理”
import { defineStore } from "pinia";
//官方建议用use开头的，hooks（钩子函数）的命名规范。
export const useCountStore = defineStore("count", {
  // 这个花括号里是配置对象

  // 配置项state:状态&数据（写成函数）真正存储数据的地方
  state() {
    return {
      sum: 6,
    };
  },
});
//这里就是一个仓库，统计相关的和、差、开根号的结果，都可以存这里
