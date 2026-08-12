<template>
  <div class="about-container">
    <!-- 顶部横幅 -->
    <div class="about-hero">
      <div class="hero-content">
        <h1>关于我们</h1>
        <p>了解更多关于我们的故事</p>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="about-main">
      <!-- 公司简介 -->
      <section class="about-section">
        <h2>🏢 公司简介</h2>
        <div class="section-content">
          <p>
            我们是一家致力于{{ companyInfo.industry }}的创新型企业， 成立于{{
              companyInfo.established
            }}年。 多年来，我们始终坚持以{{ companyInfo.coreValue }}为核心，
            为客户提供优质的产品和服务。
          </p>
          <p>
            我们的团队由一群充满激情和创造力的专业人士组成，
            拥有丰富的行业经验和深厚的技术积累。
          </p>
        </div>
      </section>

      <!-- 核心数据 -->
      <section class="stats-section">
        <div class="stats-grid">
          <div class="stat-item" v-for="stat in stats" :key="stat.label">
            <div class="stat-number">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </section>

      <!-- 团队介绍 -->
      <section class="about-section">
        <h2>👥 核心团队</h2>
        <div class="team-grid">
          <div
            class="team-card"
            v-for="member in teamMembers"
            :key="member.name"
          >
            <div class="team-avatar">{{ member.avatar }}</div>
            <h3 class="team-name">{{ member.name }}</h3>
            <p class="team-role">{{ member.role }}</p>
            <p class="team-desc">{{ member.description }}</p>
          </div>
        </div>
      </section>

      <!-- 发展历程 -->
      <section class="about-section">
        <h2>📅 发展历程</h2>
        <div class="timeline">
          <div class="timeline-item" v-for="item in timeline" :key="item.year">
            <div class="timeline-year">{{ item.year }}</div>
            <div class="timeline-content">
              <h4>{{ item.title }}</h4>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 联系我们 -->
      <section class="about-section contact-section">
        <h2>📞 联系我们</h2>
        <div class="contact-grid">
          <div
            class="contact-item"
            v-for="contact in contacts"
            :key="contact.label"
          >
            <span class="contact-icon">{{ contact.icon }}</span>
            <div>
              <div class="contact-label">{{ contact.label }}</div>
              <div class="contact-value">{{ contact.value }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// ========== 公司信息 ==========
const companyInfo = {
  name: "示例科技",
  industry: "互联网科技",
  established: 2020,
  coreValue: "创新、品质、服务",
};

// ========== 统计数据 ==========
const stats = ref([
  { label: "成立年份", value: "2020" },
  { label: "服务客户", value: "500+" },
  { label: "项目案例", value: "200+" },
  { label: "团队规模", value: "50+" },
]);

// ========== 团队成员 ==========
const teamMembers = ref([
  {
    name: "张三",
    role: "创始人 & CEO",
    avatar: "👨‍💼",
    description: "10年互联网行业经验，曾任职于知名科技公司",
  },
  {
    name: "李四",
    role: "技术总监",
    avatar: "👨‍💻",
    description: "全栈技术专家，擅长系统架构与团队管理",
  },
  {
    name: "王五",
    role: "产品经理",
    avatar: "👩‍💼",
    description: "深度理解用户需求，打造极致产品体验",
  },
  {
    name: "赵六",
    role: "市场总监",
    avatar: "👨‍🎓",
    description: "丰富的市场推广经验，助力品牌成长",
  },
]);

// ========== 发展历程 ==========
const timeline = ref([
  {
    year: "2020",
    title: "公司成立",
    description: "正式注册成立，入驻创业孵化器",
  },
  {
    year: "2021",
    title: "首轮融资",
    description: "获得天使轮投资，团队扩展至20人",
  },
  {
    year: "2022",
    title: "产品发布",
    description: "核心产品正式上线，获得首批用户",
  },
  {
    year: "2023",
    title: "业务拓展",
    description: "业务覆盖全国，服务客户超过500家",
  },
  {
    year: "2024",
    title: "持续发展",
    description: "不断创新发展，开启新征程",
  },
]);

// ========== 联系方式 ==========
const contacts = ref([
  { icon: "📍", label: "地址", value: "北京市朝阳区科技园区A座" },
  { icon: "📧", label: "邮箱", value: "contact@example.com" },
  { icon: "📞", label: "电话", value: "010-8888-8888" },
  { icon: "🕐", label: "工作时间", value: "周一至周五 9:00-18:00" },
]);
</script>

<style scoped>
/* ========== 容器 ========== */
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* ========== 顶部横幅 ========== */
.about-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 40px;
  border-radius: 16px;
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
}

.about-hero::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -20%;
  width: 500px;
  height: 500px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
}

.about-hero::after {
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

.hero-content h1 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 12px;
}

.hero-content p {
  font-size: 20px;
  opacity: 0.9;
}

/* ========== 主要内容 ========== */
.about-main {
  padding: 0 20px 40px;
}

.about-section {
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f2f5;
}

.about-section h2 {
  font-size: 24px;
  color: #1a1a2e;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 3px solid #667eea;
  display: inline-block;
}

.section-content p {
  font-size: 16px;
  line-height: 1.8;
  color: #475569;
  margin-bottom: 12px;
}

/* ========== 统计数据 ========== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  transition: transform 0.3s;
}

.stat-item:hover {
  transform: translateY(-4px);
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: #667eea;
}

.stat-label {
  font-size: 14px;
  color: #64748b;
  margin-top: 4px;
}

/* ========== 团队 ========== */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 16px;
}

.team-card {
  text-align: center;
  padding: 24px 16px;
  background: #f8fafc;
  border-radius: 12px;
  transition: all 0.3s;
}

.team-card:hover {
  background: #f1f5f9;
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.team-avatar {
  font-size: 48px;
  margin-bottom: 12px;
}

.team-name {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 4px 0;
}

.team-role {
  font-size: 14px;
  color: #667eea;
  font-weight: 500;
  margin: 0 0 8px 0;
}

.team-desc {
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
}

/* ========== 时间线 ========== */
.timeline {
  position: relative;
  padding-left: 30px;
  border-left: 3px solid #667eea;
}

.timeline-item {
  position: relative;
  margin-bottom: 24px;
  padding-left: 20px;
}

.timeline-item::before {
  content: "";
  position: absolute;
  left: -34px;
  top: 4px;
  width: 12px;
  height: 12px;
  background: #667eea;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 0 3px #667eea;
}

.timeline-year {
  font-size: 18px;
  font-weight: 700;
  color: #667eea;
}

.timeline-content h4 {
  font-size: 16px;
  color: #1a1a2e;
  margin: 4px 0;
}

.timeline-content p {
  font-size: 14px;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
}

/* ========== 联系我们 ========== */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 10px;
}

.contact-icon {
  font-size: 24px;
}

.contact-label {
  font-size: 13px;
  color: #94a3b8;
}

.contact-value {
  font-size: 15px;
  color: #1a1a2e;
  font-weight: 500;
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .about-hero {
    padding: 40px 20px;
  }

  .hero-content h1 {
    font-size: 30px;
  }

  .hero-content p {
    font-size: 16px;
  }

  .about-section {
    padding: 20px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .about-hero {
    padding: 30px 16px;
  }

  .hero-content h1 {
    font-size: 24px;
  }

  .about-section {
    padding: 16px;
  }

  .about-section h2 {
    font-size: 20px;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .stat-number {
    font-size: 24px;
  }

  .timeline {
    padding-left: 20px;
  }

  .timeline-item {
    padding-left: 12px;
  }
}
</style>
