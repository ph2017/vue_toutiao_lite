/**
* 头条的主体内容组件
*/
<template>
    <div>
        <div ref="touchRefreshWrapper" class="vue-touch-refresh">
            <span class="refresh-container">
                <span ref="touchRefresh" class="refresh"><i class="icon icon-refresh"></i></span>
            </span>{{this.msg}}
        </div>
        
        <div ref="toutiaoMain" id="toutiao-main">
            <v-TouPanel v-for="(item, index) in getNewsByType" :key="index" :newsItem="item"></v-TouPanel>
            <div class="loading-tip">
                加载中...
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import store from '../../store/index.js'
    import TouPanel from 'components/ToutiaoPanel/TouPanel'
    import BetterScrollView from 'components/BetterScrollView/BetterScrollView'

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
                scrollTopDistance: 0    // 记录控件的滑动距离
            }
        },
        methods: {            
            /**
             * 加载新闻数据的方法
             */
            loadData() {
                console.log('我是loadData')
            },
            initScrollListener() {
                // window.addEventListener('scroll', this.scrollHandler)
                (this.$refs.toutiaoMain).addEventListener('scroll', this.scrollHandler)
            },
            scrollHandler(event) {
                // console.log('scrollHandler event = ', event)
                // let scrollTop = window.document.body.scrollTop
                let scrollTop = (this.$refs.toutiaoMain).scrollTop
                this.scrollTopDistance = scrollTop
                console.log('scrollTop = ' + scrollTop)
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
            getRouteQueryParam() {
                // 初次加载时，$route为undefined, 
                let type = this.$route.query.type
                // 默认取$store.state.defaultType作为查询参数
                if (!type) {
                    type = this.$store.state.defaultType
                }
                return type
            },
            // 模拟加载数据
            next() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve('i am the data')
                    }, 2000)
                })
            },
            ...mapActions([
                // 映射 this.getNews() 为 this.$store.dispatch('getNews')
                'getNews' 
            ])
        },
        computed: {
            getNewsByType() {
                const newsType = this.getRouteQueryParam()
                return this.$store.state.newsArray[newsType].news
            }
        },
        // watch: {
        //     getNewsByType(val) {
        //         this.news = val
        //     }
        // },
        // mounted() {
        //     let newsType = this.$route.query.type
        //     debugger
        //     this.news = this.$store.state.newsArray[newsType].news
        // },
        created() {
            // 组件created时， 调用action，根据路由查询新闻
            const param = this.getRouteQueryParam()
            this.getNews({newsType: param});

            this.$nextTick(() => {
                const container = this.$refs.toutiaoMain
                const touchRefreshWrapper = this.$refs.touchRefreshWrapper
                const touchRefresh = this.$refs.touchRefresh
                container.style.height = window.innerHeight + 'px'
                this.initScrollListener()

                container.addEventListener('touchstart', (event) => {

                    // 如果此时loading = true,表示刷新正在进行，此时阻止下拉操作，返回
                    if (this.loading) {
                        event.preventDefault()
                        return
                    }
                    // 记录第一个触摸点作为起始位置
                    this.touchStart = event.targetTouches[0].clientY
                    console.log('touchStart point', this.touchStart)
                })

                container.addEventListener('touchmove', (event) => {

                    // 没有起始位置的话，返回
                    if (!this.touchStart) {
                        return
                    }
                    // 如果此时loading = true,表示刷新正在进行，此时阻止下拉操作，返回
                    if (this.loading) {
                        event.preventDefault()
                        return
                    }

                    const touch = event.targetTouches[0]
                    const distanceY = touch.clientY
                    this.distance = distanceY - this.touchStart
                    // console.log('touchMove touch = ', touch.clientY)

                    // 最大下拉刷新的下拉距离
                    let maxDistanceY = 160
                    if (this.distance <= maxDistanceY && this.scrollTopDistance === 0) {

                        // 计算旋转角度
                        let rotageDeg = -(this.distance / maxDistanceY) * 360 + 'deg'
                        console.log('rotageDer = ' + rotageDeg)

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
                })

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
                    if (this.loading) {
                        event.preventDefault()
                        return
                    }
                    if (this.flag && this.distance > 0) {
                        // touchRefreshWrapper.style.height = this.distance + 'px'
                        this.loading = true
                        this.next().then((data) => {
                            console.log('模拟异步查询', data)
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
            })
            
        },
        components: {
            'v-TouPanel': TouPanel,
            'v-scroll': BetterScrollView
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../common/style/mixin.scss';
    @import '../../common/style/basic.scss';

    #toutiao-main {
        // background: yellowgreen;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;  //这个属性可以激活平滑滚动 ios5+
    }
    .vue-touch-refresh {
        position: absolute;
        height: 0;
        width: 100%;
        background-color: transparent;
        transition: all .5s ease-in-out;
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
