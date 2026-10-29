// import { ref, computed } from "vue";
//引入”小仓库“&“总经理”
import { defineStore } from "pinia";
//官方建议用use开头的，hooks（钩子函数）的命名规范。
export const useCountStore = defineStore("count", {
  // 这个花括号里是配置对象

  //47.pinia第三种修改数据的方法(可以限定极限值)
  actions: {
    //里面放动作函数（一个一个的方法，用于响应组件中的"动作"）
    //方便写逻辑复用
    increment(value: number) {
      // 这里填value是接收Count组件传来的
      console.log("increment被调用了", value);
      //修改数据(this是当前的store)
      console.log(this.sum);
      //限制：大于15就不给加了
      if (this.sum < 15) {
        this.sum += value;
      }
    },
  },
  // 配置项state:状态&数据（写成函数）真正存储数据的地方
  state() {
    return {
      sum: 6,
      caffeineLevel: 60,
      bugCount: 99,
      moodLevel: "good",
    };
  },
  //49.getters的使用(对数据不满意的时候可以加工一下)
  getters: {
    // 第一种写法
    // bigSum(state) {
    //   return state.sum * 10;
    // },
    // 第一种写法简便版(就不用写this)
    bigSum: (state) => state.sum * 10,

    // 第二种写法
    uppermoodLevel(state) {
      return state.moodLevel.toUpperCase();
      // 第三种写法(功能和上面一样)
      // return this.moodLevel.toUpperCase();
    },

    // 注意：如果不写(state)，就写个: string或者其他的
    // uppermoodLevel(): string {
    //   return this.moodLevel.toUpperCase();
    // },
  },
});
//这里就是一个仓库，统计相关的和、差、开根号的结果，都可以存这里
