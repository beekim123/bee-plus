# Bee Plus

> A Vue 3 Component Library with Hardcore Cartoon Style 🎮

🔗 **GitHub Repository**: [https://github.com/beekim123/bee-plus/tree/main](https://github.com/beekim123/bee-plus/tree/main)

## ✨ Features

- 🎯 Vue 3 Composition API
- 📦 TypeScript Support
- 🎨 Brawl Stars Inspired Design
- 🔧 Tree-shakable
- 📱 Responsive

## Installation

```bash
npm install bee-plus
# or
pnpm add bee-plus
# or
yarn add bee-plus
```

## Quick Start

### Full Import

Import all components globally in your `main.ts`:

```typescript
import { createApp } from 'vue'
import App from './App.vue'

// Import Bee-Plus and styles
import BeePlus from 'bee-plus'
import 'bee-plus/dist/index.css'

const app = createApp(App)
app.use(BeePlus)
app.mount('#app')
```

### On-Demand Import

Import only the components you need:

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import { BeeButton, BeeProgress, BeeMessage } from 'bee-plus'
import 'bee-plus/dist/index.css'

const app = createApp(App)
app.use(BeeButton)
app.use(BeeProgress)
// BeeMessage is a function, no need to register
app.mount('#app')
```

## Components

### Button

```vue
<template>
  <!-- Basic -->
  <BeeButton>Default</BeeButton>
  <BeeButton type="primary">Primary</BeeButton>
  <BeeButton type="success">Success</BeeButton>
  <BeeButton type="warning">Warning</BeeButton>
  <BeeButton type="danger">Danger</BeeButton>
  
  <!-- With icons -->
  <BeeButton icon="star-on" type="primary">Star</BeeButton>
  
  <!-- States -->
  <BeeButton loading>Loading...</BeeButton>
  <BeeButton disabled>Disabled</BeeButton>
  
  <!-- Shapes -->
  <BeeButton round>Round Button</BeeButton>
  <BeeButton circle icon="search"></BeeButton>
  
  <!-- Sizes -->
  <BeeButton size="large">Large</BeeButton>
  <BeeButton size="default">Default</BeeButton>
  <BeeButton size="small">Small</BeeButton>
</template>
```

### Progress

```vue
<template>
  <!-- Line Progress -->
  <BeeProgress :percentage="50" />
  <BeeProgress :percentage="80" type="success" />
  <BeeProgress :percentage="100" type="warning" status="success" />
  
  <!-- Circle Progress -->
  <BeeProgress type="circle" :percentage="75" />
  <BeeProgress type="circle" :percentage="100" status="success" />
  
  <!-- Dashboard Progress -->
  <BeeProgress type="dashboard" :percentage="80" />
  
  <!-- With text inside -->
  <BeeProgress :percentage="70" :stroke-width="26" text-inside />
  
  <!-- Custom color -->
  <BeeProgress :percentage="50" color="#8e44ad" />
  
  <!-- Striped & Animated -->
  <BeeProgress :percentage="60" striped animated />
</template>
```

### Message

```typescript
import { BeeMessage } from 'bee-plus'

// Basic usage
BeeMessage('This is a message')

// Different types
BeeMessage.success('Success message')
BeeMessage.warning('Warning message')
BeeMessage.error('Error message')
BeeMessage.info('Info message')

// With options
BeeMessage({
  message: 'Custom message',
  type: 'success',
  duration: 3000,        // Auto close after 3s
  showClose: true,       // Show close button
  center: true,          // Center text
  onClose: () => {       // Callback on close
    console.log('Message closed')
  }
})

// HTML content (use with caution)
BeeMessage({
  dangerouslyUseHTMLString: true,
  message: '<strong>HTML</strong> content'
})

// Never auto-close
BeeMessage({
  message: 'Persistent message',
  duration: 0,
  showClose: true
})
```

## TypeScript Support

Bee-Plus is written in TypeScript and provides complete type definitions:

```typescript
import type { ButtonProps, MessageOptions } from 'bee-plus'

const buttonProps: ButtonProps = {
  type: 'primary',
  size: 'large',
  loading: false
}

const messageOptions: MessageOptions = {
  message: 'Hello',
  type: 'success',
  duration: 3000
}
```

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge) and IE11+

## License

ISC

## Links

- [GitHub](https://github.com/beekim123/bee-plus)
- [NPM](https://www.npmjs.com/package/bee-plus)
