import Vue from 'vue'
import Router from 'vue-router'
import NEWSINFO from 'components/ToutiaoDetail/TouDetail'
import ToutiaoHome from 'views/ToutiaoHome/ToutiaoHome'

Vue.use(Router)

export default new Router({
  routes: [
    { 
      // 主界面
      path: '/home/:type', 
      name: 'ToutiaoHome',
      component: ToutiaoHome 
    },
    {
      // 新闻详情页
      path: '/newsInfo',
      name: 'newsInfo',
      component: NEWSINFO
    },
    { 
      path: '/', 
      redirect: '/home/all?type=__all__'
    }
  ]
})
