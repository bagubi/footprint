<template>
  <view class="container">
    <!-- 顶部城市选择 -->
    <view class="header">
      <view class="city-selector" @click="chooseCity">
        <text class="city-name">{{ city }}</text>
        <text class="city-arrow">▼</text>
      </view>
      <text class="update-time">更新于 {{ updateTime }}</text>
    </view>

    <!-- 天气卡片 -->
    <weather-card 
      :temperature="weather.temp" 
      :condition="weather.text"
      :humidity="weather.humidity"
      :windDir="weather.windDir"
      :loading="weatherLoading"
    />

    <!-- 菜谱推荐（根据温度智能推荐） -->
    <view class="section-title">
      <text class="title-icon">🍽️</text>
      <text class="title-text">今日推荐</text>
      <text class="title-tip">{{ recipeTip }}</text>
    </view>
    <recipe-list 
      :temperature="weather.temp"
      :recipes="recipes"
      :loading="weatherLoading"
    />

    <!-- 快捷入口 -->
    <view class="quick-actions">
      <navigator url="/pages/todo/todo" class="action-btn">
        <text class="action-icon">📝</text>
        <text class="action-text">待办管理</text>
      </navigator>
      <view class="action-btn" @click="refreshWeather">
        <text class="action-icon">🔄</text>
        <text class="action-text">刷新天气</text>
      </view>
    </view>
  </view>
</template>

<script>
import { getWeather } from '@/api/weather.js';
import { getCachedWeather, setCachedWeather } from '@/utils/storage.js';
import { getRecipesByTemp, getRecipeTip } from '@/utils/weather-helper.js';
import WeatherCard from '@/components/weather-card/weather-card.vue';
import RecipeList from '@/components/recipe-list/recipe-list.vue';

export default {
  components: {
    WeatherCard,
    RecipeList
  },
  data() {
    return {
      city: '北京',
      weather: {
        temp: 0,
        text: '--',
        humidity: '--',
        windDir: '--'
      },
      recipes: [],
      weatherLoading: false,
      updateTime: '--'
    };
  },
  computed: {
    recipeTip() {
      return getRecipeTip(this.weather.temp);
    }
  },
  onLoad() {
    this.fetchWeather();
  },
  onPullDownRefresh() {
    // 下拉刷新强制获取最新数据
    this.fetchWeather(true);
  },
  methods: {
    async fetchWeather(forceRefresh = false) {
      // 先读缓存（非强制刷新时）
      if (!forceRefresh) {
        const cached = getCachedWeather(this.city);
        if (cached) {
          // ✅ 差量更新：仅更新变化的字段，减少渲染
          this.weather = {
            ...this.weather,
            temp: cached.temp,
            text: cached.text,
            humidity: cached.humidity,
            windDir: cached.windDir
          };
          this.updateTime = cached.updateTime || '--';
          this.recipes = getRecipesByTemp(cached.temp);
          return;
        }
      }

      // 缓存未命中或强制刷新，调用云函数
      this.weatherLoading = true;
      uni.showLoading({ title: '获取天气中...', mask: true });

      try {
        const res = await getWeather(this.city);
        
        // 差量更新
        this.weather = {
          temp: res.temp,
          text: res.text,
          humidity: res.humidity,
          windDir: res.windDir
        };
        
        const now = new Date();
        this.updateTime = this.formatTime(now);
        
        // 根据温度推荐菜谱
        this.recipes = getRecipesByTemp(res.temp);
        
        // 写入缓存
        setCachedWeather(this.city, {
          ...this.weather,
          updateTime: this.updateTime
        });

        uni.showToast({ title: '获取成功', icon: 'success' });
      } catch (err) {
        console.error('获取天气失败', err);
        uni.showToast({ title: err || '获取失败，请稍后重试', icon: 'none' });
      } finally {
        this.weatherLoading = false;
        uni.hideLoading();
        uni.stopPullDownRefresh();
      }
    },

    // 选择城市
    chooseCity() {
      uni.showActionSheet({
        itemList: ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安'],
        success: (res) => {
          const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安'];
          this.city = cities[res.tapIndex];
          this.fetchWeather(true);
        }
      });
    },

    // 手动刷新
    refreshWeather() {
      this.fetchWeather(true);
    },

    // 格式化时间
    formatTime(date) {
      const pad = (n) => String(n).padStart(2, '0');
      return `${date.getHours()}:${pad(date.getMinutes())}`;
    }
  }
};
</script>