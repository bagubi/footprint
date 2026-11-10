<!-- src/views/dashboard/components/AovChart.vue -->
<template>
  <t-card title="客单价趋势" :bordered="false">
    <ChartWrapper :option="option" />
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import ChartWrapper from "@/components/ChartWrapper.vue";
import { buildAovOption } from "@/composables/useChart";
import { getOrderTrendApi, type OrderTrendItem } from "@/api/dashboard";

const data = ref<OrderTrendItem[]>([]);
const option = computed(() => buildAovOption(data.value));

onMounted(async () => {
  data.value = await getOrderTrendApi("7d");
});
</script>
