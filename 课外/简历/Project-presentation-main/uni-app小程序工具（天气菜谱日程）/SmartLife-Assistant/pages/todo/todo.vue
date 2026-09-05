<template>
  <view class="container">
    <!-- 顶部标题 -->
    <view class="header">
      <text class="title">📋 待办管理</text>
      <text class="subtitle">用自然语言创建待办</text>
    </view>

    <!-- AI 输入区 -->
    <view class="input-area">
      <view class="input-wrapper">
        <textarea
          v-model="inputText"
          class="ai-input"
          placeholder="例如：明天下午3点开会讨论项目"
          placeholder-class="input-placeholder"
          auto-height
          maxlength="200"
          :disabled="parsing"
        />
        <view class="input-actions">
          <text class="char-count">{{ inputText.length }}/200</text>
          <button 
            class="send-btn" 
            :class="{ 'send-btn-active': inputText.trim() }"
            @click="handleParse"
            :disabled="!inputText.trim() || parsing"
          >
            {{ parsing ? '解析中...' : '✨ 智能创建' }}
          </button>
        </view>
      </view>
    </view>

    <!-- 解析结果预览 -->
    <view class="preview-area" v-if="parsedResult">
      <view class="preview-title">📝 解析结果</view>
      <view class="preview-content">
        <view class="preview-item">
          <text class="preview-label">事件</text>
          <text class="preview-value">{{ parsedResult.title }}</text>
        </view>
        <view class="preview-item">
          <text class="preview-label">时间</text>
          <text class="preview-value">{{ formatTime(parsedResult.time) }}</text>
        </view>
        <view class="preview-item">
          <text class="preview-label">优先级</text>
          <view class="priority-tag" :class="'priority-' + parsedResult.priority">
            {{ priorityMap[parsedResult.priority] }}
          </view>
        </view>
      </view>
      <view class="preview-actions">
        <button class="preview-cancel" @click="clearPreview">取消</button>
        <button class="preview-confirm" @click="confirmTodo">确认添加</button>
      </view>
    </view>

    <!-- 待办列表 -->
    <view class="todo-section">
      <view class="todo-header">
        <text class="todo-title">📌 待办列表</text>
        <text class="todo-count">{{ todoList.length }} 项</text>
      </view>

      <todo-list 
        :list="todoList" 
        :loading="todoLoading"
        @toggle="handleToggleTodo"
        @delete="handleDeleteTodo"
      />

      <!-- 空状态 -->
      <view class="empty-state" v-if="!todoList.length && !todoLoading">
        <text class="empty-icon">🎉</text>
        <text class="empty-text">暂无待办，用 AI 创建一个吧！</text>
      </view>
    </view>
  </view>
</template>

<script>
import { createTodoByAI, getTodoList, toggleTodoStatus, deleteTodo } from '@/api/todo.js';
import TodoList from '@/components/todo-list/todo-list.vue';

export default {
  components: {
    TodoList
  },
  data() {
    return {
      inputText: '',
      parsing: false,
      parsedResult: null,
      todoList: [],
      todoLoading: false,
      priorityMap: {
        high: '🔴 高',
        normal: '🟡 中',
        low: '🟢 低'
      }
    };
  },
  onLoad() {
    this.fetchTodoList();
  },
  onShow() {
    // 每次显示页面刷新列表
    this.fetchTodoList();
  },
  methods: {
    // AI 解析自然语言
    async handleParse() {
      if (!this.inputText.trim()) return;

      this.parsing = true;
      uni.showLoading({ title: 'AI 解析中...', mask: true });

      try {
        const res = await createTodoByAI(this.inputText);
        this.parsedResult = res;
        uni.showToast({ title: '解析成功！', icon: 'success' });
      } catch (err) {
        console.error('解析失败', err);
        uni.showToast({ title: err || '解析失败，请重新输入', icon: 'none' });
      } finally {
        this.parsing = false;
        uni.hideLoading();
      }
    },

    // 确认添加待办
    async confirmTodo() {
      if (!this.parsedResult) return;

      uni.showLoading({ title: '添加中...', mask: true });
      try {
        // 保存到数据库
        await this.saveTodo(this.parsedResult);
        await this.fetchTodoList();
        this.clearPreview();
        this.inputText = '';
        uni.showToast({ title: '添加成功 🎉', icon: 'success' });
      } catch (err) {
        uni.showToast({ title: '添加失败，请重试', icon: 'none' });
      } finally {
        uni.hideLoading();
      }
    },

    // 保存待办（实际调用云函数保存到数据库）
    async saveTodo(todo) {
      // 这里调用云函数保存到数据库
      // 实际项目中会通过 uniCloud.database().collection('todo').add(todo)
      console.log('保存待办:', todo);
      
      // 模拟保存（实际使用 uniCloud 数据库）
      return new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    },

    // 获取待办列表
    async fetchTodoList() {
      this.todoLoading = true;
      try {
        // 实际调用云函数获取数据
        // const res = await getTodoList();
        // this.todoList = res;
        
        // 模拟数据（实际使用 uniCloud 数据库）
        this.todoList = [];
      } catch (err) {
        console.error('获取待办失败', err);
      } finally {
        this.todoLoading = false;
      }
    },

    // 切换待办状态
    async handleToggleTodo(id) {
      try {
        await toggleTodoStatus(id);
        await this.fetchTodoList();
      } catch (err) {
        uni.showToast({ title: '操作失败', icon: 'none' });
      }
    },

    // 删除待办
    async handleDeleteTodo(id) {
      uni.showModal({
        title: '确认删除',
        content: '确定要删除这条待办吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              await deleteTodo(id);
              await this.fetchTodoList();
              uni.showToast({ title: '已删除', icon: 'success' });
            } catch (err) {
              uni.showToast({ title: '删除失败', icon: 'none' });
            }
          }
        }
      });
    },

    // 清空预览
    clearPreview() {
      this.parsedResult = null;
    },

    // 格式化时间
    formatTime(dateStr) {
      if (!dateStr) return '未设置';
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      const pad = (n) => String(n).padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    }
  }
};
</script>