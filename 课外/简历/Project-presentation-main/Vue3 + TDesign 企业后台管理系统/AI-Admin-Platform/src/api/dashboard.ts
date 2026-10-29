// src/api/dashboard.ts
export interface OrderTrendItem {
  date: string;
  orderCount: number;
  amount: number;
}
export interface CategoryItem {
  categoryName: string;
  amount: number;
}
export interface RefundItem {
  date: string;
  refundRate: number;
}

const DAYS_7 = ["10-23", "10-24", "10-25", "10-26", "10-27", "10-28", "10-29"];

export function getOrderTrendApi(range: "7d" | "30d" = "7d") {
  const data: OrderTrendItem[] = DAYS_7.map((date, i) => ({
    date,
    orderCount: [120, 132, 101, 134, 90, 230, 210][i]!,
    amount: [8200, 9320, 7010, 9340, 6900, 15300, 14200][i]!,
  }));
  return Promise.resolve(data);
}

export function getCategoryApi() {
  const data: CategoryItem[] = [
    { categoryName: "女装", amount: 42000 },
    { categoryName: "数码", amount: 31000 },
    { categoryName: "食品", amount: 18000 },
    { categoryName: "家居", amount: 12000 },
  ];
  return Promise.resolve(data);
}

export function getRefundRateApi() {
  const data: RefundItem[] = DAYS_7.map((date, i) => ({
    date,
    refundRate: [2.1, 2.3, 2.0, 2.8, 8.1, 2.5, 2.2][i]!,
  }));
  return Promise.resolve(data);
}
