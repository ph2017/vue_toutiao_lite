<template>
    <nav class="toutiao-nav">
        <div class="more-wrapper">
            <div class="list-shadow"></div>
            <router-link to="more" class="more-btn" active-class>
                <span class="cross"></span>
            </router-link>
        </div>
        <ol class="nav-item-wrapper">
            <li v-for="(item, index) in navTitle" key="index" class="nav-item">
                <router-link :to="{path:item.url,query:{type:item.type}}">{{item.text}}</router-link>
            </li>
        </ol>
        
    </nav>
</template>

<script>
    export default {
        props: {
            // 导航条的栏目名称数组，必要
            navTitle: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../common/style/basic.scss';
    @import '../../common/style/mixin.scss';

    .toutiao-nav {
        background-color: $nav-grey;
        .nav-item-wrapper {
            display: flex;
            flex-direction: row;
            flex-wrap: no-wrap;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            overflow: hidden;
            overflow-x: scroll;
            white-space: nowrap;
            .nav-item{
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
                    &.router-link-active {
                        color: $nav-text-active-color;
                    }
                }
            }
        }
        .more-wrapper {
            float: right;
            position: relative;
            .list-shadow {
                position: absolute;
                @include attr-px-dpr(left, -10px);
                @include attr-px-dpr(height, 36px);
                @include attr-px-dpr(width, 10px);
                background: url('./images/shadow.png') no-repeat center;
                background-size: contain;
            }
            .more-btn {
                position: relative;
                display: block;
                @include attr-px-dpr(height, 36px);
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
