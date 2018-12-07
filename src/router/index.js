import Vue from 'vue'
import Router from 'vue-router'
// import demosRoutes from './demos'
import pageRoutes from './pages'
import {wxConf} from 'utils/wxConfig'
import statistics from 'utils/statistics'

Vue.use(Router)

// let routes = demosRoutes
let routes = pageRoutes

const router = new Router({
  // mode: 'history',
  routes: routes
})
let toast = null
router.beforeEach((to, from, next) => {
  if (window.$toast) {
    toast = window.$toast({
      type: 'loading',
      content: '加载中',
      duration: 0,
      align: 'center'
    })
  }
  if (process.env.NODE_ENV === 'production') {
    wxConf.init(next)
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  toast && toast.$destroy()
})
export default router
