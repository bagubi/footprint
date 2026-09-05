<template>
  <view class="todo-list">
    <!-- 加载状态 -->
    <view v-if="loading" class="todo-loading">
      <text class="loading-text">📋 加载中...</text>
    </view>

    <!-- 空状态 -->
    <view v-else-if="!list || list.length === 0" class="todo-empty">
      <text class="empty-text">暂无待办，添加一条吧 ✨</text>
    </view>

    <!-- 待办列表 -->
    <view v-else class="todo-items">
      <view 
        class="todo-item" 
        v-for="item in list" 
        :key="item._id || item.id"
        :class="{ 'completed': item.status === 'completed' }"
      >
        <!-- 复选框 -->
        <view class="todo-checkbox" @click="handleToggle(item)">
          <text class="checkbox-icon">
            {{ item.status === 'completed' ? '✅' : '⬜' }}
          </text>
        </view>

        <!-- 内容 -->
        <view class="todo-content">
          <text class="todo-title">{{ item.title }}</text>
          <view class="todo-meta">
            <text class="todo-time" v-if="item.time">
              🕐 {{ formatTime(item.time) }}
            </text>
            <view class="priority-tag" :class="'priority-' + (item.priority || 'normal')">
              {{ priorityMap[item.priority || 'normal'] }}
            </view>
          </view>
        </view>

        <!-- 删除按钮 -->
        <view class="todo-delete" @click="handleDelete(item)">
          <text class="delete-icon">🗑️</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    // 待办列表
    list: {
      type: Array,
      default: () => []
    },
    // 加载状态
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      priorityMap: {
        high: '🔴 高',
        normal: '🟡 中',
        low: '🟢 低'
      }
    };
  },
  methods: {
    // 切换状态
    handleToggle(item) {
      this.$emit('toggle', item._id || item.id);
    },

    // 删除待办
    handleDelete(item) {
      this.$emit('delete', item._id || item.id);
    },

    // 格式化时间
    formatTime(dateStr) {
      if (!dateStr) return '未设置时间';
      try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        const pad = (n) => String(n).padStart(2, '0');
        return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
      } catch {
        return dateStr;
      }
    }
  }
};
</script>

<style scoped>
.todo-list {
  background: #ffffff;
  border-radius: 24rpx;
  padding: 8rpx 0;
  box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.04);
}

/* ===== 加载状态 ===== */
.todo-loading {
  padding: 60rpx 0;
  text-align: center;
}

.loading-text {
  font-size: 28rpx;
  color: #b0b8c4;
}

/* ===== 空状态 ===== */
.todo-empty {
  padding: 60rpx 0;
  text-align: center;
}

.empty-text {
  font-size: 28rpx;
  color: #b0b8c4;
}

/* ===== 待办列表 ===== */
.todo-items {
  padding: 0 20rpx;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 24rpx 16rpx;
  border-bottom: 1rpx solid #f5f6f8;
  transition: all 0.3s ease;
}

.todo-item:active {
  background: #f8f9fc;
}

.todo-item:last-child {
  border-bottom: none;
}

/* 已完成 */
.todo-item.completed .todo-title {
  text-decoration: line-through;
  color: #b0b8c4;
}

/* ===== 复选框 ===== */
.todo-checkbox {
  flex-shrink: 0;
  margin-right: 20rpx;
}

.checkbox-icon {
  font-size: 36rpx;
}

/* ===== 内容 ===== */
.todo-content {
  flex: 1;
  min-width: 0;
}

.todo-title {
  font-size: 30rpx;
  color: #1a2a3a;
  font-weight: 500;
  display: block;
  word-break: break-all;
}

.todo-meta {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-top: 8rpx;
  flex-wrap: wrap;
}

.todo-time {
  font-size: 22rpx;
  color: #8899aa;
}

.priority-tag {
  font-size: 20rpx;
  padding: 2rpx 16rpx;
  border-radius: 16rpx;
}

.priority-high {
  background: #fff0f0;
  color: #e74c3c;
}

.priority-normal {
  background: #fff8e8;
  color: #f39c12;
}

.priority-low {
  background: #f0f7f0;
  color: #27ae60;
}

/* ===== 删除按钮 ===== */
.todo-delete {
  flex-shrink: 0;
  margin-left: 16rpx;
  padding: 8rpx 12rpx;
}

.delete-icon {
  font-size: 32rpx;
}
</style>