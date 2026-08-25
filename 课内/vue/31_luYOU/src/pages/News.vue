<template>
  <div class="news-container">
    <div class="news-layout">
      <!-- 左侧：新闻列表 -->
      <div class="news-list-area">
        <h2>📰 新闻列表</h2>
        <div class="news-items">
          <RouterLink
            v-for="item in newsData"
            :key="item.id"
            class="news-item"
            :class="{ active: currentNewsId === item.id }"
            @click="handleClick(item)"
            :to="`/news/${item.id}?like=加尔可爱捏&game=洛克王国`"
            ><!-- 管跳转,生成可点击的链接 -->
            <!-- 37.query参数 -->
            <!-- 这里的?like=加尔可爱捏&game=洛克王国可以被handleClick覆盖，所以这里可以不写 -->
            <span class="news-id">{{ item.id }}</span>
            <span class="news-title">{{ item.title }}</span>
            <span class="news-date">{{ item.date }}</span>
            <span class="news-arrow">›</span>
          </RouterLink>
        </div>
      </div>

      <!-- 右侧：详情区域（路由出口） -->
      <div class="news-detail-area">
        <RouterView /><!-- 管显示，路由出口，占位 -->
        <!-- 测试老师写的 -->
        <Detail title="点击查看详情" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
// 这种use开头的，是hooks（钩子函数）的命名规范。
// useRouter()：拿到路由实例，用于跳转路由(路由器)
// useRoute()：拿到当前路由对象，用于获取路由参数（路由）
import Detail from "@/components/Detail.vue";

//创捷一个路由器对象（控制跳转）
const router = useRouter();
//获取当前路由对象（获取信息）
const route = useRoute();
//创建响应式数据
const currentNewsId = ref<string>("");

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

// 点击新闻跳转详情
const handleClick = (item: any) => {
  currentNewsId.value = item.id;
  // router.push(`/news/${item.id}`);
  //37.跳转时带上 query 参数
  router.push({
    path: `/news/${item.id}`,
    query: {
      like: "加尔可爱捏",
      game: "洛克王国",
    },
  });
};

// 监听路由变化，更新当前选中的新闻ID
watch(
  () => route.params.id, // ① 监听谁？
  (newId) => {
    // ② 变了之后做什么？
    // route.params.id 是当前路由中的新闻 ID
    // 例如 /news/001 => newId === '001'
    if (newId) {
      currentNewsId.value = newId as string;
    }
  },
  // immediate: true 表示组件初始化时立即执行一次，确保页面首次进入时也能同步选中状态
  { immediate: true }, // ③ 额外配置
);

// 组件挂载时，默认显示第一条新闻
onMounted(() => {
  // 如果当前没有选中任何新闻（即访问 /news 而不是 /news/001）
  // if (!route.params.id && newsData.value.length > 0) {
  const firstNews = newsData.value[0];
  if (firstNews) {
    currentNewsId.value = firstNews.id;
    // router.replace(`/news/${firstNews.id}`);
    //37.这里 这里也可以携带 query 参数，但是会被handleClick覆盖
    router.replace(`/news/${firstNews.id}?like=加尔可爱捏&game=洛克王国`);
  }
  // }
});
</script>

<style scoped>
.news-container {
  padding: 20px;
  width: 100%;
}

.news-layout {
  display: flex;
  gap: 24px;
  min-height: 500px;
}

/* ===== 左侧列表 ===== */
.news-list-area {
  flex: 0 0 55%;
  min-width: 0;
}

.news-list-area h2 {
  text-align: center;
  color: #1a1a2e;
  margin-bottom: 20px;
}

.news-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.news-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.news-item:hover {
  background: #f1f5f9;
  border-left-color: #667eea;
  transform: translateX(4px);
}

.news-item.active {
  background: #ede9fe;
  border-left-color: #667eea;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
}

.news-id {
  font-weight: 700;
  color: #667eea;
  font-family: "Courier New", monospace;
  font-size: 13px;
  min-width: 36px;
}

.news-title {
  flex: 1;
  color: #1a1a2e;
  font-weight: 500;
  font-size: 14px;
}

.news-date {
  color: #94a3b8;
  font-size: 12px;
  white-space: nowrap;
}

.news-arrow {
  color: #d1d5db;
  font-size: 18px;
}

/* ===== 右侧详情 ===== */
.news-detail-area {
  flex: 1;
  min-height: 400px;
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .news-layout {
    flex-direction: column;
  }

  .news-list-area {
    flex: 1;
  }

  .news-detail-area {
    min-height: 300px;
  }

  .news-item {
    padding: 10px 12px;
  }

  .news-title {
    font-size: 13px;
  }
}
</style>
