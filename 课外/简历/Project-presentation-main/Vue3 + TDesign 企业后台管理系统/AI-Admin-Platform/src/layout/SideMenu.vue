<!-- src/layout/SideMenu.vue---侧边栏菜单 -->
<template>
  <div class="side-menu">
    <!-- Logo 区 -->
    <div class="logo">
      <span v-if="!collapsed">AI 运营后台</span>
      <span v-else>AI</span>
    </div>

    <!-- 菜单 -->
    <t-menu
      v-model="activeMenu"
      :collapsed="collapsed"
      theme="light"
      @change="onMenuChange"
    >
      <template v-for="item in menuTree" :key="item.path">
        <!-- 有子菜单 -->
        <t-submenu
          v-if="item.children?.length"
          :value="item.path"
          :title="item.meta.title"
        >
          <t-menu-item
            v-for="child in item.children"
            :key="child.path"
            :value="resolvePath(item.path, child.path)"
          >
            {{ child.meta.title }}
          </t-menu-item>
        </t-submenu>

        <!-- 无子菜单 -->
        <t-menu-item v-else :value="resolvePath('', item.path)">
          {{ item.meta.title }}
        </t-menu-item>
      </template>
    </t-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePermissionStore } from "@/stores/permission";

defineProps<{ collapsed: boolean }>();

const route = useRoute();
const router = useRouter();
const permissionStore = usePermissionStore();

const menuTree = computed(() => permissionStore.menuTree);
const activeMenu = ref(route.path);

// 路由变化时同步高亮
watch(
  () => route.path,
  (path) => {
    activeMenu.value = path;
  },
  { immediate: true },
);

// 拼接完整路径：父路径 + 子路径
function resolvePath(parent: string, child: string) {
  if (!parent) return child.startsWith("/") ? child : `/${child}`;
  const p = parent.startsWith("/") ? parent : `/${parent}`;
  const c = child.startsWith("/") ? child.slice(1) : child;
  return `${p}/${c}`.replace(/\/+/g, "/");
}

// 点击菜单跳转
function onMenuChange(value: string | number) {
  const path = String(value);
  if (path !== route.path) router.push(path);
}
</script>

<style scoped>
.side-menu {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.logo {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  color: #0052d9;
  border-bottom: 1px solid #e7e7e7;
  flex-shrink: 0;
}

:deep(.t-menu) {
  flex: 1;
  overflow-y: auto;
}
</style>
