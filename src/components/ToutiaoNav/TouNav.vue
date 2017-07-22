<template>
    <nav>
        <ol v-for="(item, index) in navTitle">
            <li key="index">
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

</style>
