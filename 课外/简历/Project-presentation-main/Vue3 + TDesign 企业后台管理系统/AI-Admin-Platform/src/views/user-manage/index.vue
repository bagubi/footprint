<!-- views/user-manage/index.vue -->
<template>
  <div class="page-container">
    <t-table
      :data="userList"
      :columns="columns"
      :pagination="pagination"
      row-key="id"
      @page-change="onPageChange"
    >
      <template #role="{ row }">
        <t-tag>{{ row.roleName }}</t-tag>
      </template>
      <template #status="{ row }">
        <t-tag :theme="row.status === 1 ? 'success' : 'default'">
          {{ row.status === 1 ? "启用" : "禁用" }}
        </t-tag>
      </template>
      <template #operation="{ row }">
        <t-space>
          <t-button variant="text" @click="openEdit(row)">编辑</t-button>
          <t-popconfirm content="确认删除？" @confirm="handleDelete(row.id)">
            <t-button variant="text" theme="danger">删除</t-button>
          </t-popconfirm>
        </t-space>
      </template>
    </t-table>

    <t-dialog
      v-model:visible="dialogVisible"
      :header="editingId ? '编辑用户' : '新增用户'"
      @confirm="handleSubmit"
    >
      <t-form ref="formRef" :data="formData" :rules="rules">
        <t-form-item label="用户名" name="username">
          <t-input v-model="formData.username" />
        </t-form-item>
        <t-form-item label="角色" name="roleId">
          <t-select v-model="formData.roleId" :options="roleOptions" />
        </t-form-item>
        <t-form-item label="状态" name="status">
          <t-switch v-model="formData.status" :custom-value="[1, 0]" />
        </t-form-item>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

// 表格列：role 和 status 用插槽渲染，colKey 仍要写，TDesign 靠它对应插槽名
const columns = [
  { colKey: "username", title: "用户名" },
  { colKey: "role", title: "角色" },
  { colKey: "status", title: "状态" },
  { colKey: "operation", title: "操作", width: 160 },
];

// 用户列表（mock）
const userList = ref([
  { id: 1, username: "admin", roleName: "超级管理员", roleId: 1, status: 1 },
  { id: 2, username: "operator01", roleName: "运营专员", roleId: 2, status: 1 },
  { id: 3, username: "intern01", roleName: "实习生", roleId: 3, status: 0 },
]);

// 分页
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: userList.value.length,
});

function onPageChange(pageInfo: { current: number; pageSize: number }) {
  pagination.current = pageInfo.current;
  pagination.pageSize = pageInfo.pageSize;
  // 实际应调用 api 重新拉数据
}

// 角色下拉选项（实际应从 role api 拿）
const roleOptions = [
  { label: "超级管理员", value: 1 },
  { label: "运营专员", value: 2 },
  { label: "实习生", value: 3 },
];

// 弹窗与表单
const dialogVisible = ref(false);
const editingId = ref<number | null>(null);
const formRef = ref();
const formData = reactive({
  username: "",
  roleId: undefined as number | undefined,
  status: 1,
});

const rules = {
  username: [{ required: true, message: "请输入用户名", type: "error" }],
  roleId: [{ required: true, message: "请选择角色", type: "error" }],
};

function openEdit(row: any) {
  editingId.value = row.id;
  formData.username = row.username;
  formData.roleId = row.roleId;
  formData.status = row.status;
  dialogVisible.value = true;
}

async function handleSubmit() {
  const valid = await formRef.value?.validate();
  if (valid !== true) return;
  console.log("提交", editingId.value, { ...formData });
  // 实际调用 api 新增/更新后刷新列表
  dialogVisible.value = false;
}

function handleDelete(id: number) {
  userList.value = userList.value.filter((u) => u.id !== id);
  pagination.total = userList.value.length;
  // 实际调用 api 删除
}
</script>
