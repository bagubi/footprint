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
    const menus = await getMenuApi();
    menuTree.value = menus;
    dynamicRoutes.value = formatAsyncRoutes(menus);
    isRoutesLoaded.value = true;
    return dynamicRoutes.value;
  }

  function reset() {
    dynamicRoutes.value = [];
    menuTree.value = [];
    isRoutesLoaded.value = false;
  }

  return { dynamicRoutes, menuTree, isRoutesLoaded, buildRoutes, reset };
});
