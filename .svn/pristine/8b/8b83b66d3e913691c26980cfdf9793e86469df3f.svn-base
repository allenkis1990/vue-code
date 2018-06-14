<template>
  <div id="app" class="container" style="height:100%">
    <loading :show="isLoading" :text="text"></loading>
    <transition name="router" appear>
      <keep-alive>
        <router-view class="animated" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router" appear>
        <router-view class="animated" v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<style lang="less">
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';
  @import "../design/styles/webstyle.less";

  #app {
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }

</style>
<script>
  import { XHeader, Loading } from 'vux'

  export default {
    components: {
      XHeader,
      Loading
    },
    data () {
      return {
        show6: false
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.loadInfo.isLoading
      },
      text () {
        return this.$store.state.loadInfo.text
      },
      appInfo () {
        return this.$store.state.appInfo
      }
    },
    created () {
      console.mainPage = this
    },
    mounted () {
      window.addEventListener('popstate', function (e) {
      }, false)
    },
    methods: {}
  }

</script>
