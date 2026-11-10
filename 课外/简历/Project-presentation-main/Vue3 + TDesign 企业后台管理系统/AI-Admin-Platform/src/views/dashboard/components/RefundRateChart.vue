<!-- src/views/dashboard/components/RefundRateChart.vue -->
<template>
  <t-card title="退款率趋势" :bordered="false">
    <ChartWrapper :option="option" />
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import ChartWrapper from "@/components/ChartWrapper.vue";
import { buildRefundOption } from "@/composables/useChart";
import { getRefundRateApi, type RefundItem } from "@/api/dashboard";

const data = ref<RefundItem[]>([]);
const option = computed(() => buildRefundOption(data.value));

onMounted(async () => {
  data.value = await getRefundRateApi();
});
</script>
