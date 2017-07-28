import {GET_NEWS_START, GET_NEWS_END, GET_NEWS, GET_NEWS_ERROR, REFRESH_NEWS,
        GET_NEWS_INFO, GET_NEWS_INFO_START, GET_NEWS_INFO_END, GET_NEWS_INFO_ERROR} from './mutations-types'

export default {
    /**
     * 获取新闻的mutation
     * @param {$store.state, 会自动注入} state 
     * @param {触发mutation时的参数} payload 
     */
    [GET_NEWS](state, {newsType = '__all__', news = [], returnCount = 0}) {
        if (state.newsArray[newsType]){
            // newsArray中已存在对应的新闻类别
            // 把获取到的新闻数据放入store中的state.newsArray
            if (state.newsArray[newsType].news) {
                state.newsArray[newsType].news = [...state.newsArray[newsType].news, ...news]
            } else {
                state.newsArray[newsType].news = [...news]
            }
            
        } else {
            // state.newsArray中不存在对应的新闻类别, 则在state.newsArray中添加
            state.newsArray = {...state.newsArray, newsType: {isFetching: false, news: news}}
        }
        state.newsArray[newsType].returnCount = returnCount
        
    },

    /**
     * 刷新新闻的mutation，
     * 与GET_NEWS的区别是：刷新新闻会把获取到的新闻放在前面
     * @param {$store.state, 会自动注入} state 
     * @param {触发mutation时的参数} payload 
     */
    [REFRESH_NEWS](state, {newsType = '__all__', news = [], returnCount = 0}) {
        if (state.newsArray[newsType]){
            // newsArray中已存在对应的新闻类别
            // 把获取到的新闻数据放入store中的state.newsArray
            if (state.newsArray[newsType].news) {
                state.newsArray[newsType].news = [...news, ...state.newsArray[newsType].news]
            } else {
                state.newsArray[newsType].news = [...news]
            }
            
        } else {
            // state.newsArray中不存在对应的新闻类别, 则在state.newsArray中添加
            state.newsArray = {...state.newsArray, newsType: {isFetching: false, news: news}}
        }
        state.newsArray[newsType].returnCount = returnCount
    },

    /**
     * 开始异步获取新闻的mutation
     * @param {$store.state, 会自动注入} state 
     * @param {参数例子：{newsType: 'xxx'}} payload 
     */
    [GET_NEWS_START](state, {newsType = '__all__'}) {
        if (state.newsArray[newsType]){
            // newsArray中已存在对应的新闻类别
            // 把对应新闻类别对象中的isFetching设置为true
            state.newsArray[newsType] = {...state.newsArray[newsType], 'isFetching': true}
        } else {
            // state.newsArray中不存在对应的新闻类别, 则在state.newsArray中添加,并设置isFetching为true
            state.newsArray = {...state.newsArray, newsType: {'isFetching': true}}
        }
    },

    /**
     * 结束异步获取新闻的mutation
     * @param {$store.state, 会自动注入} state 
     * @param {参数例子：{newsType: 'xxx'}} payload 
     */
    [GET_NEWS_END](state, {newsType = '__all__'}) {

        // 理论上此时state.newsArray中必定有对应的新闻类型
        if (state.newsArray[newsType]){
            // newsArray中已存在对应的新闻类别
            // 把对应新闻类别对象中的isFetching设置为false
            state.newsArray[newsType] = {...state.newsArray[newsType], 'isFetching': false}
        }
    },

    /**
     * 获取新闻时的异常处理mutation
     * @param {*} state 
     * @param {查询新闻的错误时产生的信息} param1 
     */
    [GET_NEWS_ERROR](state, {newsType = '__all__', fetchError = ''}) {
        // 理论上此时state.newsArray中必定有对应的新闻类型
        if (state.newsArray[newsType]){
            // newsArray中已存在对应的新闻类别
            // 设置对应新闻类别对象中的错误提示
            state.newsArray[newsType] = {...state.newsArray[newsType], 'fetchError': fetchError}
        }
    },

    /**
     * 获取到新闻详情后的处理方法
     * @param {$store.state, 会自动注入} state 
     * @param {新闻详情} param1 
     */
    [GET_NEWS_INFO](state, {newsDetail = {}}) {
        state.newsInfo = Object.assign({}, state.newsInfo, {newsDetail: newsDetail})
    },

    /**
     * 开始异步获取新闻详情的mutation
     * @param {$store.state, 会自动注入} state 
     * @param {参数例子：{newsType: 'xxx'}} payload 
     */
    [GET_NEWS_INFO_START](state, {isFetching = true}) {
        // 设置state中的newsInfo.isFetching
        state.newsInfo = {...state.newsInfo, 'isFetching': isFetching}
    },
       
    /**
     * 结束异步获取新闻详情的mutation
     * @param {$store.state, 会自动注入} state 
     * @param {参数例子：{newsType: 'xxx'}} payload 
     */
    [GET_NEWS_INFO_END](state, {isFetching = false}) {
        // 设置state中的newsInfo.isFetching
        state.newsInfo = {...state.newsInfo, 'isFetching': isFetching}
    },

    /**
     * 获取新闻详情的异常处理mutation
     * @param {*} state 
     * @param {查询新闻的错误时产生的信息} param1 
     */
    [GET_NEWS_INFO_ERROR](state, {fetchError = ''}) {
        // 理论上此时state.newsArray中必定有对应的新闻类型
        state.newsInfo = Object.assign({}, state.newsInfo, {fetchError: fetchError})
    }
}