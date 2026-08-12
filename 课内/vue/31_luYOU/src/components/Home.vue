<template>
  <div class="home-container">
    <!-- ====== 顶部轮播/横幅 ====== -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">欢迎来到我们的网站</h1>
        <p class="hero-subtitle">这里是首页，展示网站的核心内容和功能</p>
        <div class="hero-buttons">
          <button class="btn-primary" @click="handleGetStarted">
            开始探索
          </button>
          <button class="btn-secondary" @click="handleLearnMore">
            了解更多
          </button>
        </div>
      </div>
    </section>

    <!-- ====== 功能特点 ====== -->
    <section class="features-section">
      <h2 class="section-title">✨ 核心功能</h2>
      <div class="features-grid">
        <div
          class="feature-card"
          v-for="feature in features"
          :key="feature.title"
          @click="handleFeatureClick(feature)"
        >
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- ====== 数据统计 ====== -->
    <section class="stats-section">
      <div class="stats-grid">
        <div class="stat-item" v-for="stat in stats" :key="stat.label">
          <div class="stat-number" :data-count="stat.value">
            {{ stat.value }}
          </div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- ====== 最新动态 ====== -->
    <section class="news-section">
      <div class="section-header">
        <h2 class="section-title">📰 最新动态</h2>
        <router-link to="/news" class="view-all">查看全部 →</router-link>
      </div>
      <div class="news-list">
        <div
          class="news-item"
          v-for="news in latestNews"
          :key="news.id"
          @click="handleNewsClick(news)"
        >
          <span class="news-tag">{{ news.tag }}</span>
          <span class="news-title">{{ news.title }}</span>
          <span class="news-date">{{ news.date }}</span>
        </div>
      </div>
    </section>

    <!-- ====== 快速入口 ====== -->
    <section class="quick-links">
      <h2 class="section-title">🚀 快速入口</h2>
      <div class="links-grid">
        <router-link
          v-for="link in quickLinks"
          :key="link.path"
          :to="link.path"
          class="link-card"
        >
          <span class="link-icon">{{ link.icon }}</span>
          <span class="link-label">{{ link.label }}</span>
        </router-link>
      </div>
    </section>

    <!-- ====== 底部信息 ====== -->
    <footer class="home-footer">
      <p>&copy; 2024 我的网站. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// ========== 功能特点 ==========
const features = ref([
  {
    icon: "⚡",
    title: "快速高效",
    description: "采用最新技术栈，提供极速的页面加载体验",
  },
  {
    icon: "🔒",
    title: "安全可靠",
    description: "严格的数据加密和隐私保护，让您无后顾之忧",
  },
  {
    icon: "🎨",
    title: "精美设计",
    description: "精心打磨的界面设计，带给您极致视觉享受",
  },
  {
    icon: "📱",
    title: "跨端适配",
    description: "完美适配PC、平板、手机等各类设备",
  },
]);

// ========== 统计数据 ==========
const stats = ref([
  { label: "用户总数", value: "10,000+" },
  { label: "服务项目", value: "200+" },
  { label: "好评率", value: "98%" },
  { label: "覆盖城市", value: "50+" },
]);

// ========== 最新动态 ==========
const latestNews = ref([
  { id: 1, title: "网站全新改版上线", tag: "公告", date: "2024-01-15" },
  { id: 2, title: "用户突破10000人", tag: "喜报", date: "2024-01-12" },
  { id: 3, title: "新版功能即将发布", tag: "预告", date: "2024-01-10" },
  { id: 4, title: "系统维护通知", tag: "通知", date: "2024-01-08" },
]);

// ========== 快速入口 ==========
const quickLinks = ref([
  { icon: "📖", label: "关于我们", path: "/about" },
  { icon: "📰", label: "新闻中心", path: "/news" },
  { icon: "💼", label: "产品服务", path: "/services" },
  { icon: "📞", label: "联系我们", path: "/contact" },
]);

// ========== 方法 ==========
const handleGetStarted = () => {
  router.push("/about");
};

const handleLearnMore = () => {
  console.log("了解更多");
};

const handleFeatureClick = (feature: any) => {
  console.log("点击功能:", feature);
};

const handleNewsClick = (news: any) => {
  console.log("点击新闻:", news);
  // router.push(`/news/${news.id}`)
};

// ========== 生命周期 ==========
onMounted(() => {
  console.log("Home 组件已挂载");
  // 可以在这里获取首页数据
});
</script>

<style scoped>
/* ========== 容器 ========== */
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* ========== 通用标题 ========== */
.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 24px;
  text-align: center;
}

.section-title::after {
  content: "";
  display: block;
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  margin: 8px auto 0;
  border-radius: 2px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.view-all {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.view-all:hover {
  color: #764ba2;
}

/* ========== 顶部横幅 ========== */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 60px 40px;
  text-align: center;
  color: white;
  margin-bottom: 50px;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -20%;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
}

.hero-section::after {
  content: "";
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 44px;
  font-weight: 700;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 30px;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 12px 32px;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* ========== 功能特点 ========== */
.features-section {
  margin-bottom: 50px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}

.feature-card {
  background: white;
  padding: 28px 20px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f2f5;
  transition: all 0.3s ease;
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
  border-color: #667eea;
}

.feature-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.feature-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 8px 0;
}

.feature-desc {
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

/* ========== 统计数据 ========== */
.stats-section {
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border-radius: 16px;
  padding: 40px 20px;
  margin-bottom: 50px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: #667eea;
}

.stat-label {
  font-size: 14px;
  color: #64748b;
  margin-top: 4px;
}

/* ========== 最新动态 ========== */
.news-section {
  margin-bottom: 50px;
}

.news-list {
  background: white;
  border-radius: 16px;
  border: 1px solid #f0f2f5;
  overflow: hidden;
}

.news-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f2f5;
  cursor: pointer;
  transition: background 0.2s;
}

.news-item:last-child {
  border-bottom: none;
}

.news-item:hover {
  background: #f8fafc;
}

.news-tag {
  padding: 2px 12px;
  background: #667eea;
  color: white;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.news-title {
  flex: 1;
  color: #1a1a2e;
  font-weight: 500;
}

.news-date {
  color: #94a3b8;
  font-size: 13px;
  white-space: nowrap;
}

/* ========== 快速入口 ========== */
.quick-links {
  margin-bottom: 40px;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.link-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 24px 16px;
  background: white;
  border-radius: 12px;
  text-decoration: none;
  border: 1px solid #f0f2f5;
  transition: all 0.3s ease;
  color: #1a1a2e;
}

.link-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.15);
  border-color: #667eea;
}

.link-icon {
  font-size: 28px;
}

.link-label {
  font-size: 14px;
  font-weight: 500;
}

/* ========== 底部 ========== */
.home-footer {
  text-align: center;
  padding: 24px 0;
  color: #94a3b8;
  font-size: 14px;
  border-top: 1px solid #f0f2f5;
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .hero-title {
    font-size: 30px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .hero-section {
    padding: 40px 20px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-number {
    font-size: 28px;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .news-item {
    flex-wrap: wrap;
    padding: 12px 16px;
  }

  .news-title {
    width: 100%;
    order: 2;
  }

  .section-title {
    font-size: 22px;
  }

  .links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 24px;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    max-width: 280px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .stat-number {
    font-size: 24px;
  }

  .links-grid {
    grid-template-columns: 1fr 1fr;
  }

  .section-header {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
}
</style>
