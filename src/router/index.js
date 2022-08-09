import Vue from 'vue'
import VueRouter from 'vue-router'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false }) // 配置，禁用进度环、速度等

const Home = () => import("../views/Home.vue")
const Login = () => import("../views/Login.vue")
const About = () => import("../views/About.vue")
const Chart = () => import("../views/Chart.vue")
const Dialog = () => import("../views/compenents/dialog.vue")
const Table = () => import("../views/compenents/table.vue")
const Page401 = () => import("../views/error/401.vue")
const Page404 = () => import("../views/error/404.vue")
const Page = () => import("../views/permission/page.vue")
const Change = () => import("../views/permission/change.vue")
const Frame = () => import("../components/frame")

Vue.use(VueRouter)

// 避免重复点击相同路径报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}


const routes = [
  {
    path: '/',
    name: 'index',
    component: Frame,
    redirect: '/home',
    children:[
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
          path: '/about',
          name: 'About',
          component: About,
          meta: ['关于'],
        },
        {
          path: '/chart',
          name: 'Chart',
          component: Chart,
          meta: ['图表']
        },
        {
          path: '/components/table',
          name: 'Table',
          component: Table,
          meta: ['组件', '表格自适应']
        },
        {
          path: '/components/dialog',
          name: 'Dialog',
          component: Dialog,
          meta: ['组件', '拖拽对话框']
        },
        {
          path: '/error/401',
          name: '401',
          component: Page401,
          meta: ['错误页面', '401']
        },
        {
          path: '/error/404',
          name: '404',
          component: Page404,
          meta: ['错误页面', '404']
        },
        {
          path: '/permission/page',
          name: 'Page',
          component: Page,
          meta: ['权限配置页', '权限测试']
        },
        {
          path: '/permission/change',
          name: 'Change',
          component: Change,
          meta: ['权限配置页', '改变权限']
        },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/401',
    name: 'Page401',
    component: Page401
  },
  {
    path: '/404',
    name: 'Page404',
    component: Page404
  },
  // 写在最后
  { path: '*', redirect: '/404' }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 前往的地址不是login且没有登录状态和前往的是login有登录状态
  if (to.path !== '/login' &&  sessionStorage.getItem('userName') === null) {
    Vue.prototype.$message.warning('还没登录哦')
    next({ path: '/login' })
    NProgress.done()
  }
  if (to.path === '/login' &&  sessionStorage.getItem('userName') !== null) {
    Vue.prototype.$message.warning('已经登录过了')
    next({ path: from.fullPath })
    NProgress.done()
  }
  // 路由权限
  if (router.app.$options.store.state.user.profile.userName === 'user' && to.path !== '/401' && to.path !== '/404') {
    let ifHas = false
    router.app.$options.store.state.menu.menus.forEach(item => {
      if (item.url === to.path) ifHas = true
      if (item.children) {
        item.children.forEach(item2 => {
          if (item2.url === to.path) ifHas = true
        })
      }
    })
    if (!ifHas) {
      next({ path: '/401' })
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

export default router
