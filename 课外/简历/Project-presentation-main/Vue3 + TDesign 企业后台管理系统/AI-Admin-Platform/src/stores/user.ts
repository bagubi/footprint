// stores/user.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { loginApi, getUserInfoApi } from "@/api/auth";

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(localStorage.getItem("token") || "");
  const userInfo = ref<{ name: string; roles: string[] } | null>(null);

  async function login(params: { username: string; password: string }) {
    const res = await loginApi(params);
    token.value = res.token;
    localStorage.setItem("token", res.token);
    localStorage.setItem("mock_role", res.user.roles[0] ?? "operator");
    userInfo.value = res.user;
  }

  async function fetchUserInfo() {
    const res = await getUserInfoApi();
    userInfo.value = res;
    return res;
  }

  function logout() {
    token.value = "";
    userInfo.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("mock_role"); // ← 改成 removeItem，不用 res
  }

  return { token, userInfo, login, fetchUserInfo, logout };
});
