<template>
  <div class="toutiao-home">
   <header class="toutiao-header">
      <v-TouHeader></v-TouHeader>
      <v-TouNav v-bind:nav-title="navTitle"></v-TouNav>
   </header>
   <main class="toutiao-main">
      <v-TouMain></v-TouMain>
   </main>
  </div>
</template>

<script>
import TouHeader from 'components/ToutiaoHeader/TouHeader'
import TouMain from 'components/ToutiaoMain/TouMain'
import TouNav from 'components/ToutiaoNav/TouNav'

export default {
  name: 'ToutiaoHome',
  computed: {
    navTitle() {
      return this.$store.state.navTitle
    }
  },
  components: {
    // 头条的头部
    'v-TouHeader': TouHeader,
    // 头条的中间内容部分
    'v-TouMain': TouMain,
    // 导航
    'v-TouNav': TouNav
  }
}
</script>

<style lang="scss">
  @import '../../common/style/mixin.scss';
  
  .toutiao-home {
    .toutiao-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 999;
    }
    .toutiao-main {
      position: relative;
      @include attr-px-dpr(margin-top, 80px);
    }
  }
</style>
