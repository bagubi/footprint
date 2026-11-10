// src/api/product.ts（mock 商品列表）
export interface ProductItem {
  id: number;
  name: string;
  category: string;
  description: string;
  sellingPoints: string[];
  tags: string[];
}

const MOCK: ProductItem[] = [
  {
    id: 1,
    name: "轻薄防晒衣",
    category: "女装",
    description: "",
    sellingPoints: [],
    tags: [],
  },
  {
    id: 2,
    name: "无线蓝牙耳机",
    category: "数码",
    description: "",
    sellingPoints: [],
    tags: [],
  },
  {
    id: 3,
    name: "坚果礼盒",
    category: "食品",
    description: "",
    sellingPoints: [],
    tags: [],
  },
  {
    id: 4,
    name: "折叠收纳箱",
    category: "家居",
    description: "",
    sellingPoints: [],
    tags: [],
  },
  {
    id: 5,
    name: "运动速干T恤",
    category: "女装",
    description: "",
    sellingPoints: [],
    tags: [],
  },
];

export function getProductListApi() {
  return Promise.resolve(MOCK.map((i) => ({ ...i })));
}

export function updateProductApi(list: ProductItem[]) {
  // mock：直接返回成功，真实场景走 PUT
  return Promise.resolve(list);
}
