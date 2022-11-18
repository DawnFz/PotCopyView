import {createRouter, createWebHashHistory} from 'vue-router'
import NotFound from '../views/NotFound.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import InfoListView from '../views/InfoListView.vue'
import InfoView from '../views/InfoView.vue'
import ShareView from '../views/ShareView.vue'
import LoginView from '../views/LoginView.vue'
import ManagerView from '../views/ManagerView.vue'
import AuthorView from '../views/AuthorView.vue'
import InfoProcess from '../components/manager/InfoProcess.vue'
import InfoEdit from '../components/manager/InfoEdit.vue'
import PotType from '../components/manager/PotType.vue'
import PotBlock from '../components/manager/PotBlock.vue'
import PotTag from '../components/manager/PotTag.vue'
import PotNotify from '../components/manager/PotNotify.vue'
import TypeBlock from '../components/manager/TypeBlock.vue'
import MySharedInfo from '../components/author/MySharedInfo.vue'
import ShareCopy from '../components/author/ShareCopy.vue'


const loginCheck = (to: any, form: any, next: any) => {
    if (!localStorage.getItem('Token')) {
        if (to.name == "login") next();
        else router.push('login').catch()
    } else next();
}

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
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'PotCopy 管理登录'
        },
        component: LoginView
    },
    {
        path: "/:pathMatch(.*)",
        name: "NotFound",
        component: NotFound,
    },
    {
        path: '/manager',
        name: 'manager',
        meta: {
            title: 'PotCopy 管理后台'
        },
        component: ManagerView,
        // 判断是否登录
        beforeEnter: loginCheck,
        redirect: '/manager/process',
        children: [
            {
                path: "process",
                name: "process",
                component: InfoProcess
            },
            {
                path: "info-edit",
                name: "info-edit",
                component: InfoEdit
            },
            {
                path: "add-type",
                name: "add-type",
                component: PotType
            },
            {
                path: "add-block",
                name: "add-block",
                component: PotBlock
            },
            {
                path: "type-block",
                name: "type-block",
                component: TypeBlock
            },
            {
                path: "tag",
                name: "tag",
                component: PotTag
            },
            {
                path: "notify",
                name: "notify",
                component: PotNotify
            }
        ]
    },
    {
        path: '/author',
        name: 'author',
        meta: {
            title: 'PotCopy 创作者后台'
        },
        component: AuthorView,
        // 判断是否登录
        beforeEnter: loginCheck,
        redirect: '/author/my-info',
        children:
            [
                {
                    path: "my-info",
                    name: "my-info",
                    component: MySharedInfo
                },
                {
                    path: "info-share",
                    name: "info-share",
                    component: ShareCopy
                }
            ]
    }
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior() {
        return {top: 0}
    }
})

export default router
