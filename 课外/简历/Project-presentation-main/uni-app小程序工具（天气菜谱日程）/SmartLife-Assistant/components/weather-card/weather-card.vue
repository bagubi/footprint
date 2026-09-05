<template>
  <view class="weather-card" :class="{ 'loading': loading }">
    <!-- 加载状态 -->
    <view v-if="loading" class="weather-loading">
      <text class="loading-icon">⏳</text>
      <text class="loading-text">天气加载中...</text>
    </view>

    <!-- 正常显示 -->
    <view v-else class="weather-content">
      <!-- 温度 -->
      <view class="weather-temp-section">
        <text class="weather-temp">{{ temperature }}°</text>
        <text class="weather-condition">{{ condition }}</text>
      </view>

      <!-- 详细信息 -->
      <view class="weather-details">
        <view class="detail-item">
          <text class="detail-icon">💧</text>
          <text class="detail-label">湿度</text>
          <text class="detail-value">{{ humidity }}%</text>
        </view>
        <view class="detail-divider"></view>
        <view class="detail-item">
          <text class="detail-icon">🌬️</text>
          <text class="detail-label">风向</text>
          <text class="detail-value">{{ windDir }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'WeatherCard',
  props: {
    // 温度
    temperature: {
      type: [Number, String],
      default: 0
    },
    // 天气状况
    condition: {
      type: String,
      default: '--'
    },
    // 湿度
    humidity: {
      type: [Number, String],
      default: '--'
    },
    // 风向
    windDir: {
      type: String,
      default: '--'
    },
    // 加载状态
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.weather-card {
  background: linear-gradient(135deg, #4A90D9, #357ABD);
  border-radius: 32rpx;
  padding: 40rpx 36rpx;
  box-shadow: 0 8rpx 40rpx rgba(74, 144, 217, 0.35);
  min-height: 200rpx;
  transition: all 0.3s ease;
}

.weather-card.loading {
  opacity: 0.6;
}

/* ===== 加载状态 ===== */
.weather-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 160rpx;
}

.loading-icon {
  font-size: 48rpx;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 16rpx;
}

/* ===== 温度区域 ===== */
.weather-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weather-temp-section {
  display: flex;
  flex-direction: column;
}

.weather-temp {
  font-size: 80rpx;
  font-weight: 700;
  color: #ffffff;
  line-height: 1;
}

.weather-condition {
  font-size: 30rpx;
  color: rgba(255, 255, 255, 0.85);
  margin-top: 12rpx;
}

/* ===== 详细信息 ===== */
.weather-details {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20rpx;
  padding: 16rpx 24rpx;
  backdrop-filter: blur(10rpx);
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-icon {
  font-size: 28rpx;
}

.detail-label {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 4rpx;
}

.detail-value {
  font-size: 24rpx;
  color: #ffffff;
  font-weight: 500;
  margin-top: 2rpx;
}

.detail-divider {
  width: 2rpx;
  height: 40rpx;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 20rpx;
}
</style>