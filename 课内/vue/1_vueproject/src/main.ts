//引入样式
// import './assets/main.css'

// 创立应用(盆)
import { createApp } from 'vue'

// 组件(根)
import App from './App.vue'

// 把花 App（组件）插盆 createApp()（应用）里
// 把花盆摆在家的哪个位置：mount（）是挂载，挂载到ID为app的元素上，这个容器在index.html(入口文件里)里
createApp(App).mount('#app')

