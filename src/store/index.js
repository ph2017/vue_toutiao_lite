import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
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
    ]
  }
})
