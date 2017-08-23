import Vue from 'vue'
import Router from 'vue-router'
// import Header from '@/components/Header'

Vue.use(Router)

export default new Router({
  // 使用history模式重新刷新页面会出现404，因为无法修改后端配置，只能禁用history模式了
  // mode: 'history',
  // base: '/cnode_vue/',
  routes: [
    {
      path: '/home', // 主页
      name: 'home',
      component: resolve => require(['../pages/home/'], resolve)
    },
    {
      path: '/detail', // 详情
      name: 'detail',
      component: resolve => require(['../pages/detail/'], resolve)
    },
    {
      path: '/msg', // msg
      name: 'msg',
      component: resolve => require(['../pages/msg/'], resolve)
    },
    {
      path: '/publish', // publish
      name: 'publish',
      component: resolve => require(['../pages/publish/'], resolve)
    },
    {
      path: '/user', // user
      name: 'user',
      component: resolve => require(['../pages/user/'], resolve)
    },
    {
      path: '/', // 默认主页
      component: resolve => require(['../pages/home/'], resolve)
    },
    {
      path: '*', // 其他页面，强制跳转到home页
      redirect: '/home'
    }
  ]
})
