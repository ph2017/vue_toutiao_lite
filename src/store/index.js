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
    // 设置默认加载的新闻类型是推荐
    defaultType: '__all__',
    // 新闻内容对象数组
    newsArray: {
        __all__: {
            // 是否查询中
            isFetching: false,
            fetchError: '',
            news: []
        },
        news_hot: {
          // 是否查询中
          isFetching: false,
          news: []
        },
        news_society: {
          isFetching: false,
          news: []
        },
        news_entertainment: {
          isFetching: false,
          news: []
        },
        news_tech: {
          isFetching: false,
          news: []
        },
        news_car: {
          isFetching: false,
          news: []
        },
        news_sports: {
          isFetching: false,
          news: []
        },
        news_finance: {
          isFetching: false,
          news: []
        },
        news_military: {
          isFetching: false,
          news: []
        },
        news_world: {
          isFetching: false,
          news: []
        },
        news_fashion: {
          isFetching: false,
          news: []
        }
    }
  },
  // 根据新闻的id获取到的新闻内容
  newsInfo: {
    // 是否查询中
    isFetching: false,
    // 查询异常
    fetchError: '',
    // 新闻内容对象
    newsDetail: {}
  },
  getters: {
    /**
     * 根据type获取store中的news数组
     */
    getNewsByType: (state, type) => {
      let newsObj = state.newsArray[type]
      if (newsObj) {
        return newsObj.news
      }
      return []
    }
  }
})
