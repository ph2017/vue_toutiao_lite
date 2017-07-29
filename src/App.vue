<template>
  <div id="app">
    <keep-alive include="ToutiaoHome" exclude="ToutiaoDetail">
      <router-view v-cloak></router-view>
    </keep-alive> 
   <!--<header class="toutiao-header">
      <v-TouHeader></v-TouHeader>
      <v-TouNav v-bind:nav-title="navTitle"></v-TouNav>
   </header>
   <main class="toutiao-main">
      <v-TouMain></v-TouMain>
   </main>-->
   
  </div>
</template>

<script>
// import {mapState} from 'vuex'
import store from './store/index.js'
// import ToutiaoHome from '@/views/ToutiaoHome/ToutiaoHome'

export default {
  name: 'app',
  store,
  computed: {
    navTitle() {
      return this.$store.state.navTitle
    }
  },
  components: {
    // ToutiaoHome
  }
}
</script>

<style lang="scss">
  @import './common/style/mixin.scss';
  
  #app {
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
