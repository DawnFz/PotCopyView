import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import InfoListView from '../views/InfoListView'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
