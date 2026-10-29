<!-- src/layout/HeaderBar.vue---顶栏 -->
<template>
  <div class="header-bar">
    <!-- 左侧：折叠按钮 -->
    <t-button variant="text" shape="square" @click="$emit('toggle')">
      <template #icon>
        <t-icon :name="collapsed ? 'menu-fold' : 'menu-unfold'" />
      </template>
    </t-button>

    <div class="spacer" />

    <!-- 右侧：用户信息 + 退出 -->
    <t-dropdown :options="dropdownOptions" @click="onDropdownClick">
      <div class="user-info">
        <t-avatar size="small">{{ avatarText }}</t-avatar>
        <span class="username">{{ userName }}</span>
        <t-icon name="chevron-down" size="16px" />
      </div>
    </t-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { MessagePlugin } from "tdesign-vue-next";
import { useUserStore } from "@/stores/user";
import { usePermissionStore } from "@/stores/permission";

defineProps<{ collapsed: boolean }>();
defineEmits<{ (e: "toggle"): void }>();

const router = useRouter();
const userStore = useUserStore();
const permissionStore = usePermissionStore();

const userName = computed(() => userStore.userInfo?.name || "未登录");
const avatarText = computed(() => userName.value.slice(0, 1).toUpperCase());

const dropdownOptions = [{ content: "退出登录", value: "logout" }];

function onDropdownClick(data: { value: string }) {
  if (data.value === "logout") {
    userStore.logout();
    permissionStore.reset();
    MessagePlugin.success("已退出登录");
    router.replace("/login");
  }
}
</script>

<style scoped>
.header-bar {
  width: 100%;
  display: flex;
  align-items: center;
}

.spacer {
  flex: 1;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}

.user-info:hover {
  background: #f5f6f7;
}

.username {
  font-size: 14px;
  color: #333;
}
</style>
