// router/index.ts
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },
  {
    path: "/",
    name: "Layout",
    component: () => import("@/layout/index.vue"),
    redirect: "/dashboard",
    children: [
      // {                           // ← 清空，业务路由动态加
      //   path: "dashboard",
      //   name: "Dashboard",
      //   component: () => import("@/views/dashboard/index.vue"),
      //   meta: { title: "数据看板", icon: "dashboard" },
      // },
      // {
      //   path: "user-manage",
      //   name: "UserManage",
      //   component: () => import("@/views/user-manage/index.vue"),
      //   meta: { title: "用户管理", icon: "user" },
      // },
      // {
      //   path: "role-manage",
      //   name: "RoleManage",
      //   component: () => import("@/views/role-manage/index.vue"),
      //   meta: { title: "角色管理", icon: "setting" },
      // },
    ],
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "NotFound",
  //   component: () => import("@/views/error/404.vue"),
  //   meta: { hidden: true },
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

export default router;
