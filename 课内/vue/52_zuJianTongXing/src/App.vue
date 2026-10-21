<template>
  <div class="app">
    <h1>Vue3 组件间通信</h1>

    <!-- 导航区 -->
    <nav class="navigate">
      <RouterLink to="/props" class="nav-link" active-class="active"
        >1. props 父传子</RouterLink
      >
      <RouterLink to="/emit" class="nav-link" active-class="active"
        >2. emit 子传父</RouterLink
      >
      <RouterLink to="/mitt" class="nav-link" active-class="active"
        >3. mitt 任意组件</RouterLink
      >
      <RouterLink to="/v-model" class="nav-link" active-class="active"
        >4. v-model 双向</RouterLink
      >
      <RouterLink to="/attrs" class="nav-link" active-class="active"
        >5. attrs 透传</RouterLink
      >
      <RouterLink to="/ref" class="nav-link" active-class="active"
        >6. ref 父取子& $parent子取父
      </RouterLink>
      <RouterLink to="/provide" class="nav-link" active-class="active"
        >7. provide/inject</RouterLink
      >
      <RouterLink to="/pinia" class="nav-link" active-class="active"
        >8. pinia 全局状态</RouterLink
      >
      <RouterLink to="/slot" class="nav-link" active-class="active"
        >9. slot 插槽</RouterLink
      >
    </nav>

    <!-- 展示区 -->
    <div class="main-content">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

h1 {
  text-align: center;
  color: #fff;
  margin-bottom: 24px;
  font-size: 28px;
}

/* 导航区 */
.navigate {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  margin-bottom: 24px;
}

.nav-link {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  text-decoration: none;
  border-radius: 50px;
  font-size: 14px;
  transition: all 0.3s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: translateY(-2px);
}

.nav-link.active {
  background: #fff;
  color: #667eea;
  font-weight: 600;
}

/* 展示区 */
.main-content {
  background: #fff;
  border-radius: 16px;
  padding: 30px;
  min-height: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
</style>
