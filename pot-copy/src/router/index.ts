import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import InfoListView from '../views/InfoListView.vue'
import InfoView from '../views/InfoView.vue'
import ShareView from '../views/ShareView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            title: 'PotCopy 尘歌壶摹本分享'
        },
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        meta: {
            title: '关于 PotCopy'
        },
        component: AboutView
    },
    {
        path: '/info-list',
        name: 'info-list',
        meta: {
            title: 'PotCopy 展示'
        },
        component: InfoListView
    },
    {
        path: '/info',
        name: 'info',
        meta: {
            title: 'PotCopy 详情'
        },
        component: InfoView
    },
    {
        path: '/share',
        name: 'share',
        meta: {
            title: 'PotCopy 上传'
        },
        component: ShareView
    }
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
    // 每次切换路由页面滚动到顶部
    scrollBehavior () {
        return { top: 0 }
    }
})

export default router
