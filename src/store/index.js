import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)
export default new Vuex.Store({
  actions,
  mutations,
  state: {
    // 导航的标题对象数组
    navTitle: [{
        text: '推荐',
        url: '/home/all',
        type: '__all__'
      },
      {
        text: '热点',
        url: '/home/hot',
        type: 'news_hot'
      },
      {
        text: '社会',
        url: '/home/society',
        type: 'news_society'
      },
      {
        text: '娱乐',
        url: '/home/entertainment',
        type: 'news_entertainment'
      },
      {
        text: '科技',
        url: '/home/tech',
        type: 'news_tech'
      },
      {
        text: '汽车',
        url: '/home/car',
        type: 'news_car'
      },
      {
        text: '体育',
        url: '/home/sports',
        type: 'news_sports'
      },
      {
        text: '财经',
        url: '/home/finance',
        type: 'news_finance'
      },
      {
        text: '军事',
        url: '/home/military',
        type: 'news_military'
      },
      {
        text: '国际',
        url: '/home/world',
        type: 'news_world'
      },
      {
        text: '时尚',
        url: '/home/fashion',
        type: 'news_fashion'
      }
    ],
    // 新闻内容对象数组
    newsArray: {
        __all__: {
            // 是否查询中
            isFetching: false,
            news: []
        },
        news_hot: {},
        news_society: {},
        news_entertainment: {},
        news_tech: {},
        news_car: {},
        news_sports: {},
        news_finance: {},
        news_military: {},
        news_world: {},
        news_fashion: {}
    }
  }
})
