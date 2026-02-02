# Bee-Plus 组件库

<div align="center">
  
🐝 **Bee-Plus**：一个基于 Vue 3 + TypeScript 的轻量级组件库

[![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org/)
[![pnpm Version](https://img.shields.io/badge/pnpm-%3E%3D9.0.0-orange)](https://pnpm.io/)
[![License](https://img.shields.io/badge/license-ISC-blue)](LICENSE)
[![CI/CD](https://github.com/beekim123/bee-plus/actions/workflows/publish.yml/badge.svg)](https://github.com/beekim123/bee-plus/actions)

</div>

---

## ✨ 核心特性

- 🎯 **Vue 3 Native** - 针对 Vue 3 Composition API 深度优化
- 📦 **Monorepo 架构** - 采用 pnpm workspace 管理，结构清晰
- 🛡️ **TypeScript** - 提供完整的类型定义文件 (`.d.ts`)
- 🤖 **自动化 CI/CD** - 基于 GitHub Actions 的全自动测试与发布流程
- 🧪 **单元测试** - 核心逻辑覆盖率 100% (Vitest)

---

## 🛠️ 项目结构

```text
bee-plus/
├── .github/            # CI/CD 工作流配置
├── packages/           # 核心代码包
│   ├── bee-plus/      # [发布包] 统一出口，包含所有组件和样式
│   ├── components/    # [源码] 组件源码 (Button, Progress...)
│   ├── theme-chalk/   # [源码] 样式源码 (SCSS)
│   └── utils/         # [源码] 工具函数
├── documents/          # 开发文档 (构建指南、测试指南等)
└── usedemo/            # 调试用的 vue 示例项目
```

---

## 📦 安装与使用

### 安装

```bash
npm install bee-plus
# 或
pnpm add bee-plus
# 或
yarn add bee-plus
```

### 完整引入

在 `main.ts` 中全局注册所有组件：

```typescript
import { createApp } from 'vue'
import App from './App.vue'

// 1. 引入组件库
import BeePlus from 'bee-plus'
// 2. 引入样式（必须）
import 'bee-plus/dist/index.css'

const app = createApp(App)
// 3. 注册所有组件
app.use(BeePlus)
app.mount('#app')
```

### 按需引入

如果你只想引入部分组件：

```typescript
import { createApp } from 'vue'
import App from './App.vue'
// 1. 引入需要的组件
import { BeeButton, BeeProgress, BeeMessage } from 'bee-plus'
// 2. 引入样式（必须）
import 'bee-plus/dist/index.css'

const app = createApp(App)
// 3. 注册组件
app.use(BeeButton)
app.use(BeeProgress)
// Message 是函数式调用，无需注册
app.mount('#app')
```

### 组件使用示例

#### Button 按钮

```vue
<template>
  <BeeButton type="primary">主要按钮</BeeButton>
  <BeeButton type="success" round>圆角按钮</BeeButton>
  <BeeButton type="danger" loading>加载中</BeeButton>
</template>
```

#### Progress 进度条

```vue
<template>
  <BeeProgress :percentage="50" />
  <BeeProgress :percentage="80" type="success" />
  <BeeProgress type="circle" :percentage="75" />
</template>
```

#### Message 消息提示

```typescript
import { BeeMessage } from 'bee-plus'

// 基础用法
BeeMessage('这是一条消息')

// 不同类型
BeeMessage.success('操作成功')
BeeMessage.warning('警告信息')
BeeMessage.error('错误提示')
BeeMessage.info('普通消息')

// 高级配置
BeeMessage({
  message: '这是一条消息',
  type: 'success',
  duration: 3000,
  showClose: true,
  onClose: () => {
    console.log('消息已关闭')
  }
})
```

---

## 🚀 贡献与开发

### 1. 环境准备

确保本地环境满足：
*   Node.js >= 20
*   pnpm >= 9

```bash
# 克隆项目
git clone https://github.com/beekim123/bee-plus.git

# 安装依赖
pnpm install
```

### 2. 常用命令

```bash
# 启动本地开发环境 (Demo)
npm run dev

# 运行单元测试
npm run test

# 构建打包 (生成 dist)
npm run build

# 生成类型定义文件
npm run build:types
```

---

## 📦 发布规范 (Release Workflow)

本项目采用 **GitHub Actions** 进行自动化 CI/CD 发布。

### ⚠️ 发版前必读

1.  **修改版本号**：在合并代码到 `release/online` 分支之前，**必须**手动修改 `packages/bee-plus/package.json` 中的 `version` 字段（例如 `1.0.4` -> `1.0.5`）。
2.  **不要手动 npm publish**：为了安全和规范，所有发布操作由 CI 机器人完成。你只需要负责推送代码。

### 触发发布的两种方式

#### 方式一：分支触发（推荐）
只要将代码推送或合并到 `release/online` 分支，CI 会自动执行：
1.  运行单元测试 (Test)
2.  构建代码 (Build)
3.  **自动发布到 NPM** (Publish)

**发布命令参考：**
```bash
# 1. 在开发分支 (如 1.0.0) 提交代码
git add .
git commit -m "feat: update some features"
git push origin 1.0.0

# 2. 切换到发布分支并合并
# 注意：如果是第一次创建该分支，请使用 git checkout -b release/online
git checkout release/online
git merge 1.0.0

# 3. 推送触发自动发包
git push origin release/online

# 4. 切回开发分支继续工作
git checkout 1.0.0
```

#### 方式二：Tag 触发（备用）
如果你在其他分支（如 main）想紧急发版：
```bash
git tag v1.0.6
git push origin v1.0.6
```
这也会触发同样的自动发布流程。

---

## 📚 开发文档索引

*   [构建与发布指南](./documents/构建与发布指南.md) - 详解 Rollup 配置与发包细节
*   [单元测试指南](./documents/单元测试指南.md) - 如何编写和运行 Vitest 测试
*   [配置文件速查](./documents/配置文件速查手册.md) - 各种 .json .ts 配置文件的作用

---

<div align="center">
  Made with ❤️ by Bee-Plus Team
</div>
