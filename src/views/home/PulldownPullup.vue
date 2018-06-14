<template>
  <div class="container">
    <div class="hb-header-box">
      <div class="header-left" @click="drawerVisibilityEvent">
        <a href="javascript:void(0);" class="hb-ico ico-menu"></a>
      </div>
      <div class="header-tit">四川建设继教</div>
      <div class="header-right" @click="rightEvent">
        <a href="javascript:void(0);" class="header-txt">登录/注册</a>
      </div>
    </div>
    <!--年度选择-->
    <!--/年度选择-->
    <div class="hb-year-box">
      <div class="year-tit">年度</div>
      <scroller class="year-bd" lock-y scrollbar-x :bounce=false :scrollbar-x=false>
        <tab :style="tabStyle" bar-active-color="#668599" :line-width="2" :custom-bar-width="getBarWidth">
          <tab-item v-for="(item,index) :key="index" in yearList" :selected="index === 0" @click.native="tabItemEvent(item)">
            {{item.skuPropertyValueName}}
          </tab-item>
        </tab>
      </scroller>
    </div>
    <!--/年度选择-->
    <!--班级列表-->
    <scroller
      style="padding-top: 87px; box-sizing: border-box;"
      :height="scrollerHeight"
      lock-x
      scrollbar-y
      use-pulldown
      @on-pullup-loading="loadData"
      @on-pulldown-loading="refreshData" v-model="scroller" ref="scroller1">
      <div class="weui-panel weui-panel_access hb-panel">
        <div class="weui-panel__bd" v-for="(item,index) in classList" :key="index" @click="goClassDetail">
          <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" src="../../../design/images/course-img.jpg">
              <span class="label">{{classState}}</span>
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.trainingClassName}}</h4>
              <p class="weui-media-box__desc">年度：{{skuPropertyValue(index, '年度')}}年</p>
              <p class="weui-media-box__desc">
                类别：{{skuPropertyValue(index, '培训类别')}}</p>
              <p class="weui-media-box__desc">学时：{{item.period}}</p>
            </div>
          </a>
        </div>
      </div>
      <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down"
           style="position: absolute; width: 100%; height: 40px; line-height: 40px; top: -60px; text-align: center;">
        <span v-show="scroller.pulldownStatus === 'default'"></span>
        <span class="pulldown-arrow" v-show="scroller.pulldownStatus === 'down' || scroller.pulldownStatus==='up'"
              :class="{'rotate': scroller.pulldownStatus === 'up'}"
              style="font-size: 16px;font-weight: bold;">↓</span>
        <div v-show="scroller.pulldownStatus === 'loading'">
          <p class="inloading">
            <inline-loading></inline-loading>
            <span class="il-text">
              刷新中...
              </span>
          </p>
        </div>
      </div>
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
           style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
        <load-more :show-loading="false" v-if="!noMore && scroller.pullupStatus === 'default'" :tip="'上拉加载更多'"
                   background-color="#F4F4F4"></load-more>
        <span class="pullup-arrow"
              v-show="(scroller.pullupStatus === 'up'||scroller.pullupStatus === 'down') && !noMore"
              :class="{'rotate':scroller.pullupStatus === 'down'}"
              style="font-size: 16px;font-weight: bold;">↑</span>
        <div v-show="scroller.pullupStatus === 'loading'">
          <p class="inloading">
            <inline-loading></inline-loading>
            <span class="il-text">
      加载中...
      </span>
          </p>
        </div>
      </div>
    </scroller>
    <!--/班级列表-->

    <!--返回顶部-->
    <a href="javascript:void(0);" class="hb-go-top" @click="goTopEvent">
      <img src="../../../design/images/icon-top.png">
    </a>
    <!--/返回顶部-->
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
  @import "../../../design/styles/webstyle.less";
</style>

<script>
  import { Tab, TabItem, Scroller, Spinner, LoadMore, InlineLoading } from 'vux'
  import * as storeTypes from '../../store/types'

  export default {
    components: {
      Tab,
      TabItem,
      Scroller,
      Spinner,
      LoadMore,
      InlineLoading
    },
    mounted () {
      this.scrollerHeight = (window.outerHeight || window.innerHeight) + 'px'
      this.$store.dispatch(storeTypes.CLASS_YEARS_REQUEST)
      this.$store.dispatch(storeTypes.CLASS_MYLIST_REQUEST, '2017')
    },
    data () {
      return {
        scrollerHeight: '',
        scroller: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
        tabItem: {
          height: 40,
          width: 80,
          barWidth: 20
        },
        noMore: false
      }
    },
    computed: {
      /**
       * 年度tab的样式
       * @returns {{width: string, height: string, disabled: string}}
       */
      tabStyle () {
        return {
          width: this.yearList.length * this.tabItem.width + 'px',
          height: this.tabItem.height + 'px',
          disabled: '#FFFFFF'
        }
      },
      /**
       * 年份数据
       * @returns {*}
       */
      yearList () {
        if (this.$store.state.classModule.yearList === undefined || this.$store.state.classModule.yearList === '') {
          return []
        }
        return this.$store.state.classModule.yearList
      },
      /**
       * 班级数据
       * @returns {*}
       */
      classList () {
        let classList = this.$store.state.classModule.myTrainingList
        if (classList === undefined || classList === null) {
          return []
        }
        return classList
      },
      classState (trainingItemStatus) {
        if (trainingItemStatus === 0) {
          return ''
        } else if (trainingItemStatus === 1) {
          return '退班中'
        } else if (trainingItemStatus === 2) {
          return '失效'
        }
      }
    },
    methods: {
      /**
       * 上拉刷新
       */
      refreshData () {
        setTimeout(() => {
          this.$refs.scroller1.donePulldown()
        }, 1000)
      },
      /**
       * 下拉加载
       */
      loadData () {
        setTimeout(() => {
          this.$refs.scroller1.donePullup()
        }, 2000)
      },
      /**
       * 年度tab的宽度
       * @returns {string}
       */
      getBarWidth () {
        return this.tabItem.barWidth + 'px'
      },
      /**
       * 是否显示菜单 点击事件
       */
      drawerVisibilityEvent () {
        this.$store.commit(storeTypes.GLOBAL_SET_DRAWER, true)
      },
      /**
       * 年度tab   点击事件
       * @param item
       */
      tabItemEvent (item) {
        this.$store.commit(storeTypes.CLASS_LIST_SEARCH_PROPERTY, item)
        this.$store.dispatch(storeTypes.CLASS_MYLIST_REQUEST, item.skuPropertyValueId)
      },
      /**
       * 滚动顶部  点击事件
       */
      goTopEvent () {
        this.$refs.scroller1.reset({top: 0})
      },
      /**
       * 标题栏的右侧  点击事件
       */
      rightEvent () {
        this.$router.push('/login')
      },
      /**
       * 班级列表的item  点击事件
       */
      goClassDetail () {
        this.$router.push('/classDetail')
      },
      skuPropertyValue (index, property) {
        let classList = this.$store.state.classModule.myTrainingList
        if (classList.length <= 0) {
          return ''
        }
        let skuPropertyNameList = classList[index].skuPropertyNameList
        for (let i = 0; i < skuPropertyNameList.length; i++) {
          if (skuPropertyNameList[i].skuPropertyName === property) {
            return skuPropertyNameList[i].skuPropertyValueName
          }
        }
        return ''
      }
    }
  }
</script>
