<template>
  <div>
    <!-- 指标卡片 -->
    <t-row :gutter="16" class="stat-row">
      <t-col :span="3" v-for="card in statCards" :key="card.label">
        <t-card :bordered="false">
          <div class="stat-label">{{ card.label }}</div>
          <div class="stat-value">{{ card.value }}</div>
          <div class="stat-trend" :class="card.trend >= 0 ? 'up' : 'down'">
            {{ card.trend >= 0 ? "↑" : "↓" }} {{ Math.abs(card.trend) }}%
          </div>
        </t-card>
      </t-col>
    </t-row>

    <!-- 图表区 -->
    <t-row :gutter="13" class="chart-row">
      <t-col :span="12" class="stat-row"><OrderTrendChart /></t-col>
      <t-col :span="6" class="stat-row"><CategoryPieChart /></t-col>
      <t-col :span="6" class="stat-row"><RefundRateChart /></t-col>
      <t-col :span="12"><AovChart /></t-col>
    </t-row>

    <!-- AI 区 -->
    <t-row :gutter="13" class="ai-row">
      <t-col :span="12" class="stat-row">
        <t-card title="AI 经营周报" :bordered="false">
          <template #actions>
            <t-button
              theme="primary"
              :loading="aiLoading"
              @click="generateReport"
              >生成周报</t-button
            >
          </template>
          <t-textarea
            v-model="reportText"
            :autosize="{ minRows: 6, maxRows: 14 }"
            placeholder="点击右上角生成周报"
          />
          <div class="ai-actions">
            <t-button variant="outline" size="small" @click="copyReport"
              >复制</t-button
            >
            <t-button variant="outline" size="small" @click="exportReport"
              >导出</t-button
            >
          </div>
        </t-card>
      </t-col>

      <t-col :span="12">
        <t-card title="AI 异常归因问答" :bordered="false">
          <div class="qa-history">
            <div
              v-for="item in aiStore.qaHistory"
              :key="item.id"
              class="qa-item"
            >
              <div class="qa-q">Q：{{ item.question }}</div>
              <div class="qa-a">{{ item.answer }}</div>
              <div class="qa-time">{{ item.time }}</div>
            </div>
            <t-empty
              v-if="!aiStore.qaHistory.length"
              description="暂无问答记录"
            />
          </div>
          <div class="qa-input">
            <t-input
              v-model="question"
              placeholder="例如：上周四订单为什么下降？"
              @enter="askQuestion"
            />
            <t-button theme="primary" :loading="aiLoading" @click="askQuestion"
              >提问</t-button
            >
          </div>
        </t-card>
      </t-col>
    </t-row>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { MessagePlugin } from "tdesign-vue-next";
import OrderTrendChart from "./components/OrderTrendChart.vue";
import CategoryPieChart from "./components/CategoryPieChart.vue";
import RefundRateChart from "./components/RefundRateChart.vue";
import AovChart from "./components/AovChart.vue";
import { useAI } from "@/composables/useAI";
import { useAiStore } from "@/stores/ai";
import {
  getOrderTrendApi,
  getCategoryApi,
  getRefundRateApi,
  type OrderTrendItem,
  type CategoryItem,
  type RefundItem,
} from "@/api/dashboard";

const aiStore = useAiStore();
const { loading: aiLoading, call } = useAI();

// 主页面保留一份取数，给 AI 上下文用
const orderTrend = ref<OrderTrendItem[]>([]);
const categories = ref<CategoryItem[]>([]);
const refunds = ref<RefundItem[]>([]);

const question = ref("");
const reportText = computed({
  get: () => aiStore.weeklyReport,
  set: (v: string) => aiStore.setWeeklyReport(v),
});

const statCards = computed(() => {
  const totalOrders = orderTrend.value.reduce((s, i) => s + i.orderCount, 0);
  const totalAmount = orderTrend.value.reduce((s, i) => s + i.amount, 0);
  const lastRefund = refunds.value.at(-1)?.refundRate ?? 0;
  return [
    { label: "订单总数", value: totalOrders, trend: 8.2 },
    { label: "销售额（元）", value: totalAmount.toLocaleString(), trend: 6.5 },
    { label: "退款率（%）", value: lastRefund, trend: -1.2 },
    {
      label: "客单价（元）",
      value: totalOrders ? Math.round(totalAmount / totalOrders) : 0,
      trend: 3.1,
    },
  ];
});

async function loadData() {
  const [o, c, r] = await Promise.all([
    getOrderTrendApi("7d"),
    getCategoryApi(),
    getRefundRateApi(),
  ]);
  orderTrend.value = o;
  categories.value = c;
  refunds.value = r;
}

async function generateReport() {
  const context = {
    orderTrend: orderTrend.value,
    categories: categories.value,
    refunds: refunds.value,
  };
  try {
    const text = await call(
      "请根据以下数据生成一份经营周报：" + JSON.stringify(context),
      context,
    );
    aiStore.setWeeklyReport(text);
    MessagePlugin.success("周报生成成功");
  } catch {
    MessagePlugin.error("周报生成失败");
  }
}

async function askQuestion() {
  const q = question.value.trim();
  if (!q) return;
  const context = {
    question: q,
    orderTrend: orderTrend.value,
    categories: categories.value,
    refunds: refunds.value,
  };
  try {
    const answer = await call("请对以下问题做归因分析：" + q, context);
    aiStore.addQa({ question: q, answer });
    question.value = "";
  } catch {
    MessagePlugin.error("AI 回答失败");
  }
}

function copyReport() {
  navigator.clipboard.writeText(reportText.value);
  MessagePlugin.success("已复制");
}

function exportReport() {
  const blob = new Blob([reportText.value], { type: "text/markdown" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "经营周报.md";
  a.click();
  URL.revokeObjectURL(a.href);
}

onMounted(loadData);
</script>

<style scoped>
.stat-row,
.chart-row,
.ai-row {
  margin-bottom: 16px;
}
.stat-label {
  color: #666;
  font-size: 13px;
}
.stat-value {
  font-size: 24px;
  font-weight: 600;
  margin: 8px 0;
}
.stat-trend.up {
  color: #2ba471;
}
.stat-trend.down {
  color: #d54941;
}
.ai-actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}
.qa-history {
  max-height: 240px;
  overflow-y: auto;
  margin-bottom: 12px;
}
.qa-item {
  padding: 8px 0;
  border-bottom: 1px dashed #eee;
}
.qa-q {
  font-weight: 500;
}
.qa-a {
  color: #333;
  white-space: pre-wrap;
  margin: 4px 0;
}
.qa-time {
  color: #999;
  font-size: 12px;
}
.qa-input {
  display: flex;
  gap: 8px;
}
</style>
