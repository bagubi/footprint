<template>
  <div class="news-detail">
    <div v-if="newsItem" class="detail-content">
      <!-- 返回按钮（可选） -->
      <!-- <button class="back-btn" @click="$router.back()">← 返回列表</button> -->

      <!-- 新闻详情 -->
      <div class="detail-card">
        <h2 class="detail-title">{{ newsItem.title }}</h2>

        <div class="detail-meta">
          <span class="detail-date">📅 {{ newsItem.date }}</span>
          <span class="detail-id">#{{ newsItem.id }}</span>
        </div>

        <!-- 图片 -->
        <div class="detail-image">
          <img :src="newsItem.image" :alt="newsItem.title" />
        </div>

        <!-- 文字描述 -->
        <div class="detail-text">
          <p class="description">{{ newsItem.description }}</p>
          <p class="content">{{ newsItem.content }}</p>
        </div>
      </div>
    </div>
    <div v-else class="empty-state">
      <div class="empty-icon">📰</div>
      <p>请从左侧选择一条新闻</p>
    </div>
    <div>
      <!-- 37.用toRefs解构router -->
      <p>喜欢：{{ query.like }}</p>
      <!-- 没用解构的 -->
      <p>游戏：{{ route.query.game }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
// useRoute():返回当前路由信息对象，包含 query、params、path 等
//37.接收参数
const route = useRoute();
console.log("当前路由对象：", route);
// 37.用toRefs解构router，就可以直接用<p>喜欢：{{ query.like }}</p>
import { toRefs } from "vue";
const { query } = toRefs(route);

// 新闻数据（和列表保持一致）
const newsData = [
  {
    id: "001",
    title: "新闻001：人工智能技术新突破",
    date: "2024-01-15",
    image: "https://picsum.photos/seed/ai/800/400",
    description: "人工智能技术在2024年取得重大突破，深度学习算法实现质的飞跃。",
    content:
      "近日，国际人工智能研究团队宣布在深度学习领域取得突破性进展。新算法在图像识别、自然语言处理等领域的准确率提升了30%以上，有望在医疗诊断、自动驾驶等领域实现广泛应用。",
  },
  {
    id: "002",
    title: "新闻002：全球经济复苏信号",
    date: "2024-01-14",
    image: "https://picsum.photos/seed/economy/800/400",
    description: "全球经济逐步复苏，多国经济数据表现亮眼。",
    content:
      "最新数据显示，全球主要经济体在2024年第一季度呈现强劲复苏态势。制造业PMI持续回升，就业市场改善，消费者信心指数创近年来新高。",
  },
  {
    id: "003",
    title: "新闻003：世界杯精彩回顾",
    date: "2024-01-13",
    image: "https://picsum.photos/seed/worldcup/800/400",
    description: "本届世界杯精彩纷呈，多场比赛创造历史新纪录。",
    content:
      "本届世界杯吸引了全球数十亿观众关注。多场经典对决令人难忘，新生代球星崭露头角，为足球运动注入新的活力。",
  },
  {
    id: "004",
    title: "新闻004：明星演唱会盛况",
    date: "2024-01-12",
    image: "https://picsum.photos/seed/concert/800/400",
    description: "知名歌手巡回演唱会引爆全城，粉丝热情高涨。",
    content:
      "在刚刚结束的巡回演唱会中，歌手为观众带来了精彩的视听盛宴。现场气氛热烈，数万名粉丝共同见证了这场音乐盛事。",
  },
  {
    id: "005",
    title: "新闻005：教育改革新政策",
    date: "2024-01-11",
    image: "https://picsum.photos/seed/education/800/400",
    description: "教育部门发布新政策，推动教育公平和质量提升。",
    content:
      "新政策强调教育资源均衡分配，加大农村教育投入，推动素质教育改革。同时鼓励创新教育模式，培养适应未来社会需求的人才。",
  },
  {
    id: "006",
    title: "新闻006：健康生活方式指南",
    date: "2024-01-10",
    image: "https://picsum.photos/seed/health/800/400",
    description: "专家建议：合理饮食、适量运动、充足睡眠是健康关键。",
    content:
      "在快节奏的现代生活中，保持健康的生活方式尤为重要。专家建议每周至少进行150分钟中等强度运动，保证7-8小时优质睡眠。",
  },
  {
    id: "007",
    title: "新闻007：最美旅游目的地推荐",
    date: "2024-01-09",
    image: "https://picsum.photos/seed/travel/800/400",
    description: "探索那些隐藏在山水之间的美丽村落。",
    content:
      "随着旅游业复苏，越来越多的人开始寻找独特的旅行体验。一些小众目的地因其原生态的自然风光和深厚的文化底蕴，成为旅游新热点。",
  },
  {
    id: "008",
    title: "新闻008：新能源车市场分析",
    date: "2024-01-08",
    image: "https://picsum.photos/seed/car/800/400",
    description: "随着技术成熟和成本下降，新能源车市场迎来爆发期。",
    content:
      "2024年新能源车市场继续保持高速增长。电池技术进步、充电设施完善、政策支持等多重因素推动下，市场渗透率持续攀升。",
  },
  {
    id: "009",
    title: "新闻009：5G技术应用场景",
    date: "2024-01-07",
    image: "https://picsum.photos/seed/5g/800/400",
    description: "5G技术正在深刻改变各行各业的运作模式。",
    content:
      "从智能制造到智慧医疗，从自动驾驶到远程教育，5G技术正在为各行各业带来革命性变革。预计到2025年，全球5G连接数将突破20亿。",
  },
  {
    id: "010",
    title: "新闻010：数字货币新趋势",
    date: "2024-01-06",
    image: "https://picsum.photos/seed/crypto/800/400",
    description: "数字货币正在重塑全球金融体系。",
    content:
      "随着区块链技术的成熟和监管框架的完善，数字货币正逐步走向主流。多国央行正在积极推进数字货币研发，跨境支付效率有望大幅提升。",
  },
];

// 根据路由参数获取当前新闻
const newsItem = computed(() => {
  const id = route.params.id as string;
  return newsData.find((item) => item.id === id);
});
</script>

<style scoped>
.news-detail {
  padding: 10px;
  min-height: 400px;
}

.detail-card {
  background: #ffffff;
  border-radius: 12px;
}

.detail-title {
  font-size: 24px;
  color: #1a1a2e;
  margin-bottom: 12px;
}

.detail-meta {
  display: flex;
  gap: 20px;
  color: #94a3b8;
  font-size: 14px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f2f5;
}

.detail-image {
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
}

.detail-image img {
  width: 100%;
  height: auto;
  max-height: 350px;
  object-fit: cover;
  display: block;
}

.detail-text {
  color: #475569;
  line-height: 1.8;
  font-size: 15px;
}

.detail-text .description {
  font-size: 16px;
  font-weight: 500;
  color: #334155;
  margin-bottom: 12px;
}

.detail-text .content {
  color: #64748b;
}

/* ===== 空状态 ===== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  color: #94a3b8;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .detail-title {
    font-size: 20px;
  }

  .detail-image img {
    max-height: 200px;
  }

  .detail-text {
    font-size: 14px;
  }
}
</style>
