//主路由配置文件（必须）
//创建一个路由器并暴露出去

// 第一步：引入createRouter：创建路由器
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
//createWebHistory：history模式
//createWebHashHistory：hash模式

//引入一个一个可能要呈现的组件
import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import News from "@/pages/News.vue";
// 需要嵌套的详情组件
import NewsDetail from "@/components/NewsDetail.vue";
//老师的新闻子组件
import Detail from "@/components/Detail.vue";

// 第二步：创建路由器对象
const router = createRouter({
  //   router:路由器（一个应用有一个路由器就够了，用来管理路由）
  // history: createWebHistory(), //路由器工作模式：history模式
  history: createWebHashHistory(), //路由器工作模式：hash模式(模式的转变看着行)
  routes: [
    //routes里是一个一个的路由规则

    // {
    //   path: "路径",
    //   component: 组件,
    // }
    {
      name: "home-zhuye",
      path: "/",
      component: Home,
    },
    {
      name: "about-guanyv",
      path: "/about",
      component: About,
    },
    {
      path: "/news",
      component: News, // 父级路由
      // 下面写嵌套路由
      children: [
        {
          // 点击后
          path: ":id", // 动态参数，如 /news/001（不需要写/）
          name: "newsDetail",
          component: NewsDetail,
        },
        {
          // 点击前(content参数非必传的)
          path: "detail/:id6/:title/:content?", // 老师的新闻子组件
          //传递params参数时,需要提前在规则中占位
          name: "detail",
          component: Detail,
        },
      ],
    },
  ],
});
//暴露出去router
export default router;
