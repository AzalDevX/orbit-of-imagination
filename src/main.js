/* Set up using Vue 3 */
import config from './config/config.js'
import colors from './config/colors.js'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.mount('#app')

//Set the title of the web
document.title = config.web.name

//Set the color palette (11 different color)
const style = document.documentElement.style;
for (const key in colors) {
    if (colors.hasOwnProperty(key)) {
        style.setProperty(key, colors[key]);
    }
}


