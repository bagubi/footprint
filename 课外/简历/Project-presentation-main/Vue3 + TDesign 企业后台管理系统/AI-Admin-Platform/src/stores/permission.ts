// stores/permission.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { getMenuApi } from "@/api/auth";
import { formatAsyncRoutes } from "@/router/dynamic";

export const usePermissionStore = defineStore("permission", () => {
  const dynamicRoutes = ref<RouteRecordRaw[]>([]);
  const menuTree = ref<any[]>([]);
  const isRoutesLoaded = ref(false);

  async function buildRoutes() {
    console.log("[buildRoutes] 开始");
    const menus = await getMenuApi();
    console.log("[buildRoutes] menus =", menus);
    menuTree.value = menus;
    dynamicRoutes.value = formatAsyncRoutes(menus);
    console.log("[buildRoutes] dynamicRoutes =", dynamicRoutes.value);
    isRoutesLoaded.value = true;
    console.log("[buildRoutes] 完成");
    return dynamicRoutes.value;
  }

  function reset() {
    dynamicRoutes.value = [];
    menuTree.value = [];
    isRoutesLoaded.value = false;
  }

  return { dynamicRoutes, menuTree, isRoutesLoaded, buildRoutes, reset };
});
