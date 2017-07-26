import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home/all?type=__all__' },
    {
      path: '/',
      name: 'app',
      component: App
    }
  ]
})
