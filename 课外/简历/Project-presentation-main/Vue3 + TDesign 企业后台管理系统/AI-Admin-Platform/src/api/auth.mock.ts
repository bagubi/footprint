// api/auth.mock.ts 思路
const MENU_BY_ROLE = {
  admin: [
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
  ],
  operator: [
    {
      path: "dashboard",
      name: "Dashboard",
      component: "dashboard/index",
      meta: { title: "数据看板", icon: "dashboard" },
    },
  ],
};

export function getMenuApi() {
  const role = localStorage.getItem("mock_role") || "admin";
  return Promise.resolve(MENU_BY_ROLE[role]);
}
