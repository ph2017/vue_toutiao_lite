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
                    <li v-for="(item, index) in navTitle" key="index" class="nav-item">
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

    export default {
        props: {
            // 导航条的栏目名称数组，必要
            navTitle: {
                type: Array,
                required: true
            }
        },
        methods: {
            initNavScroll() {
                this.navScroll = new BScroll(this.$refs.navWrapper, {
                    // 结合BScroll的接口使用,是否将click事件传递,默认被拦截了
                    click: true,
                    probeType: 3,
                    scrollX: true,
                    scrollY: false
                });
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initNavScroll()
                let ul = document.querySelector('.nav-item-wrapper')
                console.log('ul = ' + ul)
            })
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../common/style/basic.scss';
    @import '../../common/style/mixin.scss';

    .toutiao-nav {
        background-color: $nav-grey;
        .nav-wrapper{
            width: 100%;
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
