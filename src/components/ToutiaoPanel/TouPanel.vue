<template>
    <section class="news-section">
        <router-link to="{path:{'/' + newsItem.group_id + '/info'}}" class="news-link" >
            <div class="news-item">
                <h3 class="news_title line3">{{newsItem.title}}</h3>
                <div class="list-imgs">
                    <ul class="clearfix">
                        <li v-for="(item, index) in newsItem.image_list" class="img-wrapper" :key="index">
                            <img :src="item.url" alt="">
                        </li>
                    </ul>
                </div>
                <div class="item-info">
                    <div>
                        <span class="src space">{{newsItem.media_name}}</span>
                        <span class="cmt space">评论:{{newsItem.comment_count}}</span>
                        <span class="time">{{newsItem.datetime}}</span>
                    </div>
                </div>
            </div>
        </router-link>
    </section>
</template>

<script>
    export default {
        data() {
            // 测试用的数据
            return {
                newsItem: {
                    media_name: '时光电影工厂',
                    ban_comment: 0,
                    abstract: '作为目前的最红的小花，迪丽热巴的热度真的让很多明星羡慕，参加全国最红的综艺《奔跑吧》让她直接从上升期小花咖位直逼一线，加入奔跑吧有黑也有红，吃货人设被质疑，变小李子迷妹还被官方打脸，人红是非多，在热吧身上体现的最明显，可是不可否认的是迪丽热巴全国曝光度提高，每周五都登上热搜还是让',
                    image_list: [
                    {
                        url: 'http://p1.pstatp.com/list/31be00021f66af451020',
                        width: 690,
                        height: 388
                    },
                    {
                        url: 'http://p3.pstatp.com/list/31b8000431feecc350a2',
                        width: 720,
                        height: 405
                    },
                    {
                        url: 'http://p3.pstatp.com/list/31c300021134c9e84091',
                        width: 1500,
                        height: 843
                    }
                    ],
                    datetime: '2017-07-23 11:22',
                    article_type: 0,
                    more_mode: true,
                    tag: 'news_entertainment',
                    has_m3u8_video: 0,
                    keywords: '三生三世十里桃花,高伟光,丽姬传,奔跑吧,李慧珍,阿娜尔罕,烈火如歌,杨幂,古剑奇谭,迪丽热巴,杨诚诚,克拉恋人',
                    display_dt: 1500771177,
                    has_mp4_video: 0,
                    aggr_type: 1,
                    cell_type: 0,
                    article_sub_type: 0,
                    bury_count: 0,
                    title: '杨幂签下七位艺人，可为什么老板大幂幂却独捧热巴，原因有三个',
                    source_icon_style: 5,
                    tip: 0,
                    has_video: false,
                    share_url: 'http://toutiao.com/a6445637286377177357/?iid=0&app=news_article',
                    source: '时光电影工厂',
                    comment_count: 13,
                    article_url: 'http://toutiao.com/group/6445637286377177357/',
                    publish_time: 1500771177,
                    group_flags: 0,
                    gallary_image_count: 15,
                    tag_id: '6445637286377177357',
                    source_url: '/i6445763124774568461/',
                    display_url: 'http://toutiao.com/group/6445637286377177357/',
                    is_stick: false,
                    item_id: '6445763124774568461',
                    repin_count: 90,
                    cell_flag: 11,
                    source_open_url: 'sslocal://profile?uid=3721580592',
                    level: 0,
                    digg_count: 0,
                    behot_time: 1500780173,
                    hot: 0,
                    cursor: 1500780173999,
                    url: 'http://toutiao.com/group/6445637286377177357/',
                    user_repin: 0,
                    has_image: true,
                    video_style: 0,
                    media_info: {
                        avatar_url: 'http://p2.pstatp.com/large/1674/4245080985',
                        media_id: 3721610961,
                        name: '时光电影工厂',
                        user_verified: false
                    },
                    group_id: '6445637286377177357'
                }
                
            }
        }
    }
</script>

<style lang="scss">
    @import '../../common/style/basic.scss';
    @import '../../common/style/mixin.scss';

    .news-section {
        position: relative;
        @include attr-px-dpr(margin-left, 15px);
        @include attr-px-dpr(margin-right, 15px);
        border-bottom: 1px solid rgba(204,204,204,.6);
        .news-link {
            display: block;
            position: relative;
            @include attr-px-dpr(min-height, 42px);
            @include attr-px-dpr(padding-top, 16px);
            @include attr-px-dpr(padding-bottom, 16px);
            font-size: 0;
            -webkit-tap-highlight-color: rgba(0,0,0,.1);
            .news_title {
                @include attr-px-dpr(font-size, 17px);
                @include attr-px-dpr(line-height, 21px);
                overflow: hidden;
                text-overflow: ellipsis;
                font-weight: 400;
                color: #222;
            }
            .list-imgs {
                @include attr-px-dpr(margin-top, 6px);
                & ul li {
                    display: inline-block;
                    width: 33.33%;
                    overflow: hidden;
                    box-sizing: border-box;
                }
                & ul li:first-child {
                     @include attr-px-dpr(padding-right, 2px);
                }
                & ul li:last-child {
                     @include attr-px-dpr(padding-left, 2px);
                }
                .img-wrapper {
                    position: relative;
                    @include px2rem(height, 122.26);
                    background: url('./images/toutiaoicon_loading_textpage@3x.png') #efefef no-repeat 50%;
                    background-size: 50%;
                    img {
                        display: block;
                        width: 100%;
                        border: none;
                    }
                }
            }
            .item-info {
                @include attr-px-dpr(margin-top, 6px);
                color: #999;
                overflow: hidden;
                font-size: 0;
                span {
                    display: inline-block;
                    @include attr-px-dpr(font-size, 10px);
                    @include attr-px-dpr(line-height, 12px);
                    vertical-align: middle;
                }
                .space {
                    @include attr-px-dpr(margin-right, 5px);
                }
            }
        }
    }
</style>