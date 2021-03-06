// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入flexible.js 可以实现rem移动端自适应
import './common/js/flexible'
// css样式初始化
import './common/style/reset.css'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    preLoad: 1.3,
    // error: '@/assets/imgerror.jpg',
    // loading: '@/assets/pulldownload.gif',
    attempt: 1
});
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
