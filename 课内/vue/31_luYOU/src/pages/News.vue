<!-- 是个路由组件 -->
<template>
  <div class="news-list-simple">
    <h2>📰 新闻列表</h2>

    <div class="news-items">
      <div
        v-for="item in newsData"
        :key="item.id"
        class="news-item-simple"
        @click="handleClick(item)"
      >
        <span class="news-id">{{ item.id }}</span>
        <span class="news-title">{{ item.title }}</span>
        <span class="news-date">{{ item.date }}</span>
        <span class="news-arrow">›</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const newsData = ref([
  { id: "001", title: "新闻001：人工智能技术新突破", date: "2024-01-15" },
  { id: "002", title: "新闻002：全球经济复苏信号", date: "2024-01-14" },
  { id: "003", title: "新闻003：世界杯精彩回顾", date: "2024-01-13" },
  { id: "004", title: "新闻004：明星演唱会盛况", date: "2024-01-12" },
  { id: "005", title: "新闻005：教育改革新政策", date: "2024-01-11" },
  { id: "006", title: "新闻006：健康生活方式指南", date: "2024-01-10" },
  { id: "007", title: "新闻007：最美旅游目的地推荐", date: "2024-01-09" },
  { id: "008", title: "新闻008：新能源车市场分析", date: "2024-01-08" },
  { id: "009", title: "新闻009：5G技术应用场景", date: "2024-01-07" },
  { id: "010", title: "新闻010：数字货币新趋势", date: "2024-01-06" },
]);

const handleClick = (item: any) => {
  console.log("点击新闻:", item);
  // 跳转详情
};
</script>

<style scoped>
.news-list-simple {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.news-list-simple h2 {
  text-align: center;
  color: #1a1a2e;
  margin-bottom: 24px;
}

.news-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.news-item-simple {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  background: #f8fafc;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.news-item-simple:hover {
  background: #f1f5f9;
  border-left-color: #667eea;
  transform: translateX(4px);
}

.news-id {
  font-weight: 700;
  color: #667eea;
  font-family: "Courier New", monospace;
  font-size: 14px;
  min-width: 40px;
}

.news-title {
  flex: 1;
  color: #1a1a2e;
  font-weight: 500;
}

.news-date {
  color: #94a3b8;
  font-size: 13px;
}

.news-arrow {
  color: #d1d5db;
  font-size: 20px;
}

@media (max-width: 600px) {
  .news-item-simple {
    flex-wrap: wrap;
    gap: 8px;
  }

  .news-date {
    font-size: 12px;
  }
}
</style>
