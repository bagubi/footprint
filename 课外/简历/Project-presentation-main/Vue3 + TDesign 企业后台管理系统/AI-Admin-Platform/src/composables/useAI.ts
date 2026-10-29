// src/composables/useAI.ts---AI 调用封装
import { ref } from "vue";

/**
 * 统一 AI 调用封装。
 * 开发阶段可用 mock，接入真实大模型时替换 request 即可。
 */
export function useAI() {
  const loading = ref(false);
  const error = ref("");

  async function call(prompt: string, context: unknown): Promise<string> {
    loading.value = true;
    error.value = "";
    try {
      // ===== mock 实现：根据 prompt 关键字返回假数据 =====
      await new Promise((r) => setTimeout(r, 800));
      return mockResponse(prompt, context);
      // ===== 真实接入示例 =====
      // const res = await fetch('/api/ai/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ prompt, context }),
      // })
      // const data = await res.json()
      // return data.content
    } catch (e: any) {
      error.value = e?.message || "AI 调用失败";
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return { loading, error, call };
}

function mockResponse(prompt: string, context: any): string {
  if (prompt.includes("周报")) {
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

  if (prompt.includes("为什么") || prompt.includes("归因")) {
    const q = context?.question || "该问题";
    return `针对「${q}」的分析：
1. 主要下降来自数码类目（-23%），其中 SKU-1234 退款率从 2% 升至 8%；
2. 女装类目基本持平，食品类目小幅上升；
3. 可能原因：数码类目某批次商品质量波动，叠加详情页描述与实物不符，导致退款集中。
建议优先排查 SKU-1234 的近期评价与退款原因分布。`;
  }

  return "（mock）AI 返回内容：" + prompt.slice(0, 50);
}
