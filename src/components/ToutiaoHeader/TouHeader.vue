/**
* 头条的头部组件
*/
<template >
    <div id="toutiao-header">
       <div class="position_l">
        <a href="#" class="message-box"></a>
       </div>
       <div class="position_m">
        <a href="#" class="logo"></a>
        <a href="#" class="refresh"></a>
       </div>
       <div class="position_r">
        <a href="#" class="search"></a>
       </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style lang="scss" rel="stylesheet/scss">
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
    }
</style>