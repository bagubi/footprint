<!-- ECharts 通用封装 -->
<!-- src/components/ChartWrapper.vue -->
<template>
  <div ref="chartRef" class="chart-wrapper" :style="{ height }"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps<{
  option: echarts.EChartsOption;
  height?: string;
}>();

const chartRef = ref<HTMLDivElement>();
let chart: echarts.ECharts | null = null;

function render() {
  if (!chartRef.value) return;
  if (!chart) chart = echarts.init(chartRef.value);
  chart.setOption(props.option, { notMerge: true });
}

function resize() {
  chart?.resize();
}

onMounted(() => {
  render();
  window.addEventListener("resize", resize);
});

watch(() => props.option, render, { deep: true });

onBeforeUnmount(() => {
  window.removeEventListener("resize", resize);
  chart?.dispose();
  chart = null;
});
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 320px;
}
</style>
