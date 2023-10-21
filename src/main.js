/* Set up using Vue 3 */
import config from './config/config.js'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.mount('#app')

// Establece el título de la página usando config.web.name
document.title = config.web.name

// Establece el ícono favicon de la página usando config.web.favicon
const faviconLink = document.querySelector("link[rel*='icon']")
if (faviconLink) {
  faviconLink.href = config.web.favicon
}

// Establece la imagen de fondo de la página usando config.web.bg_image

