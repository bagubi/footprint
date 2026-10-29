<!-- views/role-manage/index.vue -->
<template>
  <div class="page-container">
    <t-table :data="roleList" :columns="columns" row-key="id">
      <template #operation="{ row }">
        <t-space>
          <t-button variant="text" @click="openPermission(row)"
            >配置权限</t-button
          >
          <t-button variant="text" @click="openEdit(row)">编辑</t-button>
        </t-space>
      </template>
    </t-table>

    <t-dialog
      v-model:visible="permVisible"
      header="配置权限"
      @confirm="savePermission"
    >
      <t-tree
        v-model="checkedPermissions"
        :data="permissionTree"
        checkable
        value-mode="all"
        :keys="{ value: 'code', label: 'name' }"
      />
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 表格列定义
const columns = [
  { colKey: "roleName", title: "角色名称" },
  { colKey: "description", title: "描述" },
  { colKey: "operation", title: "操作", width: 200 },
];

// mock 角色列表
const roleList = ref([
  { id: 1, roleName: "超级管理员", description: "拥有全部权限" },
  { id: 2, roleName: "运营专员", description: "数据看板与商品管理" },
  { id: 3, roleName: "实习生", description: "只读权限" },
]);

// 权限树（mock）
const permissionTree = ref([
  {
    code: "dashboard",
    name: "数据看板",
    children: [{ code: "dashboard:view", name: "查看看板" }],
  },
  {
    code: "user",
    name: "用户管理",
    children: [
      { code: "user:list", name: "查看列表" },
      { code: "user:add", name: "新增用户" },
      { code: "user:delete", name: "删除用户" },
    ],
  },
  {
    code: "role",
    name: "角色管理",
    children: [
      { code: "role:list", name: "查看列表" },
      { code: "role:assign", name: "配置权限" },
    ],
  },
]);

// 弹窗状态
const permVisible = ref(false);
const checkedPermissions = ref<string[]>([]);
const currentRole = ref<any>(null);

// 打开配置权限弹窗
function openPermission(row: any) {
  currentRole.value = row;
  // 实际应从后端拿该角色已有权限，这里 mock 空数组
  checkedPermissions.value = [];
  permVisible.value = true;
}

// 保存权限
function savePermission() {
  console.log(
    "角色",
    currentRole.value?.roleName,
    "权限",
    checkedPermissions.value,
  );
  // 实际应调用 api 保存
  permVisible.value = false;
}

// 编辑（占位）
function openEdit(row: any) {
  console.log("编辑角色", row);
}
</script>
