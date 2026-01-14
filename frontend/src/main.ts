import { createApp } from 'vue';
import App from './App.vue';
import { router } from './app/router';
import { initTheme } from './app/providers/theme';
import './styles/globals.css';

initTheme();

const app = createApp(App);
app.config.devtools = true;
app.use(router).mount('#app');
