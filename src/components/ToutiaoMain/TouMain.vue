/**
* 头条的主体内容组件
*/
<template>
    <div>
        <div ref="touchRefreshWrapper" class="vue-touch-refresh">
            <span class="refresh-container">
                <span ref="touchRefresh" class="refresh"><i class="icon icon-refresh"></i></span>
            </span>
            <!--{{this.msg}}-->
        </div>
        
        <div ref="toutiaoMain" id="toutiao-main">
            <v-TouPanel v-for="(item, index) in getNewsByType" :key="index" :newsItem="item"></v-TouPanel>
            <v-ExposureView :containerEl="exposureViewContainer" :onProps="exposureViewOne" :fireProps="exposureViewFire">
                <div class="loading-tip">
                    加载中...
                </div>
            </v-ExposureView>
            
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import store from '../../store/index.js'
    import TouPanel from 'components/ToutiaoPanel/TouPanel'
    import BetterScrollView from 'components/BetterScrollView/BetterScrollView'
    import ExposureView from 'components/ExposureView/ExposureView.vue'

    export default {
        name: 'TouMain',
        store,
        data() {
            return {
                // news: [],
                msg: '',
                flag: false, // 表示是否达到刷新条件
                loading: false,  // 表示是否正在刷新中
                touchStart: 0,  // 手指触摸屏幕的起点的Y轴坐标
                distance: 0,     // 手指滑动的距离，Y轴距离
                scrollTopDistance: 0,    // 记录控件的滑动距离
                exposureViewContainer: '#toutiao-main',   // 曝光组件的container的选择器，用作曝光组件的props
                exposureViewOne: {
                    // 监听曝光控件可见事件
                    event: 'isVisiable',
                    handler: () => {
                        this.getNews({newsType: this.getRouteQueryParam()})
                    }
                },
                exposureViewFire: {
                    // 曝光事件发生时，曝光组件内部应调用'isVisiable'事件的处理函数
                    event: 'isVisiable'
                },
                // 记录每个类型新闻列表的Y轴偏移， 例子：__all__:{y: 20}
                // 记录之后，方便在路由改变时，自动移动到上次操作的位置
                scrollTopStatus: {}
            }
        },
        methods: {            
            initScrollListener() {
                // window.addEventListener('scroll', this.scrollHandler)
                (this.$refs.toutiaoMain).addEventListener('scroll', this.scrollHandler)
            },
            // 记录当前新闻列表y轴偏移的方法，在路由改变时调用
            recordNewsScrollY(newsType) {
                // 获取当前newsType新闻类型的Y轴偏移量
                let scrollY = this.$refs.toutiaoMain.scrollTop
                let scrollTopStatus = this.scrollTopStatus

                if (scrollTopStatus[newsType]) {
                    // this.scrollTopStatus中存在newsType对象的话，则修改
                    this.$set(scrollTopStatus[newsType], 'y', scrollY)
                } else {
                    // 否则添加
                    this.$set(scrollTopStatus, newsType, {y: scrollY})
                }
            },
            // 从this.scrollTopStatus缓存中查询新闻列表的y轴偏移
            getRecordNewsScroll(newsType) {
                let scrollObj = this.scrollTopStatus[newsType]
                if (scrollObj) {
                    return scrollObj.y
                } else {
                    return 0
                }
            },
            scrollHandler(event) {
                // console.log('scrollHandler event = ', event)
                // let scrollTop = window.document.body.scrollTop
                let scrollTop = (this.$refs.toutiaoMain).scrollTop
                this.scrollTopDistance = scrollTop
                // console.log('scrollTop = ' + scrollTop)
                this.recordNewsScrollY(this.getRouteQueryParam())
            },
            /**
             * 下拉刷新动画效果设置方法
             */
            pullDownRefreshShow({resreshContainerElment, height = 0}, {refreshElement, opacity = 0, transform}) {
                if (refreshElement) {
                    resreshContainerElment.style.height = `${height}px`
                }
                if (refreshElement) {
                    refreshElement.style.opacity = opacity
                    if (transform) {
                        refreshElement.style.transform = transform
                    }
                }
            },
            /**
             * 获取路由查询参数的方法
             */
            getRouteQueryParam() {
                // 初次加载时，$route为undefined, 
                let type = this.$route.query.type
                // 默认取$store.state.defaultType作为查询参数
                if (!type) {
                    type = this.$store.state.defaultType
                }
                return type
            },
            // 顶部下拉刷新新闻数据的方法
            pullDownRefreshNews() {
                if (!this.isFetchingNews) {
                    this.refreshNews({newsType: this.getRouteQueryParam()})

                    return new Promise((resolve, reject) => {
                        const timer = setInterval(() => {
                            if (!this.isFetchingNews && !this.fetchNewsError) {
                                resolve('fetch news success')
                                clearInterval(timer)
                            } else if (!this.isFetchingNews && this.fetchNewsError) {
                                reject('fetch news error,' + this.fetchNewsError)
                                clearInterval(timer)
                            }
                            // console.log('timer ++++++++++')
                        }, 300)
                    })
                }
            },
            ...mapActions([
                // 映射 this.getNews() 为 this.$store.dispatch('getNews')
                'getNews',
                'refreshNews'
            ])
        },
        computed: {
            getNewsByType() {
                const newsType = this.getRouteQueryParam()
                return this.$store.state.newsArray[newsType].news
            },
            isFetchingNews() {
                const newsType = this.getRouteQueryParam()
                return this.$store.state.newsArray[newsType].isFetching
            },
            fetchNewsError() {
                const newsType = this.getRouteQueryParam()
                return this.$store.state.newsArray[newsType].FetchError
            }
        },
        watch: {
            '$route': function(newValue, oldValue) {
                // 路由改变时，自动偏移到保存的y坐标
                let routeParam = this.getRouteQueryParam()
                let scrollY = this.getRecordNewsScroll(routeParam)
                this.$refs.toutiaoMain.scrollTop = scrollY
            }
        },
        // mounted() {
        //     this.$nextTick(() => {
        //         this.exposureViewContainer = this.$refs.toutiaoMain
        //     })
        // },
        created() {

            // $store.state.newArray中存在对应类型的新闻缓存时，不自动查询
            if (!this.getNewsByType || this.getNewsByType.length === 0) {
                // 组件created时， 调用action，根据路由查询新闻
                const param = this.getRouteQueryParam()
                this.getNews({newsType: param});
            }
            
            this.$nextTick(() => {
                // debugger
                const container = this.$refs.toutiaoMain
                const touchRefreshWrapper = this.$refs.touchRefreshWrapper
                const touchRefresh = this.$refs.touchRefresh
                container.style.height = window.innerHeight + 'px'
                this.initScrollListener()

                // 监听触摸开始事件
                container.addEventListener('touchstart', (event) => {

                    // 如果此时loading = true,表示刷新正在进行，此时阻止下拉操作，返回
                    // if (this.loading) {
                    //     event.preventDefault()
                    //     return
                    // }
                    // 记录第一个触摸点作为起始位置
                    this.touchStart = event.targetTouches[0].clientY
                    // console.log('touchStart point', this.touchStart)
                }, {passive: true})

                container.addEventListener('touchmove', (event) => {

                    // 没有起始位置的话，返回
                    if (!this.touchStart) {
                        return
                    }
                    // 如果此时loading = true,表示刷新正在进行，此时阻止下拉操作，返回
                    // if (this.loading) {
                    //     event.preventDefault()
                    //     return
                    // }

                    const touch = event.targetTouches[0]
                    const distanceY = touch.clientY
                    this.distance = distanceY - this.touchStart
                    // console.log('touchMove touch = ', touch.clientY)

                    // 最大下拉刷新的下拉距离
                    let maxDistanceY = 160
                    if (this.distance <= maxDistanceY && this.scrollTopDistance === 0) {

                        // 计算旋转角度
                        let rotageDeg = -(this.distance / maxDistanceY) * 360 + 'deg'
                        // console.log('rotageDer = ' + rotageDeg)

                        this.pullDownRefreshShow({
                            resreshContainerElment: touchRefreshWrapper,
                            height: this.distance
                        }, {
                            refreshElement: touchRefresh,
                            opacity: this.distance / maxDistanceY,
                            transform: `rotate(${rotageDeg})`
                        })

                        if (this.distance > 55) {
                            this.msg = '释放刷新'
                            this.flag = true
                        } else {
                            this.msg = '下拉刷新'
                        }
                    }
                }, {passive: true})

                container.addEventListener('touchend', (event) => {

                    this.pullDownRefreshShow({
                        resreshContainerElment: touchRefreshWrapper,
                        height: 0
                    }, {
                        refreshElement: touchRefresh,
                        opacity: 0,
                        transform: 'rotate(0deg)'
                    })
                    if (this.distance === 0) {
                        return
                    }
                    // if (this.loading) {
                    //     event.preventDefault()
                    //     return
                    // }
                    if (this.flag && this.distance > 0) {
                        // touchRefreshWrapper.style.height = this.distance + 'px'
                        this.loading = true
                        this.pullDownRefreshNews().then((data) => {
                            // console.log('模拟异步查询', data)
                            this.flag = false
                            this.loading = false
                            container.scrollTop = 0
                            this.scrollTopDistance = 0
                            this.msg = data
                        })
                        return 
                    }

                    // 不是下拉刷新的情况下，不做任何处理
                    this.flag = 0
                })
            }, {passive: true})
            
        },
        components: {
            'v-TouPanel': TouPanel,
            'v-scroll': BetterScrollView,
            'v-ExposureView': ExposureView
        }
    }
</script>

<style lang="scss">
    @import '../../common/style/mixin.scss';
    @import '../../common/style/basic.scss';

    #toutiao-main {
        // background: yellowgreen;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;  //这个属性可以激活平滑滚动 ios5+
        .loading-tip {
            @include attr-px-dpr(font-size, 16px);
            @include attr-px-dpr(line-height, 48px);
            color: #999;
            text-align: center;
        }
    }
    .vue-touch-refresh {
        position: absolute;
        height: 0;
        width: 100%;
        background-color: transparent;
        .refresh-container {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            display: block;
            background-color: transparent;
            z-index: 998;
            .refresh {
                display: block;
                opacity: 0;
                border: 1px solid rgba(77,77,77,.8);
                border-radius: 50%;
                font-size: 60px;
                font-weight: 400;
                color: green;
                background-color: #fff;
                transition: all .5s ease-in-out;
            }
        }
        
    }
</style>
