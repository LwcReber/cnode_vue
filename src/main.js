// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './css/common.scss'

import components from './components'
import VueResource from 'vue-resource'
// loading插件
Vue.component('sync-loader', require('vue-spinner/src/SyncLoader.vue'))
Vue.use(VueResource)
Vue.config.productionTip = false;

(
  function rem (baseWidth) {
    var root = document.documentElement
    var w = root.clientWidth
    w = w > 640 ? 640 : w < 320 ? 320 : w
    var fz = w / baseWidth * 100
    root.style.fontSize = fz + 'px'
  }(414)
)

// 注册组件
Object.keys(components).forEach((key) => {
  // 首字母大写
  var name = key.replace(/(\w)/, (v) => v.toUpperCase())
  Vue.component(`v${name}`, components[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
