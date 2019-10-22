import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入通用样式
import './styles/reset.scss'
import './styles/common.scss'



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
