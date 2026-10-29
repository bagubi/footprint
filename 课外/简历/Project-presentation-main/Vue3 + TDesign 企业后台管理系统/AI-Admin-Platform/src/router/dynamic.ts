// router/dynamic.ts
import type { RouteRecordRaw } from "vue-router";

export interface AsyncRouteItem {
  path: string;
  name: string;
  component: string; // 相对 src/views 的路径，如 'dashboard/index'
  meta: {
    title: string;
    icon?: string;
    permission?: string;
  };
  children?: AsyncRouteItem[];
}

// 预扫描所有 views 下的 vue 文件
const modules = import.meta.glob("@/views/**/*.vue"); //检查

// 打印实际可用的 key
console.log("[dynamic] modules keys:", Object.keys(modules)); //检查

function mapComponent(component: string) {
  // 兼容 'dashboard/index' 和 'dashboard/index.vue' 两种写法
  const clean = component.replace(/\.vue$/, "");
  const key = `/src/views/${clean}.vue`;
  const loader = modules[key];
  if (!loader) {
    console.error(
      `[dynamic] 未找到组件: ${key}，请检查 getMenuApi 返回的 component 字段`,
    );
    return () => import("@/views/error/404.vue");
  }
  return loader;
}

export function formatAsyncRoutes(items: AsyncRouteItem[]): RouteRecordRaw[] {
  return items.map((item) => ({
    path: item.path,
    name: item.name,
    component: mapComponent(item.component),
    meta: item.meta,
    children: item.children ? formatAsyncRoutes(item.children) : undefined,
  }));
}
