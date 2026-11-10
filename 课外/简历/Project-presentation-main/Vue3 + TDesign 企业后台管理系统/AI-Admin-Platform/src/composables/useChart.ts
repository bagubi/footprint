// src/composables/useChart.ts
import type { EChartsOption } from "echarts";
import type { OrderTrendItem, CategoryItem, RefundItem } from "@/api/dashboard";

/** 订单趋势：双 Y 轴折线 */
export function buildOrderTrendOption(data: OrderTrendItem[]): EChartsOption {
  return {
    tooltip: { trigger: "axis" },
    legend: { data: ["订单量", "销售额"], bottom: 0 },
    grid: { left: 48, right: 56, top: 40, bottom: 56 },
    xAxis: { type: "category", data: data.map((i) => i.date) },
    yAxis: [
      { type: "value", name: "订单量" },
      { type: "value", name: "销售额" },
    ],
    series: [
      {
        name: "订单量",
        type: "line",
        smooth: true,
        data: data.map((i) => i.orderCount),
      },
      {
        name: "销售额",
        type: "line",
        smooth: true,
        yAxisIndex: 1,
        data: data.map((i) => i.amount),
      },
    ],
  };
}

/** 分类销售占比：环形饼图 */
export function buildCategoryOption(data: CategoryItem[]): EChartsOption {
  return {
    tooltip: { trigger: "item" },
    legend: { bottom: 0 },
    series: [
      {
        type: "pie",
        radius: ["40%", "65%"],
        center: ["50%", "45%"],
        data: data.map((i) => ({ name: i.categoryName, value: i.amount })),
      },
    ],
  };
}

/** 退款率趋势：面积折线 */
export function buildRefundOption(data: RefundItem[]): EChartsOption {
  return {
    tooltip: { trigger: "axis" },
    grid: { left: 48, right: 24, top: 40, bottom: 32 },
    xAxis: { type: "category", data: data.map((i) => i.date) },
    yAxis: { type: "value", name: "退款率(%)" },
    series: [
      {
        type: "line",
        smooth: true,
        data: data.map((i) => i.refundRate),
        areaStyle: {},
      },
    ],
  };
}

/** 客单价趋势：柱状图 */
export function buildAovOption(data: OrderTrendItem[]): EChartsOption {
  return {
    tooltip: { trigger: "axis" },
    grid: { left: 48, right: 24, top: 40, bottom: 32 },
    xAxis: { type: "category", data: data.map((i) => i.date) },
    yAxis: { type: "value", name: "客单价(元)" },
    series: [
      {
        type: "bar",
        barWidth: "50%",
        data: data.map((i) =>
          i.orderCount ? Math.round(i.amount / i.orderCount) : 0,
        ),
      },
    ],
  };
}
