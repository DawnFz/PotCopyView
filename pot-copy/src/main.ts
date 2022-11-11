import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import './element-variables.scss'
import locale from 'element-plus/lib/locale/lang/zh-cn'

const app = createApp(App)
app.use(router).use(ElementPlus, {locale: zhCn})
    .use(ElementPlus, {locale}).mount('#app')
