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
      name: "news-xinwen",
      path: "/news",
      component: News,
    },
  ],
});
//暴露出去router
export default router;
