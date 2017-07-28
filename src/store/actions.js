// import axios from 'axios'
import jsonp from 'jsonp'
import {GET_NEWS_START, GET_NEWS_END, GET_NEWS, GET_NEWS_ERROR, REFRESH_NEWS,
        GET_NEWS_INFO, GET_NEWS_INFO_START, GET_NEWS_INFO_END, GET_NEWS_INFO_ERROR} from './mutations-types'

export default {
    /**
     * 根据条件查询新闻的异步action方法
     * @param {commit: $store中的commit方法} param0 
     * @param {例子：{type: '代表要commit的mutation', data: '参数' }} payload 
     */
    getNews({commit, state}, payload) {

        // 开始获取新闻
        commit(GET_NEWS_START, {newsType: payload.newsType})

        let newsUrlApi = 'https://m.toutiao.com/list/?tag=' + payload.newsType + '&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=' + parseInt((new Date().getTime()) / 1000)
        // 调用今日头条接口，异步查询
        jsonp(newsUrlApi,
            function(err, res) {
                if (res) {
                    console.log('jsonp请求成功', res)
                    // 结束获取新闻
                    commit(GET_NEWS_END, {newsType: payload.newsType});
                    // 处理获取到的新闻
                    commit(GET_NEWS, {newsType: payload.newsType, news: res.data, returnCount: res.return_count});
                    // 清空获取新闻异常信息
                    commit(GET_NEWS_ERROR, {newsType: payload.newsType, fetchError: ''});
                } else if (err) {
                    console.log('请求失败', err)
                    // 结束获取新闻
                    commit(GET_NEWS_END, {newsType: payload.newsType});
                    // 处理获取新闻异常信息
                    commit(GET_NEWS_ERROR, {newsType: payload.newsType, fetchError: ''});
                }
        })

        // // 本地接口调试
        // axios.get('/api/news')
        //     .then(function (response) {
        //         console.log('请求本地接口成功');
        //         // 结束获取新闻
        //         commit(GET_NEWS_END, {newsType: payload.newsType});
        //         // 处理获取到的新闻
        //         commit(GET_NEWS, {newsType: payload.newsType, news: response.data.data.data});
        //         // 处理错误信息
        //         commit(GET_NEWS_ERROR, {newsType: payload.newsType, fetchEooro: ''});
        //     })
        //     .catch(function (error) {
        //         console.log('请求本地接口失败', error);
        //         // 处理错误信息
        //         commit(GET_NEWS_ERROR, {newsType: payload.newsType, fetchEooro: error});
        //         // 结束获取新闻
        //         commit(GET_NEWS_END, {newsType: payload.newsType});
        //     });
    },

    /**
     * 根据条件刷新新闻的异步action方法
     * @param {commit: $store中的commit方法} param0 
     * @param {例子：{type: '代表要commit的mutation', data: '参数' }} payload 
     */
    refreshNews({commit, state}, payload) {
        // 开始获取新闻
        commit(GET_NEWS_START, {newsType: payload.newsType})

        let newsUrlApi = 'https://m.toutiao.com/list/?tag=' + payload.newsType + '&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=' + parseInt((new Date().getTime()) / 1000)
        // 调用今日头条接口，异步查询
        jsonp(newsUrlApi,
            function(err, res) {
                if (res) {
                    console.log('jsonp请求成功', res)
                    // 结束获取新闻
                    commit(GET_NEWS_END, {newsType: payload.newsType});
                    // 处理获取到的新闻
                    commit(REFRESH_NEWS, {newsType: payload.newsType, news: res.data, returnCount: res.return_count});
                    // 结束获取新闻
                    commit(GET_NEWS_ERROR, {newsType: payload.newsType, fetchError: ''});
                } else if (err) {
                    console.log('请求失败', err)
                    // 结束获取新闻
                    commit(GET_NEWS_END, {newsType: payload.newsType});
                    // 结束获取新闻
                    commit(GET_NEWS_ERROR, {newsType: payload.newsType, fetchError: err});
                }
        })

        // // 本地接口调试
        // axios.get('/api/news')
        //     .then(function (response) {
        //         console.log('请求本地接口成功');
        //         // 结束获取新闻
        //         commit(GET_NEWS_END, {newsType: payload.newsType});
        //         // 处理获取到的新闻
        //         commit(REFRESH_NEWS, {newsType: payload.newsType, news: response.data.data.data});
        //         // 处理错误信息
        //         commit(GET_NEWS_ERROR, {newsType: payload.newsType, fetchError: ''});
        //     })
        //     .catch(function (error) {
        //         console.log('请求本地接口失败', error);
        //         // 处理错误信息
        //         commit(GET_NEWS_ERROR, {newsType: payload.newsType, fetchError: error});
        //         // 结束获取新闻
        //         commit(GET_NEWS_END, {newsType: payload.newsType});
        //     });

        // let newsUrlApi = 'http://m.toutiao.com/i6444007669471642126/info/'
        // // 调用今日头条接口，异步查询
        // jsonp(newsUrlApi,
        //     function(err, res) {
        //         if (res) {
        //             console.log('jsonp请求成功', res)
        //             // 结束获取新闻
        //             commit(GET_NEWS_END, {newsType: payload.newsType});
        //             // 处理获取到的新闻
        //             commit(REFRESH_NEWS, {newsType: payload.newsType, news: res.data, returnCount: res.return_count});
        //             // 结束获取新闻
        //             commit(GET_NEWS_ERROR, {newsType: payload.newsType, fetchError: ''});
        //         } else if (err) {
        //             console.log('请求失败', err)
        //             // 结束获取新闻
        //             commit(GET_NEWS_END, {newsType: payload.newsType});
        //             // 结束获取新闻
        //             commit(GET_NEWS_ERROR, {newsType: payload.newsType, fetchError: err});
        //         }
        // })
    },

    /**
     * 根据新闻id查询新闻详情
     * @param {commit: $store中的commit方法} param0 
     * @param {groupId是新闻的id} param1 
     */
    getNewsInfo({commit, state}, {groupId = ''}) {
        // 开始获取新闻详情
        commit(GET_NEWS_INFO_START, {isFetching: true})
        // 查询新闻内容api
        let newsInfoApi = `http://m.toutiao.com/i${groupId}/info/`
        // 调用今日头条接口，异步查询
        jsonp(newsInfoApi,
            function(err, res) {
                if (res && res.success) {
                    console.log('jsonp请求成功，新闻详情', res)
                    // 结束获取新闻详情
                    commit(GET_NEWS_INFO_END, {isFetching: false});
                    // 处理获取到的新闻详情
                    commit(GET_NEWS_INFO, {newsDetail: res.data});
                    // 处理获取新闻详情异常
                    commit(GET_NEWS_INFO_ERROR, {fetchError: ''});
                } else if (err) {
                    debugger
                    console.log('请求失败', err)
                    // 结束获取新闻详情
                    commit(GET_NEWS_INFO_END, {isFetching: false});
                    // 处理获取新闻详情异常
                    commit(GET_NEWS_INFO_ERROR, {fetchError: err});
                }
        })
    }
        
}