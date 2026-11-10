<template>
  <div class="page-container">
    <t-table
      :data="productList"
      :columns="columns"
      row-key="id"
      :selected-row-keys="selectedKeys"
      @select-change="onSelectChange"
    >
      <template #description="{ row }">
        <span v-if="row.description">{{ row.description }}</span>
        <span v-else class="placeholder">未生成</span>
      </template>
      <template #tags="{ row }">
        <t-space v-if="row.tags.length">
          <t-tag v-for="t in row.tags" :key="t" size="small">{{ t }}</t-tag>
        </t-space>
        <span v-else class="placeholder">—</span>
      </template>
    </t-table>

    <div class="batch-bar">
      <t-button
        theme="primary"
        :loading="aiLoading"
        :disabled="!selectedKeys.length"
        @click="batchGenerate"
      >
        AI 批量生成描述（已选 {{ selectedKeys.length }} 条）
      </t-button>
      <t-button variant="outline" @click="saveAll">保存</t-button>
      <span class="hint">单次最多 20 条，超出请分批</span>
    </div>

    <t-dialog
      v-model:visible="rawVisible"
      header="AI 返回内容（解析失败，请手动处理）"
      @confirm="rawVisible = false"
    >
      <t-textarea v-model="rawText" :autosize="{ minRows: 6, maxRows: 14 }" />
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { MessagePlugin } from "tdesign-vue-next";
import { useAI, type BatchDescItem } from "@/composables/useAI";
import {
  getProductListApi,
  updateProductApi,
  type ProductItem,
} from "@/api/product";

const { loading: aiLoading, callJSON } = useAI();

const productList = ref<ProductItem[]>([]);
const selectedKeys = ref<number[]>([]);
const rawVisible = ref(false);
const rawText = ref("");

const columns = [
  { colKey: "row-select", type: "multiple", width: 64 },
  { colKey: "name", title: "商品名称" },
  { colKey: "category", title: "分类" },
  { colKey: "description", title: "描述" },
  { colKey: "tags", title: "标签" },
];

function onSelectChange(keys: (string | number)[]) {
  selectedKeys.value = keys as number[];
}

async function batchGenerate() {
  if (selectedKeys.value.length > 20) {
    MessagePlugin.warning("单次最多 20 条，请分批");
    return;
  }
  const targets = productList.value.filter((p) =>
    selectedKeys.value.includes(p.id),
  );
  const names = targets.map((p) => p.name);
  const context = { names };
  const prompt =
    "请为以下商品批量生成描述，返回 JSON 数组，每项包含 description(string)、sellingPoints(string[])、tags(string[])：" +
    JSON.stringify(names);

  try {
    const { data, raw } = await callJSON<BatchDescItem[]>(prompt, context);
    if (!data || !Array.isArray(data)) {
      // 降级：展示原文让用户手动处理
      rawText.value = raw;
      rawVisible.value = true;
      MessagePlugin.warning("AI 返回无法解析为 JSON，已展示原文");
      return;
    }
    // 回填
    targets.forEach((p, i) => {
      const item = data[i];
      if (!item) return;
      p.description = item.description ?? "";
      p.sellingPoints = item.sellingPoints ?? [];
      p.tags = item.tags ?? [];
    });
    MessagePlugin.success(`已回填 ${targets.length} 条`);
  } catch {
    MessagePlugin.error("AI 生成失败");
  }
}

async function saveAll() {
  await updateProductApi(productList.value);
  MessagePlugin.success("已保存");
}

onMounted(async () => {
  productList.value = await getProductListApi();
});
</script>

<style scoped>
.page-container {
  padding: 16px;
}
.batch-bar {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.hint {
  color: #999;
  font-size: 12px;
}
.placeholder {
  color: #bbb;
}
</style>
