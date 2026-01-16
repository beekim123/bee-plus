import './assets/main.css';
import { BeeButton } from '@bee-plus/components';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
const app = createApp(App);
app.use(router);
app.use(BeeButton);
app.mount('#app');
