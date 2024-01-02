import config from './config/config.js'
import colors from './config/colors.js'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './styles/App.css'

const app = createApp(App)

app.use(router)
app.mount('#app')

//Set the title of the web
document.title = config.web.name

//Set the color palette (11 different colors)
const style = document.documentElement.style
for (const key in colors.global) {
    if (colors.global.hasOwnProperty(key)) {
        style.setProperty(key, colors.global[key]);
    }
}



