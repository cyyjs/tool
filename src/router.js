import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
// import About from './views/About.vue'
import FmJson from './views/format/json.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/fm/json'
    },
    {
      path: '/fm/json',
      name: 'fmjson',
      component: FmJson
    }
  ]
})
