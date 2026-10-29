import { createApp } from "vue";
//46.第一步：引入pinia
import { createPinia } from "pinia";
import App from "./App.vue";

const app = createApp(App);
//第二步：创建pinia
const pinia = createPinia();
// app.use(createPinia());

//第三步：安装pinia
app.use(pinia);

app.mount("#app");
