<template>
  <div id="app">
   <header>
      <v-TouHeader></v-TouHeader>
   </header>
   <main>
      <v-TouMain></v-TouMain>
   </main>
  </div>
</template>

<script>
import TouHeader from 'components/ToutiaoHeader/TouHeader'
import TouMain from 'components/ToutiaoMain/TouMain'

export default {
  name: 'app',
  components: {
    // 头条的头部
    'v-TouHeader': TouHeader,
    'v-TouMain': TouMain
  }
}
</script>

<style>

</style>
