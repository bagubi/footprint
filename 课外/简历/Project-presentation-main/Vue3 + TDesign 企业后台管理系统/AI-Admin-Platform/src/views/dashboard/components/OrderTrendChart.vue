<!-- src/views/dashboard/components/OrderTrendChart.vue -->
<template>
  <t-card title="订单趋势" :bordered="false">
    <template #actions>
      <t-radio-group v-model="range" variant="default-filled" size="small">
        <t-radio-button value="7d">近 7 天</t-radio-button>
        <t-radio-button value="30d">近 30 天</t-radio-button>
      </t-radio-group>
    </template>
    <ChartWrapper :option="option" />
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import ChartWrapper from "@/components/ChartWrapper.vue";
import { buildOrderTrendOption } from "@/composables/useChart";
import { getOrderTrendApi, type OrderTrendItem } from "@/api/dashboard";

const range = ref<"7d" | "30d">("7d");
const data = ref<OrderTrendItem[]>([]);
const option = computed(() => buildOrderTrendOption(data.value));

async function load() {
  data.value = await getOrderTrendApi(range.value);
}

watch(range, load);
onMounted(load);
</script>
