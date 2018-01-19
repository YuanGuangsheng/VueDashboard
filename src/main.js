// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.css'
import slidebar from './components/slidebar.vue'
import navbar from './components/navbar.vue'
import echarts from 'echarts'
import menu from './assets/menu.js'
import breadCrumb from './assets/breadCrumb.js'
import tag from './assets/tag.js'

Vue.use(menu)
Vue.use(breadCrumb)
Vue.use(tag)

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(echarts)
Vue.prototype.$ajax = axios

Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts

Vue.component('slidebar', slidebar)
Vue.component('navbar', navbar)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  data: {
    Bus: new Vue()
  }
})

