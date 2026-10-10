import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(createPinia()); // ← 注册 pinia
app.use(router);
app.mount("#app");
