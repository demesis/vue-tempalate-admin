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
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 前往的地址不是login且没有登录状态和前往的是login有登录状态
  if (to.path !== '/login' &&  sessionStorage.getItem('userName') === null) {
    // Vue.$message.warning('还没登录哦')
    Vue.prototype.$message.warning('还没登录哦')
    next({ path: '/login' })
    NProgress.done()
  }
  if (to.path === '/login' &&  sessionStorage.getItem('userName') !== null) {
    // Vue.$message.warning('已经登录过了')
    Vue.prototype.$message.warning('已经登录过了')
    next({ path: from.fullPath })
    NProgress.done()
  }
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

export default router
