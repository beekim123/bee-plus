<script setup lang="ts">
import { ref, computed } from 'vue'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/atom-one-light.css'

hljs.registerLanguage('xml', xml)

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    default: ''
  },
  code: {
    type: String,
    required: true
  }
})

const isCodeVisible = ref(false)
const copied = ref(false)

const toggleCode = () => {
  isCodeVisible.value = !isCodeVisible.value
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy!', err)
  }
}

const highlightedCode = computed(() => {
  return hljs.highlight(props.code, { language: 'xml' }).value
})
</script>

<template>
  <div class="demo-block">
    <div class="demo-header">
      <h3>{{ title }}</h3>
      <p v-if="desc" class="desc">{{ desc }}</p>
    </div>

    <div class="demo-container">
      <div class="demo-controls">
        <button class="control-btn" @click="toggleCode" :class="{ active: isCodeVisible }" title="View Source">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
        </button>
      </div>

      <div class="source-display">
        <slot></slot>
      </div>

      <div class="code-area" v-if="isCodeVisible">
        <div class="code-header">
           <span class="lang-tag">vue</span>
           <button class="copy-btn" @click="copyCode" :title="copied ? 'Copied!' : 'Copy Code'">
            <span v-if="copied" class="success-text">✔</span>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>
        <div class="code-content">
          <pre><code class="xml" v-html="highlightedCode"></code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-block {
  margin-bottom: 60px;
}

.demo-header {
  margin-bottom: 20px;
}

h3 {
  font-size: 24px;
  margin-bottom: 12px;
  color: #2c3e50;
  font-weight: 800;
  text-transform: uppercase;
  display: flex;
  align-items: center;
}

h3::before {
  content: '';
  display: inline-block;
  width: 10px;
  height: 28px;
  background: #fbc531;
  margin-right: 12px;
  border: 2px solid #000;
  box-shadow: 2px 2px 0 #000;
}

.desc {
  font-size: 16px;
  color: #2f3640;
  font-weight: 500;
  background: rgba(255,255,255,0.5);
  padding: 8px 16px;
  border-radius: 8px;
  display: inline-block;
  border: 2px solid rgba(0,0,0,0.1);
  line-height: 1.5;
}

.demo-container {
  border: 3px solid #000;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 6px 6px 0 #000;
  overflow: hidden;
  position: relative;
}

.source-display {
  padding: 30px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}

.demo-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
  z-index: 5;
}

.control-btn {
  width: 36px;
  height: 36px;
  border: 2px solid #000;
  background: #f1f2f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 2px 2px 0 #000;
  transition: all 0.1s;
  color: #2f3640;
}

.control-btn:hover {
  background: #fff;
  transform: translateY(-1px);
  box-shadow: 2px 3px 0 #000;
}

.control-btn:active, .control-btn.active {
  background: #ccc;
  transform: translateY(2px);
  box-shadow: 0 0 0 #000;
}

.code-area {
  border-top: 3px solid #000;
  background: #fafafa; /* Atom One Light bg */
  position: relative;
  color: #383a42; /* Default text color for light theme */
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: #f1f1f1;
  border-bottom: 2px solid #e1e1e1;
}

.lang-tag {
  color: #666;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: sans-serif;
}

.copy-btn {
  background: transparent;
  border: 1px solid #ccc;
  color: #666;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  width: 32px;
  height: 32px;
}

.copy-btn:hover {
  background: #e1e1e1;
  border-color: #bbb;
  color: #333;
}

.success-text {
  color: #2ed573;
  font-weight: bold;
  font-size: 14px;
}

.code-content {
  padding: 20px;
  overflow-x: auto;
}

pre {
  margin: 0;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.5;
}

code {
  background: transparent !important;
  padding: 0 !important;
}

@media (max-width: 768px) {
  .source-display {
    padding: 20px;
    gap: 12px;
  }
}
</style>
