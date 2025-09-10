import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './stores'
import { serviceWorkerManager } from './lib/service-worker'
import './app.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

// Register service worker in production
if (import.meta.env.PROD) {
  serviceWorkerManager.register()
}