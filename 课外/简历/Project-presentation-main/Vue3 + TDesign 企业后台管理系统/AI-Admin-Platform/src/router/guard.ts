// router/guard.ts
import router from "./index";
import { useUserStore } from "@/stores/user";
import { usePermissionStore } from "@/stores/permission";

const WHITE_LIST = ["/login"];

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();

  console.log("[guard] 导航到", to.path, "token:", !!userStore.token);

  // ① 无 token
  if (!userStore.token) {
    if (WHITE_LIST.includes(to.path)) return true;
    return `/login?redirect=${encodeURIComponent(to.fullPath)}`;
  }

  // ② 有 token，访问登录页 → 回首页
  if (to.path === "/login") return "/";

  // ③ 有 token，动态路由未加载
  if (!permissionStore.isRoutesLoaded) {
    try {
      if (!userStore.userInfo) await userStore.fetchUserInfo();

      const routes = await permissionStore.buildRoutes();
      routes.forEach((route) => {
        router.addRoute("Layout", route);
      });

      // 动态路由加完后，再兜底 404
      router.addRoute({
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/error/404.vue"),
      });

      return { ...to, replace: true };

      console.log(
        "[guard] 注入后路由表:",
        router.getRoutes().map((r) => r.path),
      );
      router.getRoutes().forEach((r) => {
        console.log(
          "[route]",
          r.path,
          "->",
          r.components?.default?.toString().slice(0, 80),
        );
      });
      // 返回值形式：重新导航到当前目标
      return { ...to, replace: true };
    } catch (e) {
      console.error("[guard] 加载动态路由失败", e);
      userStore.logout();
      permissionStore.reset();
      return `/login?redirect=${encodeURIComponent(to.fullPath)}`;
    }
  }

  // ④ 放行
  return true;
});

export default router;
