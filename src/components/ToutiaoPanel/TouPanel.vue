<template>
    <section class="news-section">
        <router-link :to="{name:'newsInfo', query:{groupId:newsItem.item_id}}" class="news-link" >
            <div class="news-item">
                <h3 class="news_title line3">{{newsItem.title}}</h3>
                <div class="list-imgs">
                    <ul class="clearfix">
                        <li v-for="(item, index) in newsItem.image_list" class="img-wrapper" :key="index">
                            <img v-lazy="item.url" alt="新闻图片">
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
        props: {
            newsItem: {
                type: Object,
                required: true
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
                        transition: opacity .3s ease;
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