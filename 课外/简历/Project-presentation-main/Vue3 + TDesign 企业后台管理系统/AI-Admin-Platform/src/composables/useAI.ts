// src/composables/useAI.ts
import { ref } from "vue";

export interface BatchDescItem {
  description: string;
  sellingPoints: string[];
  tags: string[];
}

export function useAI() {
  const loading = ref(false);
  const error = ref("");

  async function call(prompt: string, context: unknown): Promise<string> {
    loading.value = true;
    error.value = "";
    try {
      await new Promise((r) => setTimeout(r, 800));
      return mockResponse(prompt, context);
      // 真实接入示例：
      // const res = await fetch("/api/ai/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt, context }) });
      // const data = await res.json();
      // return data.content;
    } catch (e: any) {
      error.value = e?.message || "AI 调用失败";
      throw e;
    } finally {
      loading.value = false;
    }
  }

  /**
   * 批量描述专用：要求模型返回 JSON 数组，前端做 schema 校验。
   * 解析失败时降级为原始文本，调用方自己决定怎么展示。
   */
  async function callJSON<T>(
    prompt: string,
    context: unknown,
  ): Promise<{ data: T | null; raw: string }> {
    const raw = await call(prompt, context);
    try {
      // 兼容模型返回 ```json ... ``` 包裹的情况
      const cleaned = raw
        .replace(/^```json\s*/i, "")
        .replace(/```$/, "")
        .trim();
      const data = JSON.parse(cleaned) as T;
      return { data, raw };
    } catch {
      return { data: null, raw };
    }
  }

  return { loading, error, call, callJSON };
}

function mockResponse(prompt: string, context: any): string {
  // 归因优先判断，避免问题里带“周报”时串到周报模板
  if (prompt.includes("归因")) {
    const q = context?.question || "该问题";
    return `针对「${q}」的分析：
1. 主要下降来自数码类目（-23%），其中 SKU-1234 退款率从 2% 升至 8%；
2. 女装类目基本持平，食品类目小幅上升；
3. 可能原因：数码类目某批次商品质量波动，叠加详情页描述与实物不符，导致退款集中。
建议优先排查 SKU-1234 的近期评价与退款原因分布。`;
  }

  if (prompt.includes("经营周报")) {
    return `【整体表现】
本周订单量 1017 单，环比上升 8.2%；销售额 6.6 万元，环比上升 6.5%。

【异常点】
周四（10-26）退款率从 2.0% 升至 2.8%，10-27 进一步升至 8.1%，明显异常。

【归因推测】
退款率异常主要来自数码类目，疑似某批次商品质量问题或描述不符，建议排查 SKU-1234。

【下周建议】
1. 对数码类目退款订单做抽样回访；
2. 优化商品详情页描述，减少预期偏差；
3. 关注女装类目转化率，适当增加投放。`;
  }

  if (prompt.includes("批量生成")) {
    // 从 context 里取出这一批商品名，模拟每行一条
    const names: string[] = context?.names ?? [];
    const items: BatchDescItem[] = names.map((name) => ({
      description: `${name}，精选优质材料，做工细致，适合日常使用，到手即可体验。`,
      sellingPoints: [`${name}核心卖点一`, "高性价比", "售后无忧"],
      tags: [name.slice(0, 2), "热销", "新品"],
    }));
    return JSON.stringify(items);
  }

  return "（mock）AI 返回内容：" + prompt.slice(0, 50);
}
// 1.归因判断放在周报前面，避免用户问题里带“周报”两个字时串模板。
// 2.callJSON 做降级：模型返回不一定是干净 JSON，先剥掉 ```json 包裹再 parse；
