# Bee-Plus 组件库

<div align="center">
  
🐝 一个基于 Vue 3 + TypeScript 的组件库

[![Node Version](https://img.shields.io/badge/node-%3E%3D22.12.0-brightgreen)](https://nodejs.org/)
[![pnpm Version](https://img.shields.io/badge/pnpm-10.28.0-orange)](https://pnpm.io/)
[![License](https://img.shields.io/badge/license-ISC-blue)](LICENSE)

</div>

---

## ✨ 特性

- 🎯 **Vue 3 支持** - 基于 Vue 3 Composition API
- 📦 **Monorepo 架构** - 使用 pnpm workspace 管理
- 🔧 **TypeScript** - 完整的类型支持
- 🎨 **可定制** - 支持主题定制（开发中）
- ⚡️ **Vite 构建** - 快速的开发体验

## 📦 包结构

```
@bee-plus/
├── components      # Vue 3 组件库
├── utils          # 工具函数集
└── theme-chalk    # 默认主题样式
```

## 🚀 快速开始

### 环境要求

- Node.js >= 22.12.0
- pnpm >= 10.28.0

### 安装

```bash
# 克隆项目
git clone <repository-url>

# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev
```

## 📖 使用示例

### 全局注册

```typescript
// main.ts
import { createApp } from 'vue'
import { BeeButton } from '@bee-plus/components'
import App from './App.vue'

const app = createApp(App)
app.use(BeeButton)
app.mount('#app')
```

### 组件使用

```vue
<template>
  <BeeButton>点击我</BeeButton>
</template>
```

## 📚 文档

详细文档请查看 [`documents/内测版开发文档.md`](./documents/内测版开发文档.md)

## 🛠️ 开发

### 项目结构

```
bee-plus/
├── packages/           # 核心包
│   ├── components/    # 组件包
│   ├── utils/        # 工具包
│   └── theme-chalk/  # 样式包
├── usedemo/          # 示例项目
│   └── demo-proj/   # Demo 应用
├── documents/        # 文档
└── pnpm-workspace.yaml
```

### 常用命令

```bash
# 启动开发服务器
pnpm run dev

# TypeScript 类型检查
pnpm --filter demo-proj run type-check

# 构建项目
pnpm --filter demo-proj run build
```

## 📝 当前状态

**版本：** 1.0.0-beta（内测版）

### 已完成

- ✅ Monorepo 基础架构
- ✅ TypeScript 配置
- ✅ Button 组件（基础版）
- ✅ 工具函数（withInstall）
- ✅ Demo 示例项目

### 进行中

- 🔄 组件样式系统
- 🔄 更多基础组件
- 🔄 组件文档

### 计划中

- 📋 单元测试
- 📋 构建打包配置
- 📋 npm 发布
- 📋 文档站点

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

ISC License

---

<div align="center">
  Made with ❤️ by Bee-Plus Team
</div>
