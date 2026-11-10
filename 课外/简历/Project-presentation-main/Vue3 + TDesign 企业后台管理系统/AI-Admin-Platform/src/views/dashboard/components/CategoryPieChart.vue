<!-- src/views/dashboard/components/CategoryPieChart.vue -->
<template>
  <t-card title="分类销售占比" :bordered="false">
    <ChartWrapper :option="option" />
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import ChartWrapper from "@/components/ChartWrapper.vue";
import { buildCategoryOption } from "@/composables/useChart";
import { getCategoryApi, type CategoryItem } from "@/api/dashboard";

const data = ref<CategoryItem[]>([]);
const option = computed(() => buildCategoryOption(data.value));

onMounted(async () => {
  data.value = await getCategoryApi();
});
</script>
