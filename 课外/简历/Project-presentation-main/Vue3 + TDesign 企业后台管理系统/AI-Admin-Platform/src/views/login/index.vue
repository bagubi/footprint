<!-- src/views/login/index.vue -->
<template>
  <div class="login-page">
    <div class="login-card">
      <h2 class="title">AI 运营后台</h2>
      <p class="subtitle">电商运营智能工作台</p>

      <t-form
        ref="formRef"
        :data="formData"
        :rules="rules"
        label-width="0"
        @submit="handleLogin"
      >
        <t-form-item name="username">
          <t-input
            v-model="formData.username"
            size="large"
            placeholder="用户名（admin / operator）"
            clearable
          >
            <template #prefix-icon><t-icon name="user" /></template>
          </t-input>
        </t-form-item>

        <t-form-item name="password">
          <t-input
            v-model="formData.password"
            type="password"
            size="large"
            placeholder="密码（任意）"
            clearable
          >
            <template #prefix-icon><t-icon name="lock-on" /></template>
          </t-input>
        </t-form-item>

        <t-form-item>
          <t-button
            theme="primary"
            size="large"
            block
            type="submit"
            :loading="loading"
          >
            登 录
          </t-button>
        </t-form-item>
      </t-form>

      <div class="tip">
        演示账号：<b>admin</b>（全部菜单） / <b>operator</b>（仅看板）
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { MessagePlugin } from "tdesign-vue-next";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const formRef = ref();
const loading = ref(false);

const formData = reactive({
  username: "admin",
  password: "123456",
});

const rules = {
  username: [{ required: true, message: "请输入用户名", type: "error" }],
  password: [{ required: true, message: "请输入密码", type: "error" }],
};

async function handleLogin() {
  const valid = await formRef.value?.validate();
  if (valid !== true) return;

  loading.value = true;
  try {
    // 1. 登录，拿 token + 用户信息
    await userStore.login({
      username: formData.username,
      password: formData.password,
    });

    // 2. 登录成功提示
    MessagePlugin.success("登录成功");

    // 3. 跳转：优先回原地址（被守卫拦截时带的 redirect），否则去首页
    const redirect = (route.query.redirect as string) || "/";
    await router.replace(redirect);
  } catch (e: any) {
    MessagePlugin.error(e?.message || "登录失败");
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e8f0ff 0%, #f5f7fa 100%);
}

.login-card {
  width: 380px;
  padding: 40px 32px 28px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.title {
  margin: 0;
  text-align: center;
  font-size: 22px;
  color: #0052d9;
}

.subtitle {
  margin: 8px 0 28px;
  text-align: center;
  font-size: 13px;
  color: #999;
}

.tip {
  margin-top: 16px;
  font-size: 12px;
  color: #999;
  text-align: center;
}

.tip b {
  color: #0052d9;
}
</style>
