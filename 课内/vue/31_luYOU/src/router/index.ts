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
          path: ":id/:id6/:title/:content?",
          //这里的/:id6/:title/:content?是接收params的,query不需要接收
          name: "newsDetail",
          component: NewsDetail,
        },
        {
          // 点击前(content参数非必传的)
          path: "detail/:id6/:title/:content?", // 老师的新闻子组件
          //传递params参数时,需要提前在规则中占位
          name: "detail",
          //显示Detail路由组件
          component: Detail,
          // 29.路由的props配置

          // 第一种写法:props会把接收到的params参数作为props传给路由组件
          // props: true,

          //第二种写法:函数写法, 可以自己决定将什么作为props给路由组件
          props(route) {
            console.log("~~~", route);
            // return {
            //   x: 100,
            //   y: 200,
            //   z: 300,
            // };
            /* 一般决定是query */
            // return route.query;
            //我自己拼合的笔记需要用params和query
            return {
              // 从 params 提取
              id6: route.params.id6,
              title: route.params.title,

              // 从 query 提取
              like: route.query.like,
              game: route.query.game,
              content: route.query.content,
            };
          },
          //第三种写法:对象写法,同样可以自己决定将什么作为props给路由组件
          // props: {
          //   a: 100,
          //   b: 200,
          //   c: 300,
          // },
        },
      ],
    },
  ],
});
//暴露出去router
export default router;
