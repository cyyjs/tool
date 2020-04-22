import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import './assets/css/main.scss'
import electron from 'electron'

Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$electron', { value: electron })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
