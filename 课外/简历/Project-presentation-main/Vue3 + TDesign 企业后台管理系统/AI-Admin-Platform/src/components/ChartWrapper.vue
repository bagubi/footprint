<!-- ECharts 通用封装 -->
<!-- src/components/ChartWrapper.vue -->
<!-- 统一处理 ECharts 实例的初始化、配置更新、容器尺寸监听与销毁 -->
<template>
  <div ref="chartRef" class="chart-wrapper" :style="{ height }"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

const props = defineProps<{
  option: EChartsOption;
  height?: string;
}>();

const chartRef = ref<HTMLDivElement>();
let chart: echarts.ECharts | null = null;
let observer: ResizeObserver | null = null;

function render() {
  if (!chartRef.value) return;
  if (!chart) chart = echarts.init(chartRef.value);
  chart.setOption(props.option, { notMerge: true });
}

onMounted(() => {
  render();
  // 监听容器自身尺寸变化，侧边栏折叠、布局调整都能触发
  if (chartRef.value) {
    observer = new ResizeObserver(() => {
      chart?.resize();
    });
    observer.observe(chartRef.value);
  }
});

// option 变化时数据驱动重绘
watch(() => props.option, render, { deep: true });

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
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
