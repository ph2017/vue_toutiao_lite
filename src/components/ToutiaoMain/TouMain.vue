/**
* 头条的主体内容组件
*/
<template>
    <div id="toutiao-main">
        <v-TouPanel v-for="(item, index) in news" :key="index" :newsItem="item"></v-TouPanel>
    </div>
</template>

<script>
    import TouPanel from 'components/ToutiaoPanel/TouPanel'
    import store from '../../store/index.js'

    export default {
        name: 'TouMain',
        store,
        components: {
            'v-TouPanel': TouPanel
        },
        computed: {
            news() {
                return this.$store.state.newsArray.__all__.news
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    #toutiao-main {
        color: green;
    }
</style>
