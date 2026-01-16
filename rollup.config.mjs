import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy' // Import copy plugin

export default {

  input: 'packages/bee-plus/index.ts',
  output: [
    {
      format: 'es',
      file: 'packages/bee-plus/dist/index.mjs',
      sourcemap: true,
    },
    {
      format: 'cjs',
      file: 'packages/bee-plus/dist/index.js',
      sourcemap: true,
      exports: 'named'
    }
  ],
  external: ['vue'],
  plugins: [
    vue(), // Process Vue files first
    esbuild({ // Transpile TS and JS
      target: 'esnext',
      loaders: {
        '.vue': 'ts', // Treat .vue content as ts
      }
    }),
    postcss({
      extract: 'index.css',
      minimize: true
    }),
    copy({
      targets: [
        { src: 'packages/theme-chalk/fonts/*', dest: 'packages/bee-plus/dist/fonts' }
      ]
    }),
    resolve(),
    commonjs()
  ]
}
