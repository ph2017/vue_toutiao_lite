// import axios from 'axios'
import jsonp from 'jsonp'
import {GET_NEWS_START, GET_NEWS_END, GET_NEWS, GET_NEWS_ERROR, REFRESH_NEWS} from './mutations-types'

// 今日头条的api
// const newsUrlApi = 'http://is.snssdk.com/api/news/feed/v51/?category=__all__&refer=1&count=20&min_behot_time=1491981025&last_refresh_sub_entrance_interval=1491981165&loc_mode=&loc_time=1491981000&latitude=&longitude=&city=&tt_from=pull&lac=&cid=&cp=&iid=0123456789&device_id=12345678952&ac=wifi&channel=&aid=&app_name=&version_code=&version_name=&device_platform=&ab_version=&ab_client=&ab_group=&ab_feature=&abflag=3&ssmix=a&device_type=&device_brand=&language=zh&os_api=&os_version=&openudid=1b8d5bf69dc4a561&manifest_version_code=&resolution=&dpi=&update_version_code=&_rticket='
// 查询新闻列表的api
// const newsUrlApi = 'http://m.toutiao.com/list/?tag=' + '__all__' + '&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=' + parseInt((new Date().getTime()) / 1000)
// 查询新闻详情的api
// const newsDetailApi = 'http://m.toutiao.com/i6364969235889783298/info/'

export default {
    /**
     * 根据条件查询新闻的异步action方法
     * @param {commit: $store中的commit方法} param0 
     * @param {例子：{type: '代表要commit的mutation', data: '参数' }} payload 
     */
    getNews({commit, state}, payload) {
        // 开始获取新闻
        commit(GET_NEWS_START, {newsType: payload.newsType})

        let newsUrlApi = 'http://m.toutiao.com/list/?tag=' + payload.newsType + '&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=' + parseInt((new Date().getTime()) / 1000)
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

        let newsUrlApi = 'http://m.toutiao.com/list/?tag=' + payload.newsType + '&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=' + parseInt((new Date().getTime()) / 1000)
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
    }
        
}