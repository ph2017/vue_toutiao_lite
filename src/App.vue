<template>
  <div id="app">
   <header>
      <v-TouHeader></v-TouHeader>
   </header>
   <v-TouNav v-bind:nav-title="navTitle"></v-TouNav>
   <main>
      <v-TouMain></v-TouMain>
   </main>
   
  </div>
</template>

<script>
// import {mapState} from 'vuex'
import TouHeader from 'components/ToutiaoHeader/TouHeader'
import TouMain from 'components/ToutiaoMain/TouMain'
import TouNav from 'components/ToutiaoNav/TouNav'
import store from './store/index.js'

export default {
  name: 'app',
  store,
  computed: {
    navTitle() {
      return this.$store.state.navTitle
    }
  },
  components: {
    // 头条的头部
    'v-TouHeader': TouHeader,
    'v-TouMain': TouMain,
    'v-TouNav': TouNav
  }
}
</script>

<style>

</style>
