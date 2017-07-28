/**
* 头条的头部组件
*/
<template >
    <div id="toutiao-header">
       <div class="position_l">
        <a href="#" class="message-box"></a>
       </div>
       <div class="position_m" @click="handleRefreshClick">
        <a href="javascript:void(0)" class="logo"></a>
         <!--点击刷新按钮有旋转动画-->
        <a href="javascript:void(0)" :class="isFetchingNews? 'rotage-animate refresh' : 'refresh'"></a>
       </div>
       <div class="position_r">
        <a href="#" class="search"></a>
       </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import store from '../../store/index.js'
    // import Velocity from 'velocity-animate'

    export default {
        name: 'TouHeader',
        store,
        data() {
            return {
                // 新闻容器的选择器
                newsContainerEl: '#toutiao-main'
            }
        },
        methods: {
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
            handleRefreshClick(event) {
                // event.preventDefault()
                // let refreshBtn = document.querySelector('.position_m>.refresh')
                // Velocity(refreshBtn, {
                //     rotateZ: '360deg'
                // }, {duration: 500,
                //     complete: function(){
                //         // 旋转动画完成后，马上复位rotateZ
                //         Velocity(refreshBtn, {rotateZ: '0deg'}, {duration: 0})
                //     }
                // })

                // newsContainer回滚到顶部
                const newsContainer = document.querySelector(this.newsContainerEl)
                if (newsContainer) {
                    newsContainer.scrollTop = 0
                }

                const type = this.getRouteQueryParam()
                this.refreshNews({newsType: type})
            },
            ...mapActions([
                'refreshNews'
            ])
        },
        computed: {
            isFetchingNews() {
                const newsType = this.getRouteQueryParam()
                return this.$store.state.newsArray[newsType].isFetching
            }
        }
    }
</script>

<style lang="scss">
    @import '../../common/style/basic.scss';
    @import '../../common/style/mixin.scss';

    #toutiao-header {
        display: flex;
        flex-direction: row;
        flex-wrap: no-wrap;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        @include attr-px-dpr(height, 44px);
        background-color: $theme-color;
        .position_l {
            >.message-box {
                display: block;
                background: url('./images/feed_ic_message_normal@3x.png') no-repeat center;
                background-size: contain;
                @include attr-px-dpr(height, 25px);
                @include attr-px-dpr(width, 32px);
                @include attr-px-dpr(margin-left, 12px);
            }
        }
        .position_m {
            flex-grow: 1;
            font-size: 0;
            >.logo {
                display: inline-block;
                background: url('./images/wap_logo@3x.png') no-repeat center;
                background-size: contain;
                @include attr-px-dpr(height, 44px);
                @include attr-px-dpr(width, 83px);
            }
            >.refresh {
                display: inline-block;
                background: url('./images/titlebar_refresh_small@3x.png') no-repeat center;
                @include attr-px-dpr(background-size, 15px);
                @include attr-px-dpr(height, 44px);
                @include attr-px-dpr(width, 25px);
            }
            .rotage-animate {
                animation: rotage360 1s linear infinite;
            }
            @keyframes rotage360 {
                0% {
                    transform: rotate(0);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        }
        .position_r {
            >.search {
                display: block;
                background: url('./images/feed_ic_search_normal@3x.png') no-repeat center;
                background-size: contain;
                @include attr-px-dpr(height, 24px);
                @include attr-px-dpr(width, 24px);
                @include attr-px-dpr(margin-right, 12px);
            }
        }
        // .rotate {
        //     transform: rotateZ(360deg);
        // }
    }
    // .rotate-enter-active, .rotate-leave-active {
    //     transition: all .5s linear;
    // }
    // .rotate-enter, .rotate-leave-to  {
    //     transfrom: rotateZ(0deg);
    // }
</style>