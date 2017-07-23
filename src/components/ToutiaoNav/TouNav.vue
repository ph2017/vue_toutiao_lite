<template>
    <div>
        <nav class="toutiao-nav">
            <div class="more-wrapper">
                <div class="list-shadow"></div>
                <router-link to="more" class="more-btn" active-class>
                    <span class="cross"></span>
                </router-link>
            </div> 
            <div ref="navWrapper" class="nav-wrapper">
                <ul class="nav-item-wrapper">
                    <li v-for="(item, index) in navTitle" key="index" class="nav-item" @click="handleNavClick">
                        <router-link :to="{path:item.url,query:{type:item.type}}">{{item.text}}</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    // 滑动区域效果优化的插件
    import BScroll from 'better-scroll'
    import {mapActions} from 'vuex'

    export default {
        data() {
            return {
                // 记录点击导航菜单动作时navScroll的x轴偏移， 例子：__all__:{x: 20}
                // 记录之后，方便在路由改变时，自动便宜到上次操作的位置
                scrollStatus: {}
            }
        },
        props: {
            // 导航条的栏目名称数组，必要
            navTitle: {
                type: Array,
                required: true
            }
        },
        methods: {
            // 初始化导航栏的betterScroll插件
            initNavScroll() {
                this.navScroll = new BScroll(this.$refs.navWrapper, {
                    // 结合BScroll的接口使用,是否将click事件传递,默认被拦截了
                    click: true,
                    probeType: 3,
                    scrollX: true,
                    scrollY: false
                })
            },
            getRouteQueryParam() {
                return this.$route.query.type
            },
            // 导航菜单点击处理方法
            handleNavClick() {
                let routeParam = this.getRouteQueryParam()
                
                // 记录当前导航菜单的x轴滚动偏移
                this.recordNavScrollX(routeParam)

                // 调用getNews这个action, 传入当前导航菜单参数
                this.getNews({newsType: routeParam})
            },
            // 记录当前导航菜单x轴偏移的方法，在点击导航菜单时调用
            recordNavScrollX(newsType) {
                // this.navScroll.x 可以获取betterScroll插件的x轴偏移量
                let scrollX = this.navScroll.x
                let scrollStatus = this.scrollStatus

                if (scrollStatus[newsType]) {
                    // this.scrollStatus中存在newsType对象的话，则修改
                    this.$set(scrollStatus[newsType], 'x', scrollX)
                } else {
                    // 否则添加
                    this.$set(scrollStatus, newsType, {x: scrollX})
                }
            },
            // 从this.scrollStatus缓存中查询导航菜单的x轴偏移量
            getRecordNavScrollX(newsType) {
                let scrollObj = this.scrollStatus[newsType]
                if (scrollObj) {
                    return scrollObj.x
                } else {
                    return 0
                }
            },
            // betterScroll根据参数，自动滚动到对应位置
            autoScrollTo(betterScroll, x = 0, y = 0) {
                if (betterScroll) {
                    betterScroll.scrollTo(x, y, 500)
                }
            },
            ...mapActions([
                // 映射 this.getNews() 为 this.$store.dispatch('getNews')
                'getNews' 
            ])
        },
        watch: {
            '$route': function() {
                let routeParam = this.getRouteQueryParam()
                let scrollX = this.getRecordNavScrollX(routeParam)
                this.autoScrollTo(this.navScroll, scrollX, 0)
            }
        },
        computed: {
            
        },
        mounted() {
            this.$nextTick(() => {
                this.initNavScroll()
                let ul = document.querySelector('.nav-item-wrapper')
                console.log('ul = ' + ul)
            })
        },
        destroyed() {
            // 组件销毁时，解除betterScroll的绑定关系
            this.navScroll.destroy()
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../common/style/basic.scss';
    @import '../../common/style/mixin.scss';

    .toutiao-nav {
        background-color: $nav-grey;
        .nav-wrapper{
            width: 90%;
            box-sizing: border-box;
            position: relative;
            @include attr-px-dpr(height, 36px);
            white-space: nowrap;
            overflow: hidden;
            &:after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 1px;
                background-image: -webkit-linear-gradient(top,transparent,transparent 40%,#ddd 0);
                background-size: 100% 1px;
                background-position: bottom;
                background-repeat: no-repeat;
            }
            .nav-item-wrapper {
                position: absolute;
                white-space: nowrap;
                overflow: hidden;
                overflow-x: scroll;
                -webkit-overflow-scrolling: touch;
                &::-webkit-scrollbar {
                    // 移动端滚动条隐藏
                    display: none;
                }
                .nav-item{
                    display: inline-block;
                    >a{
                        display: inline-block;
                        @include attr-px-dpr(height, 26px);
                        @include attr-px-dpr(margin-top, 5px);
                        @include attr-px-dpr(margin-bottom, 5px);
                        @include attr-px-dpr(margin-left, 5px);
                        @include attr-px-dpr(padding-left, 10px);
                        @include attr-px-dpr(padding-right, 10px);
                        @include attr-px-dpr(font-size, 17px);
                        @include attr-px-dpr(line-height, 26px);
                        color: $nav-text-color;
                        white-space: nowrap;
                        -webkit-tap-highlight-color: rgba(0,0,0,.3);
                        &.router-link-active {
                            color: $nav-text-active-color;
                        }
                    }
                }
            }
        }
        .more-wrapper {
            position: absolute;
            right: 0;
            background-color:$nav-grey;
            opacity: 1;
            z-index: 2;
            .list-shadow {
                position: absolute;
                @include attr-px-dpr(left, -10px);
                @include attr-px-dpr(height, 35px);
                @include attr-px-dpr(width, 10px);
                background: url('./images/shadow.png') no-repeat center;
                background-size: contain;
            }
            .more-btn {
                position: relative;
                display: block;
                @include attr-px-dpr(height, 35px);
                @include attr-px-dpr(width, 40px);
                @include attr-px-dpr(line-height, 36px);
                .cross {
                    position: absolute;
                    display: block;
                    @include attr-px-dpr(height, 17px);
                    @include attr-px-dpr(width, 17px);
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
                .cross:before,
                .cross:after{
                    content: ' ';
                    position: absolute;
                    @include attr-px-dpr(height, 17px);
                    width: 4px;
                    background-color: #f85959;
                    opacity: .8;
                }
                .cross:before {
                    left: 50%;
                    transform: rotate(90deg) translate(0px, 2px);
                }
                .cross:after {
                    left: 50%;
                    transform: translate(-50%, 0);
                }
            }
        }
    }
</style>
