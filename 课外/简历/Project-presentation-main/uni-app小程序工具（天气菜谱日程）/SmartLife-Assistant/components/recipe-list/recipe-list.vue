<template>
  <view class="recipe-list">
    <!-- 加载状态 -->
    <view v-if="loading" class="recipe-loading">
      <text class="loading-text">🍳 推荐加载中...</text>
    </view>

    <!-- 空状态 -->
    <view v-else-if="!recipes || recipes.length === 0" class="recipe-empty">
      <text class="empty-text">暂无推荐菜谱</text>
    </view>

    <!-- 菜谱列表 -->
    <view v-else class="recipe-grid">
      <view 
        class="recipe-item" 
        v-for="(item, index) in recipes" 
        :key="index"
        @click="handleRecipeClick(item)"
      >
        <view class="recipe-icon">{{ item.icon }}</view>
        <view class="recipe-info">
          <text class="recipe-name">{{ item.name }}</text>
          <text class="recipe-desc">{{ item.desc }}</text>
        </view>
        <text class="recipe-arrow">›</text>
      </view>
    </view>

    <!-- 温度提示 -->
    <view class="recipe-tip" v-if="!loading && temperature !== undefined && temperature !== ''">
      <text class="tip-text">🌡️ 当前温度 {{ temperature }}°C</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'RecipeList',
  props: {
    // 当前温度
    temperature: {
      type: [Number, String],
      default: 0
    },
    // 菜谱列表
    recipes: {
      type: Array,
      default: () => []
    },
    // 加载状态
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleRecipeClick(item) {
      uni.showToast({
        title: `推荐：${item.name}`,
        icon: 'none'
      });
    }
  }
};
</script>

<style scoped>
.recipe-list {
  background: #ffffff;
  border-radius: 24rpx;
  padding: 20rpx 0;
  box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.04);
}

/* ===== 加载状态 ===== */
.recipe-loading {
  padding: 40rpx 0;
  text-align: center;
}

.loading-text {
  font-size: 28rpx;
  color: #b0b8c4;
}

/* ===== 空状态 ===== */
.recipe-empty {
  padding: 40rpx 0;
  text-align: center;
}

.empty-text {
  font-size: 28rpx;
  color: #b0b8c4;
}

/* ===== 菜谱网格 ===== */
.recipe-grid {
  padding: 0 20rpx;
}

.recipe-item {
  display: flex;
  align-items: center;
  padding: 24rpx 16rpx;
  border-bottom: 1rpx solid #f5f6f8;
  transition: background 0.2s ease;
}

.recipe-item:active {
  background: #f8f9fc;
}

.recipe-item:last-child {
  border-bottom: none;
}

.recipe-icon {
  font-size: 44rpx;
  width: 72rpx;
  height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  border-radius: 16rpx;
  flex-shrink: 0;
}

.recipe-info {
  flex: 1;
  margin-left: 20rpx;
}

.recipe-name {
  font-size: 30rpx;
  font-weight: 600;
  color: #1a2a3a;
  display: block;
}

.recipe-desc {
  font-size: 24rpx;
  color: #8899aa;
  display: block;
  margin-top: 4rpx;
}

.recipe-arrow {
  font-size: 36rpx;
  color: #c0c8d4;
}

/* ===== 温度提示 ===== */
.recipe-tip {
  text-align: center;
  padding: 20rpx 0 8rpx;
  border-top: 1rpx solid #f5f6f8;
  margin: 0 20rpx;
}

.tip-text {
  font-size: 24rpx;
  color: #b0b8c4;
}
</style>