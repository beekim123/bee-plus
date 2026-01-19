# 为什么本项目未使用 Lerna？

本文档记录了在 Bee-Plus 组件库开发过程中，关于是否引入 Lerna 进行多包管理的决策分析。

---

## 1. 核心结论

**当前阶段（单包发布模式），完全没有必要引入 Lerna。**

我们目前的架构是 `Monorepo`（单体仓库），利用 `pnpm workspace` 进行本地依赖管理，但对外只发布统一的出口包 `bee-plus`。在这种模式下，引入 Lerna 只会增加配置复杂度，而无法发挥其核心价值。

---

## 2. Lerna 的核心价值 vs 我们的现状

Lerna（以及现代的 Changesets）是为了解决 **"需要同时发布多个相互依赖的 NPM 包"** 这一复杂场景而生的。

### 对比维度：工作流

| 特性 | 我们的现状 (Pnpm Workspace) | Lerna / Changesets 模式 |
| :--- | :--- | :--- |
| **发布目标** | **单一出口**：只发布 `bee-plus` 一个包，它打包了所有子模块。 | **多点出口**：分别发布 `@bee-plus/utils`, `@bee-plus/button`, `@bee-plus/theme` 等多个包。 |
| **依赖管理** | **无需关心**：所有代码最后都打包进一个 JS 文件，内部依赖关系在打包时被 Rollup 扁平化了。 | **极其复杂**：如果 `button` 依赖 `utils`，升级 `utils` 后，必须同步更新 `button` 为了 `package.json` 中的版本号。 |
| **版本控制** | **手动**：改一个文件的 `version`，执行一次 `npm publish`，简单直接。 | **自动**：一条命令自动检测所有变动的包，自动计算版本号，自动发版。 |

---

## 3. 为什么 Lerna 在多包场景下不可或缺？(举例)

假如未来我们的架构演变为**“多包独立发布”**，不使用 Lerna 会非常痛苦。

### 场景一：地狱级依赖同步

假设 `bee-plus` (v1.0.0) 依赖于 `@bee-plus/utils` (v1.0.0)。
你修复了 `utils` 的一个 Bug。

*   **如果不使用 Lerna（手动操作）**：
    1.  手动进入 `packages/utils`，把版本改为 `1.0.1`。
    2.  `npm publish` (发布 utils)。
    3.  **【高危】** 必须记得手动进入 `packages/bee-plus`，把 `package.json` 里依赖的 `@bee-plus/utils` 版本也改为 `^1.0.1`。
    4.  `npm publish` (发布 bee-plus)。
    *一旦忘记第 3 步，用户下载的新版 `bee-plus` 依然安装的是旧版 `utils`，Bug 依然存在。*

*   **使用 Lerna（自动化）**：
    *   只需运行 `lerna publish`。
    *   它会自动检测到 `utils` 变了 -> 升级 `utils` 版本。
    *   它会自动检测到 `bee-plus` 依赖 `utils` -> 自动更新 `bee-plus` 的依赖版本 -> 自动升级 `bee-plus` 版本。
    *   自动发布所有更新的包。

### 场景二：统一 Changelog 与 Git Tag

*   **不使用 Lerna**：你需要分别去每个目录发布，手动打 Git Tag，手动写更新日志。
*   **使用 Lerna**：它会自动生成一份包含所有子包更新内容的 `CHANGELOG.md`，并自动打上统一的 Git Tag (如 `v1.0.1`)。

---

## 4. 什么时候我们需要迁移到 Lerna/Changesets？

如果项目发展到以下阶段，可以考虑引入：

1.  **拆分发布**：决定将 `@bee-plus/theme-chalk` (样式主题) 或 `@bee-plus/utils` (工具函数) 作为独立的 NPM 包发布，供用户单独下载使用。
2.  **极度细化**：像 `lodash` 或 `element-plus` 一样，允许用户只安装 `@bee-plus/button` 而不安装其他组件。

在此之前，保持简单（Keep It Simple），目前的 Pnpm Workspace + Rollup 方案是最高效的。
