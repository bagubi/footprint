// src/api/auth.ts
export function loginApi(params: { username: string; password: string }) {
  // mock 登录
  return Promise.resolve({
    token: "mock-token-" + Date.now(),
    user: {
      name: params.username,
      roles: [params.username === "admin" ? "admin" : "operator"],
    },
  });
}

export function getUserInfoApi() {
  return Promise.resolve({
    name: "admin",
    roles: ["admin"],
  });
}

// ↓ 补这个，permission.ts 要用的
export function getMenuApi() {
  const role = localStorage.getItem("mock_role") || "admin";

  const allMenus = [
    {
      path: "dashboard",
      name: "Dashboard",
      component: "dashboard/index",
      meta: { title: "数据看板", icon: "dashboard" },
    },
    {
      path: "user-manage",
      name: "UserManage",
      component: "user-manage/index",
      meta: { title: "用户管理", icon: "user" },
    },
    {
      path: "role-manage",
      name: "RoleManage",
      component: "role-manage/index",
      meta: { title: "角色管理", icon: "setting" },
    },
  ];

  if (role === "operator") {
    return Promise.resolve(allMenus.filter((m) => m.path === "dashboard"));
  }
  return Promise.resolve(allMenus);
}
