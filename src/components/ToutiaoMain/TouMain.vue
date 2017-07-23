/**
* 头条的主体内容组件
*/
<template>
    <div id="toutiao-main">
        <v-TouPanel></v-TouPanel>
    </div>
</template>

<script>
    import TouPanel from 'components/ToutiaoPanel/TouPanel'

    export default {
        components: {
            'v-TouPanel': TouPanel
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    #toutiao-main {
        color: green;
    }
</style>
