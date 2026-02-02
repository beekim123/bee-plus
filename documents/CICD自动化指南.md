# Bee-Plus CI/CD 自动化部署指南

本文档详细说明了本项目基于 GitHub Actions 实现自动化测试与发版的完整流程、原理解析及配置指南。

---

## 1. 原理解析

我们利用 **GitHub Actions** 打造了一条自动化的软件生产流水线。

### 1.1 核心流程图

```mermaid
graph TD
    A[开发者提交代码] --> B{触发条件?}
    B -- 推送到 release/online 分支 --> C[启动 CI/CD 流水线]
    B -- 推送到 v*.*.* 标签 --> C
    B -- 其他分支 --> D[忽略或只跑测试]
  
    subgraph GitHub Actions Runner (云端服务器)
        C --> E[任务1: Test (代码质检)]
        E --> F{测试通过?}
        F -- No --> G[❌ 流程终止, 发送失败通知]
        F -- Yes --> H[任务2: Publish (构建与发布)]
      
        H --> I[安装环境 (Node + pnpm)]
        I --> J[构建项目 (npm run build)]
        J --> K[发布到 NPM (npm publish)]
    end
  
    K --> L[✅ 新版本上线]
```

### 1.2 为什么这样做？

1. **质量守门**：在发包前强制运行单元测试，防止带 Bug 上线。
2. **环境一致**：由云端服务器统一构建，避免"在我电脑上能跑，换台电脑就报错"的问题。
3. **安全规范**：避免开发者手动在本地输入 NPM 密码，减少人为失误（如发错版本、漏发文件）。

---

## 2. 详细配置指南

### 2.1 脚本配置文件

文件路径：`.github/workflows/publish.yml`

```yaml
name: Bee-Plus CI/CD

# 触发条件配置
on:
  push:
    branches:
      - 'release/online' # 场景1: 合并到上线分支时触发
    tags:
      - 'v*'             # 场景2: 打 Tag 时触发
  pull_request:
    branches:
      - 'release/online' # 场景3: 提 PR 时触发 (只跑测试)

jobs:
  # ---------------------------------------------------
  # 任务 1：代码质检 (CI)
  # ---------------------------------------------------
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4       # 1. 拉取代码
    
      - uses: pnpm/action-setup@v3      # 2. 安装 pnpm
        with:
          version: 9

      - uses: actions/setup-node@v4     # 3. 安装 Node.js
        with:
          node-version: '20'
          cache: 'pnpm'                 # 开启缓存加速

      - run: pnpm install               # 4. 安装依赖
      - run: npm run test               # 5. 运行测试

  # ---------------------------------------------------
  # 任务 2：构建与发布 (CD)
  # ---------------------------------------------------
  publish:
    needs: test                         # 依赖关系：只有 test 任务成功，才会执行 publish
    # 安全判断：只有是 tag 推送，或者 release/online 分支推送才发包
    if: startsWith(github.ref, 'refs/tags/v') || github.ref == 'refs/heads/release/online'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
    
      - uses: pnpm/action-setup@v3
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
          registry-url: 'https://registry.npmjs.org' # 强制使用官方源

      - run: pnpm install
    
      - name: Build Project             # 6. 构建产物
        run: npm run build

      - name: Generate Types            # 7. 生成类型文件
        run: npm run build:types

      - name: Publish to NPM            # 8. 执行发布
        working-directory: packages/bee-plus # 进入发包目录
        run: npm publish --access public
        env:
          # 读取 GitHub Secrets 中的 Token
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

### 2.2 准备 NPM Token (关键步骤)

NPM Token 是 GitHub Actions 用于登录你 NPM 账号的“钥匙”。

1. 登录 [npmjs.com](https://www.npmjs.com/) -> 点击头像 -> **Access Tokens**。
2. 点击 **Generate New Token** -> **Granular Access Token**。
3. 按以下表格严格配置：

| 选项                      | 填写/选择值              | 重要性                                  |
| :------------------------ | :----------------------- | :-------------------------------------- |
| **Token name**      | `CI-Release` (随意)    | -                                       |
| **Expiration**      | `365 days`             | 避免频繁过期                            |
| **Description**     | CI                       | -                                       |
| **Bypass 2FA**      | **✅ 必须勾选**    | **最关键！不选会报 EOTP 错误**    |
| **Permissions**     | **Read and write** | **最关键！不选没法发包**          |
| **Select packages** | 🔘**All packages** | **强烈推荐！避免 Scope 权限报错** |

4. 点击 Generate，**复制生成的 Token** (以 `npm_` 开头)。

---

### 2.3 配置 GitHub Secrets

1. 进入你的 GitHub 仓库页面。
2. 点击顶部导航栏的 **Settings**。
3. 左侧菜单：**Secrets and variables** -> **Actions**。
4. 点击 **New repository secret** (绿色按钮)。
5. 填写信息：
   * **Name**: `NPM_TOKEN` (必须和 yml 脚本里的变量名一致)
   * **Secret**: 粘贴刚才复制的 NPM Token。
6. 点击 **Add secret** 保存。

---

## 3. 常见报错排查

如果在 Actions 页面看到任务变红（Failure），请对照下表：

### 🔴 错误 1：EOTP (One-time password)

```text
npm error code EOTP
npm error This operation requires a one-time password...
```

* **原因**：生成 NPM Token 时，**没勾选** "Bypass two-factor authentication (2FA)"。
* **解决**：删掉旧 Token，重新生成一个，务必勾选该选项。

### 🔴 错误 2：403 Forbidden (Credential Permissions)

```text
npm error 403 Forbidden - You may not perform that action with these credentials
```

* **原因**：Token 的权限范围不对。通常是因为你选了 "Only select packages"，但 scopes 列表里没有涵盖当前包名（特别是当你的包名没有 scope 前缀时）。
* **解决**：最简单的办法是重新生成 Token，并在 "Select packages" 步骤选择 **"All packages"**。

### 🔴 错误 3：403 Forbidden (Version Exists)

```text
npm error 403 Forbidden - You cannot publish over the previously published versions
```

* **原因**：你要发布的版本号（如 1.0.4）在 NPM 上已经存在了。
* **解决**：
  1. 手动修改 `packages/bee-plus/package.json` 中的 `version` (如改为 1.0.5)。
  2. 提交并推送代码，再次触发 CI。
