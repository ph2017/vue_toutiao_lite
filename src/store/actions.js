// import axios from 'axios'
import jsonp from 'jsonp'
import {GET_NEWS_START, GET_NEWS_END, GET_NEWS} from './mutations-types'

// 今日头条的api
// const newsUrlApi = 'http://is.snssdk.com/api/news/feed/v51/?category=__all__&refer=1&count=20&min_behot_time=1491981025&last_refresh_sub_entrance_interval=1491981165&loc_mode=&loc_time=1491981000&latitude=&longitude=&city=&tt_from=pull&lac=&cid=&cp=&iid=0123456789&device_id=12345678952&ac=wifi&channel=&aid=&app_name=&version_code=&version_name=&device_platform=&ab_version=&ab_client=&ab_group=&ab_feature=&abflag=3&ssmix=a&device_type=&device_brand=&language=zh&os_api=&os_version=&openudid=1b8d5bf69dc4a561&manifest_version_code=&resolution=&dpi=&update_version_code=&_rticket='
const newsUrlApi = 'http://m.toutiao.com/list/?tag=' + '__all__' + '&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=' + parseInt((new Date().getTime()) / 1000)
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

        // 调用今日头条接口，异步查询
        // axios.get(newsUrlApi)
        //     .then(function (response) {
        //         console.log(response);
        //         // 结束获取新闻
        //         commit(GET_NEWS_END, []);
        //         // 处理获取到的新闻
        //         commit(GET_NEWS, {newsType: payload.newsType});
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         commit(GET_NEWS_END, {newsType: payload.newsType});
        //     });
            jsonp(newsUrlApi,
                function(err, res) {
                    // commit(type.GET_NEWSLIST, {
                    //     data: res.data,
                    //     kind: pay.kind
                    // })
                    // commit(type.CHANGE_LOADING_STATE, false);
                    // if (res.return_count) {
                    //     commit(type.RETURN, true);
                    // } else {
                    //     commit(type.RETURN, false);
                    // }
                    console.log('jsonp请求成功', res)
                    if (res) {
                        // 结束获取新闻
                        commit(GET_NEWS_END, {newsType: payload.newsType});
                        // 处理获取到的新闻
                        commit(GET_NEWS, {newsType: payload.newsType, news: res.data});
                    } else if (err) {
                        console.log('请求失败', err)
                    }
            })
        }
        
}