<template>
  <div class="app">
    <!-- 一般组件 -->
    <Header /><!-- 是个标题 -->

    <!-- 导航区 -->
    <div class="navigate">
      <RouterLink to="/" class="nav-link" active-class="active"
        >🏠 首页</RouterLink
      >
      <RouterLink to="/about" class="nav-link" active-class="active"
        >📖 关于</RouterLink
      >
      <!-- 这里的to都是字符串，to后面还可以跟对象(如下)。 -->
      <RouterLink :to="{ path: '/news' }" class="nav-link" active-class="active"
        >📰 新闻</RouterLink
      >
    </div>
    <!-- 展示区 -->
    <div class="main-content">
      <div class="content-wrapper">
        <!-- ✅ 路由出口，组件将显示在这里 -->
        <router-view /><!-- 路由器试图 -->
        <!-- 
        <div class="content-icon">📦</div>
        <p class="content-text">
          此处之后要展示各种组件，到底展示哪个组件，需要看路径
        </p>
        <div class="content-hint">
          <span class="hint-tag">💡 提示</span>
          <span>点击导航切换路由</span>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup name="App">
/* 请路由 */
/* 第一步：安装路由依赖
npm install vue-router
第二步：创建路由配置文件
在 src 目录下创建 router 文件夹，并在其中创建 index.ts 文件，内容如下
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
] */
import Header from "./components/Header.vue";
</script>
<style scoped>
/* ========== 全局重置 ========== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
  background: #f0f2f5;
}

/* ========== App 容器 ========== */
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  /* min-height: 100vh; */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* ========== 导航区 ========== */
.navigate {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  margin-bottom: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
}

.nav-link {
  display: inline-block;
  padding: 12px 32px;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  text-decoration: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
}

/* 导航链接悬停效果 */
.nav-link::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}

.nav -link:hover::before {
  left: 100%;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

/* 导航链接点击效果 */
.nav-link:active {
  transform: translateY(0px) scale(0.95);
}
/*  激活状态高亮 */
.nav-link.active {
  background: rgba(255, 255, 255, 0.35);
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

/* ========== 展示区 ========== */
.main-content {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 40px;
  min-height: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
}

.content-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  animation: float 3s ease-in-out infinite;
}

.content-text {
  font-size: 1.2rem;
  color: #333;
  line-height: 1.8;
  max-width: 600px;
  margin-bottom: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  font-weight: 400;
}

.content-hint {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  background: #fff3cd;
  border-radius: 50px;
  color: #856404;
  font-size: 0.95rem;
  border: 1px solid #ffc107;
  margin-top: 10px;
}

.hint-tag {
  display: inline-block;
  padding: 2px 12px;
  background: #ffc107;
  color: #fff;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.85rem;
}

/* ========== 动画 ========== */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* ========== 响应式设计 ========== */
@media (max-width: 768px) {
  .app {
    padding: 20px 15px;
  }

  .app h1 {
    font-size: 1.8rem;
  }

  .navigate {
    gap: 10px;
    padding: 15px;
  }

  .nav-link {
    padding: 10px 20px;
    font-size: 0.95rem;
    flex: 1 1 auto;
    text-align: center;
  }

  .main-content {
    padding: 20px;
    min-height: 300px;
  }

  .content-text {
    font-size: 1rem;
    padding: 15px;
  }

  .content-icon {
    font-size: 3rem;
  }

  .content-hint {
    flex-direction: column;
    text-align: center;
    padding: 15px 20px;
  }
}

@media (max-width: 480px) {
  .app h1 {
    font-size: 1.5rem;
  }

  .nav-link {
    padding: 8px 16px;
    font-size: 0.85rem;
  }

  .main-content {
    padding: 15px;
    min-height: 250px;
  }

  .content-text {
    font-size: 0.9rem;
    padding: 12px;
  }
}

/* ========== 滚动条美化 ========== */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
