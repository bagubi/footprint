# AI-Admin-Platform

企业级智能后台管理系统 —— 基于 Vue 3 + TypeScript + TDesign + Pinia + ECharts

## 项目亮点

- 🤖 **AI 智能填充**：用户输入关键词，大模型自动生成完整表单数据，录入效率提升 90%
- 🔐 **动态权限控制**：基于角色（RBAC）动态生成菜单，路由守卫拦截未授权访问
- 📊 **数据可视化**：集成 ECharts，实现订单趋势图、分类统计等多维度数据看板
- 🚀 **企业级架构**：Axios 统一封装、Pinia 状态管理、组合式 API 封装

## 技术栈

| 技术       | 说明                       |
| :--------- | :------------------------- |
| Vue 3      | 渐进式 JavaScript 框架     |
| TypeScript | 类型安全的 JavaScript 超集 |
| TDesign    | 腾讯企业级 UI 组件库       |
| Pinia      | Vue 官方状态管理库         |
| Vue Router | Vue 官方路由管理器         |
| ECharts    | 数据可视化图表库           |
| Axios      | HTTP 请求库                |

## 项目结构

src/
├── api/ # API 接口管理
├── assets/ # 静态资源
├── components/ # 公共组件
├── composables/ # 组合式函数（useAI 等）
├── layout/ # 布局组件
├── router/ # 路由配置（动态路由）
├── stores/ # Pinia 状态管理
├── utils/ # 工具函数（request.ts）
├── views/ # 页面视图
│ ├── dashboard/ # 数据看板
│ └── user-manage/# 用户管理
├── App.vue
└── main.ts

## 开发环境

- Node.js >= 18
- npm >= 9

## 快速开始

```sh
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产环境
npm run build

# 类型检查
npm run type-check
```
