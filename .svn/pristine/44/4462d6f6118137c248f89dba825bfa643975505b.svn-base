<template>
  <tabbar class="normalAnimated fadeInUp">
    <tabbar-item link="/" :selected="tabIndex==1">
      <span slot="label">首页</span>
    </tabbar-item>
    <tabbar-item link="/category" :selected="tabIndex==2">
      <span slot="label">分类</span>
    </tabbar-item>
    <tabbar-item link="/myCourse" :selected="tabIndex==3">
>
      <span slot="label">我的课程</span>
    </tabbar-item>
    <tabbar-item link="/center" :selected="tabIndex==4">
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
  import {Tabbar, TabbarItem, Group, Cell} from 'vux'
  export default {
    components: {
      Tabbar,
      TabbarItem,
      Group,
      Cell
    },
    computed: {
      tabIndex () {
        return this.$store.state.tabIndex
      }
    }
  }
</script>
