<!-- src/layout/index.vue -->
<template>
  <t-layout class="app-layout">
    <!-- 侧边栏 -->
    <t-aside :width="collapsed ? '64px' : '232px'" class="app-aside">
      <SideMenu :collapsed="collapsed" />
    </t-aside>

    <t-layout>
      <!-- 顶栏 -->
      <t-header class="app-header">
        <HeaderBar :collapsed="collapsed" @toggle="collapsed = !collapsed" />
      </t-header>

      <!-- 内容区 -->
      <t-content class="app-content">
        <router-view />
      </t-content>
    </t-layout>
  </t-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SideMenu from "./SideMenu.vue";
import HeaderBar from "./HeaderBar.vue";

const collapsed = ref(false);
</script>

<style scoped>
.app-layout {
  height: 100vh;
}

.app-aside {
  transition: width 0.2s;
  border-right: 1px solid #e7e7e7;
  background: #fff;
  overflow: hidden;
}

.app-header {
  height: 56px;
  padding: 0 16px;
  background: #fff;
  border-bottom: 1px solid #e7e7e7;
  display: flex;
  align-items: center;
}

.app-content {
  padding: 16px;
  background: #f5f6f7;
  overflow-y: auto;
}
</style>
