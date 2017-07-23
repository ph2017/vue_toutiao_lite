import {GET_NEWS_START, GET_NEWS_END, GET_NEWS} from './mutations-types'

export default {
    /**
     * 获取新闻的mutation
     * @param {$store.state, 会自动注入} state 
     * @param {触发mutation时的参数} payload 
     */
    [GET_NEWS](state, {newsType = '__all__', news = []}) {
        let type = newsType
        let newsArr = news
        if (state.newsArray[type]){
            // newsArray中已存在对应的新闻类别
            // 把获取到的新闻数据放入store中的state.newsArray
            if (state.newsArray[type].news) {
                state.newsArray[type].news = [...state.newsArray[newsType].news, ...newsArr]
            } else {
                state.newsArray[type].news = [...newsArr]
            }
            
        } else {
            // state.newsArray中不存在对应的新闻类别, 则在state.newsArray中添加
            state.newsArray = {...state.newsArray, newsType: {isFetching: false, news: newsArr}}
        }
        
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
    }
}