import './assets/main.css'
import { BeeButton, BeeProgress } from '@bee-plus/components'
import '@bee-plus/theme-chalk/index.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

const app = createApp(App)

app.use(router)
app.use(BeeButton)
app.use(BeeProgress)

app.mount('#app')
