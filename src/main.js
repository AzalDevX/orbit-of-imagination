/* Set up using Vue 3 */
import config from './config/config.js'
import colors from './config/colors.js'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.mount('#app')

document.title = config.web.name

const style = document.documentElement.style;

style.setProperty('--bg1', colors.global['--bg1'])


