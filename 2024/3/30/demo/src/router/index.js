import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'
import LoginView from '@/views/login/LoginView.vue'
import RegisterView from '@/views/register/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: '首页',
    component: HomeView
  },
  {
    path: '/login',
    name: '登录',
    component: LoginView,
    // 只有访问login页面之前执行
    beforeEnter: (to, from, next) => {
      const isLogin = localStorage.getItem('isLogin')
      if (isLogin)next('/')
      else next()
    }
  },
  {
    path: '/register',
    name: '注册',
    component: RegisterView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局前置守卫,from:当前导航正要离开的路由、to:即将要进入的目标
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('isLogin')
  if (isLogin || to.name === '登录' || to.name === '注册') {
    next()
  } else {
    next('/login')
  }
  return false
})
export default router
