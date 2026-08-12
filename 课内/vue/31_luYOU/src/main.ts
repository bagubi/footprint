//引入createApp用于创建应用
import { createApp } from "vue";
//引入App组件（根组件）
import App from "./App.vue";
//引入路由器
import router from "./router/index.ts";

//创建应用并挂载到#app上
// createApp(App).mount("#app");
//createApp(App)是在创建整个应用

//上面等同
// 创捷一个应用
// const app = createApp(App);
// 使用路由
// app.use(router);
//挂载整个应用到#app上
// app.mount("#app");

//简写
createApp(App).use(router).mount("#app");
