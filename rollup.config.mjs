import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy' // Import copy plugin

export default {
  // 入口文件：组件库的主入口，导出了所有组件和工具
  input: 'packages/bee-plus/index.ts',
  // 输出配置：分别打包为 ESM 和 CommonJS 两种格式
  output: [
    {
      format: 'es', // ES Module 格式，适用于现代构建工具 (Vite, Webpack 5)
      file: 'packages/bee-plus/dist/index.mjs', // 产物文件名，使用 .mjs 后缀明确标识
      sourcemap: true, // 生成 source map 文件，方便开发者调试源码
    },
    {
      format: 'cjs', // CommonJS 格式，适用于 Node.js 环境或旧版打包工具
      file: 'packages/bee-plus/dist/index.js',
      sourcemap: true,
      exports: 'named' // 使用命名导出，允许 import { Button } from '...'
    }
  ],
  // 外部依赖：告诉 Rollup 不要把 'vue' 打包进去，而是作为外部依赖引用
  // 这样使用组件库的项目本身已经有 Vue 了，避免重复打包导致体积膨胀和冲突
  external: ['vue'],
  plugins: [
    // 处理 .vue 单文件组件的插件
    vue(),
    // 使用 esbuild 进行极速转译 (替代比较慢的 babel 和 tsc)
    esbuild({
      target: 'esnext', // 目标代码版本，使用较新的 JS 语法
      loaders: {
        '.vue': 'ts', // 告诉 esbuild 将 .vue 文件里的 <script> 内容当作 TypeScript 处理
      }
    }),
    // 处理 CSS 样式 (包括 scss，因为 postcss 插件会自动使用 sass 预处理器)
    postcss({
      extract: 'index.css', // 将所有样式提取到一个单独的 CSS 文件中，而不是注入到 JS 里
      minimize: true // 开启 CSS 压缩，减小体积
    }),
    // 复制静态资源文件
    copy({
      targets: [
        // 将字体图标文件从源码目录复制到发布目录，保证 icon 正常显示
        { src: 'packages/theme-chalk/fonts/*', dest: 'packages/bee-plus/dist/fonts' }
      ]
    }),
    // 解析 node_modules 中的第三方模块依赖
    resolve(),
    // 将 CommonJS 模块转换为 ES6 模块，以便 Rollup 处理
    commonjs()
  ]
}
