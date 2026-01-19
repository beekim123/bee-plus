# Bee Plus

> A Vue 3 Component Library.

🔗 **GitHub Repository**: [https://github.com/beekim123/bee-plus/tree/main](https://github.com/beekim123/bee-plus/tree/main)

## Installation

```bash
npm install bee-plus
# or
pnpm add bee-plus
# or
yarn add bee-plus
```

## Usage

### Global Registration

In your `main.ts` or `main.js`:

```typescript
import { createApp } from 'vue'
import App from './App.vue'

// Import Bee-Plus and its styles
import BeePlus from 'bee-plus'
import 'bee-plus/dist/index.css'

const app = createApp(App)
app.use(BeePlus)
app.mount('#app')
```

### Import Components Manually

```typescript
import { BeeButton } from 'bee-plus'
import 'bee-plus/dist/index.css'
```
