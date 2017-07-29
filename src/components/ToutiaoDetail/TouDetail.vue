<template>
    <div class="news-detail-wrapper">
        <article v-if="!isLoading" class="article">
            <h1 class="news-title">{{newsDetail.title}}</h1>
            <div class="news-author">
                <a href="javascript:void(0)" class="author-avatar">
                    <div class="avatar">
                        <img :src="newsDetail.media_user.avatar_url" alt="author">
                    </div>
                </a>
                <div class="author-info">
                    <p class="author-name">
                        <a href="javascript:void(0)" class="author-name-link">
                            <span class="media-name">
                                {{newsDetail.media_user.screen_name}}
                            </span>
                        </a>
                    </p>
                    <a href="javascript:void(0)" class="author-publish">
                        <span class="publish-time">
                            {{getPublishTime}}
                        </span>
                    </a>
                </div>
                <a href="javascript:void(0)" class="favor-button">关注</a>
            </div>
            <div class="article-content" v-html="newsDetail.content">
            </div>
        </article>
        <section v-if="isLoading" class="loading">
        </section>
    </div>
</template>

<script>
    import moment from 'moment'
    import {mapActions, mapGetters} from 'vuex'

    export default {   
        name: 'ToutiaoDetail',
        data() {
            return {
                // 通过接口查询的新闻详情
                newsDetail: {
                    // detail_source: '曼珠沙华',
                    // media_user: {
                    //     no_display_pgc_icon: false,
                    //     avatar_url: 'http://p3.pstatp.com/thumb/14f001d6ca5055d9fa3',
                    //     id: '6074073256',
                    //     screen_name: '曼珠沙华'
                    // },
                    // publish_time: 1500593411,
                    // title: '凭祝你平安而红遍全国，现整容越整越难看，还有一位整成了外星人',
                    // url: 'http://toutiao.com/group/6444879476982792461/',
                    // is_original: false,
                    // is_pgc_article: true,
                    // content: '<div><p>上世纪九十年代，内地歌坛涌出了不少靠一首歌成名的歌手，比如唱《爱情鸟》的林依轮，唱《中华民谣》的孙浩，还有唱《祝你平安》的孙悦，《祝你平安》这首歌当年多活我就不再想说了，总之呢，孙悦凭借这首歌是红遍全国，家喻户晓。</p><p><img src="http://p3.pstatp.com/large/16c70001f22a2f4e8845" img_width="354" img_height="300" inline="0" alt="凭祝你平安而红遍全国，现整容越整越难看，还有一位整成了外星人" onerror="javascript:errorimg.call(this);"></p><p>另外，孙悦还演唱过《我心飞翔》、《大家一起来》、《魅力无限》等歌曲，流传度也很高。</p><p><img src="http://p1.pstatp.com/large/1f86000269b5dfd004c5" img_width="479" img_height="303" inline="0" alt="凭祝你平安而红遍全国，现整容越整越难看，还有一位整成了外星人" onerror="javascript:errorimg.call(this);"></p><p>2005年，孙悦跟丈夫吴飞舟结婚，之后慢慢的退出了公众视线，吴飞舟是某软件公司的的总裁，所以说孙悦也算是嫁入豪门，吃穿不愁，自然不用在在外打拼，2007年，孙悦生子，取名吴文琪。</p><p><img src="http://p9.pstatp.com/large/1dc200027ba35c2bd874" img_width="350" img_height="263" inline="0" alt="凭祝你平安而红遍全国，现整容越整越难看，还有一位整成了外星人" onerror="javascript:errorimg.call(this);"></p><p>吴飞舟和孙悦对这个儿子那是相当的宠爱跟看中，从小就培养着孩子学，游泳，滑雪，写作等，经常带着他世界各地的去旅行</p><p><img src="http://p3.pstatp.com/large/1dc700025f2cfd5a42b7" img_width="480" img_height="334" inline="0" alt="凭祝你平安而红遍全国，现整容越整越难看，还有一位整成了外星人" onerror="javascript:errorimg.call(this);"></p><p>孙悦出生在1972年，今年已经45岁了，已经好久不在公众视野里出现的她现在的样子如何呢，孙悦曾在微博里晒过自己的近照，引来无数的网友围观，大家看到后纷纷质疑孙悦整容，还拿出了她以前的照片做为对比，大家看一下</p><p><img src="http://p9.pstatp.com/large/18b200064e02ade56565" img_width="494" img_height="346" inline="0" alt="凭祝你平安而红遍全国，现整容越整越难看，还有一位整成了外星人" onerror="javascript:errorimg.call(this);"></p><p>不用笔者多说大家就能看出来，右边是孙悦上世纪九十年代的照片，而左边呢则是近照</p><p><img src="http://p3.pstatp.com/large/18af000653b02c361eec" img_width="494" img_height="352" inline="0" alt="凭祝你平安而红遍全国，现整容越整越难看，还有一位整成了外星人" onerror="javascript:errorimg.call(this);"></p><p>网友说，还是孙悦以前的小圆脸比较漂亮，现在是越整越难看</p><p><img src="http://p3.pstatp.com/large/18ae000440d689f93449" img_width="417" img_height="501" inline="0" alt="凭祝你平安而红遍全国，现整容越整越难看，还有一位整成了外星人" onerror="javascript:errorimg.call(this);"></p><p>说到整容啊，有一名演员就不得不提了，那就是巩新亮，来自甘肃平凉，中国内地女演员，出演过《非诚勿扰》中饰演范伟秘书"MiuMiu"，曾经也是一名青春靓丽而且面容较好的演员，当然了，也是很性感的</p><p><img src="http://p3.pstatp.com/large/2ecf000264228db9cb03" img_width="270" img_height="319" inline="0" alt="凭祝你平安而红遍全国，现整容越整越难看，还有一位整成了外星人" onerror="javascript:errorimg.call(this);"></p><p>但是，近期一个活动里，很多人发现，巩新亮怎么变成了这个样子，在场的很多人表示吓人</p><p><img src="http://p3.pstatp.com/large/18ae0004066f3638a013" img_width="496" img_height="494" inline="0" alt="凭祝你平安而红遍全国，现整容越整越难看，还有一位整成了外星人" onerror="javascript:errorimg.call(this);"></p><p>我们再来做一个对比，是不是感觉不是一个人呢，现在的样子被网友讽刺为整容失败的外星人</p><p><img src="http://p3.pstatp.com/large/18b2000619810acf8125" img_width="566" img_height="310" inline="0" alt="凭祝你平安而红遍全国，现整容越整越难看，还有一位整成了外星人" onerror="javascript:errorimg.call(this);"></p><p>想起一个事，记得孙悦后来改变画风，由温柔路线转入劲歌劲舞，穿得很标新立异，紧身装，金属色妆容，边唱边跳《我心飞翔》：欧雷欧雷欧……当时真觉得别扭，感觉她不是这个类型，你们觉得呢</p></div>',
                    // source: '曼珠沙华',
                    // video_play_count: 30
                },
                // newsDetail: this.getNewsInfoResult(),
                isLoading: false
            }
        },
        methods: {
            ...mapActions([
                'getNewsInfo'
            ]),
            ...mapGetters([
                'getNewsInfoResult',
                'getNewsInfoFetching',
                'getNewsInfoError'
            ]),

            initNewsInfo() {
                let self = this
                this.getNewsInfo({groupId: this.$route.query.groupId})
                this.isLoading = true
                return new Promise((resolve, reject) => {
                    const timer = setInterval(() => {
                        if (!self.getNewsInfoFetching() && !self.getNewsInfoError()) {
                            resolve('fetch news info success')
                            clearInterval(timer)
                        } else if (!self.getNewsInfoFetching() && self.getNewsInfoError()) {
                            reject('fetch news info error,' + this.fetchNewsError)
                            clearInterval(timer)
                        }
                        // console.log('timer ++++++++++')
                    }, 300)
                })
            }
        },
        computed: {
            getPublishTime() {
                return moment(this.newsDetail.publish_time * 1000).format('MM-DD HH:mm');
            }
        },
        created() {
            let self = this
            this.initNewsInfo().then((data) => {
                // console.log('模拟异步查询', data)
                self.isLoading = false
                self.newsDetail = self.getNewsInfoResult()
            })
        }
        // mounted() {
        //     this.newsDetail = this.getStoreNewsInfo
        // }
        // watch: {
        //     'this.$store.state.newsInfo': function(newVal, oldValue) {
        //         debugger;
        //         this.newsDetail = newVal;
        //     }
        // }
    }
</script>

<style lang="scss">
    @import '../../common/style/basic.scss';
    @import '../../common/style/mixin.scss';

    .news-detail-wrapper {
        .article {
            position: relative;
            padding-left: 17px;
            padding-right: 17px;
            background-color: #fff;
            .news-title {
                @include attr-px-dpr(font-size, 21px);
                @include attr-px-dpr(line-height, 31px);
                color: #222;
                font-family: PingFangSC-Medium;
            }
            .news-author {
                margin-top: 12px;
                display: flex;
                justify-content: flex-start;
                flex-direction: row;
                align-content: center;
                align-items: center;
                .author-avatar {
                    .avatar {
                        // display: block;
                        @include attr-px-dpr(width, 36px);
                        @include attr-px-dpr(height, 36px);
                        border-radius: 50%;
                        border: none;
                        background-color: rgba(34,34,34,.5);
                        >img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    } 
                }
                .author-info {
                    flex-grow: 1;
                    @include attr-px-dpr(padding-left, 8px);
                    .author-name {
                        @include attr-px-dpr(margin-bottom, 2px);
                        .author-name-link {
                            .media-name {
                                font-family: PingFangSC-Medium;
                                @include attr-px-dpr(font-size, 14px);
                                @include attr-px-dpr(line-height, 16px);
                                color: #222121;
                            }
                        }
                    }
                    .author-publish {
                            display: inline-block;
                        .publish-time {
                            @include attr-px-dpr(font-size, 12px);
                            @include attr-px-dpr(line-height, 12px);
                            vertical-align: middle;
                            color: #999;
                        }
                    }
                }
                .favor-button {
                    display: block;
                    text-align: center;
                    color: hsla(0,0%,100%,.96);
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    @include attr-px-dpr(width, 72px);
                    @include attr-px-dpr(height, 29px);
                    @include attr-px-dpr(line-height, 29px);
                    @include attr-px-dpr(font-size, 14px);
                    @include attr-px-dpr(border-radius, 6px);
                    background-color: #2a90d7;
                }
            }
            .article-content {
                p {
                    @include attr-px-dpr(margin-top, 24px);
                    @include attr-px-dpr(font-size, 18px);
                    @include attr-px-dpr(line-height, 30px);
                    word-wrap: break-word;
                    color: #333;
                }
                img {
                    display: block;
                    width: 100%;
                    @include attr-px-dpr(margin-top, 4px);
                    @include attr-px-dpr(margin-bottom, 4px);
                }
            }
        }
        .loading {
            position: absolute;
            height: 60%;
            width: 100%;
            background: url('./images/loading.png') no-repeat center;
        }
    }
</style>