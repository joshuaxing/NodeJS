/*
 * @Author: your name
 * @Date: 2019-11-26 15:27:02
 * @LastEditTime: 2020-05-29 13:08:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mini-admin\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import filters from './utils/filters'
import ElementUI from 'element-ui'
import './assets/pagestyle/index.scss'
import 'element-ui/lib/theme-chalk/index.css'

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.use(ElementUI, { size: 'mini', zIndex: 3000});
Vue.config.productionTip = false

//filter
Object.keys(filters).forEach(k => {
　　Vue.filter(k, filters[k])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
