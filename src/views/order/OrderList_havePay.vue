<template>
  <div>
    <scroller lock-x scrollbar-y :height="scrollerHeight" use-pulldown use-pullup @on-pullup-loading="loadMoreData"
              @on-pulldown-loading="refreshData" v-model="scroller" ref="scroller">
      <div>
        <div class="hb-wrap-box" v-if="items.length === 0">
          <div class="no-data-box">
            <img class="no-data-img" src="../../../design/images/no-data-img.png" alt=" ">
            <p class="no-data-txt">暂时还没有数据~</p>
          </div>
        </div>
        <order-list-cell v-for="item in items" :item="item" :key="item.orderNo" @on-cellClick="cellClickAction" @on-changeClassRecord="changeClassRecordAction" @on-relevanceOrder="relevanceOrderAction" @on-seeRefund="seeRefundAction"></order-list-cell>
      </div>
      <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down"
           style="position: absolute; width: 100%; height: 40px; line-height: 40px; top: -60px; text-align: center;">
        <span v-show="scroller.pulldownStatus === 'default'"></span>
        <span class="pulldown-arrow" v-show="scroller.pulldownStatus === 'down' || scroller.pulldownStatus==='up'" :class="{'rotate': scroller.pulldownStatus === 'up'}" style="font-size: 16px;font-weight: bold;">↓</span>
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
        <span v-show="scroller.pullupStatus === 'default'"></span>
        <span class="pullup-arrow" v-show="scroller.pullupStatus === 'default' || scroller.pullupStatus === 'up' || scroller.pullupStatus === 'down'" :class="{'rotate': scroller.pullupStatus === 'down'}">↑</span>
        <span v-show="scroller.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span> <span v-show="scroller.pullupStatus === 'loading'" class="il-text">
              数据加载中...
            </span>
      </div>
    </scroller>
  </div>
</template>
<style lang="less">
</style>
<script>
  import OrderListCell from './orderListCell.vue'
  import {Scroller, LoadMore, InlineLoading, Spinner} from 'vux'
  import * as storeTypes from '../../store/types'
  export default{
    name: 'order-list-havepayed',
    components: {OrderListCell, Scroller, LoadMore, InlineLoading, Spinner},
    data () {
      return {
        scroller: {
          pullupStatus: 'disabled',
          pulldownStatus: 'default'
        },
        currentPage: 0,
        recordPage: 0,
        loadingStatus: 'refresh',
        isLoadingData: false,
        scrollerHeight: '',
        items: [],
        unCompleteOrderList: [], // 未完善订单列表
        isFirstLoadData: true
      }
    },
    methods: {
      // ========================获取列表数据===========================
      getHavePayedListData () {
        if (this.isLoadingData) {
          return
        }
        let params = {
          pageNo: this.currentPage,
          pageSize: 10,
          orderStatus: 'HAVE_PAID',
          propertyQueries: []
        }
        this.$store.dispatch(storeTypes.ORDER_GET_ORDERLIST, params).then((data) => {
          if (this.isFirstLoadData) {
            this.hideLoading()
          }
          this.isFirstLoadData = false
          // 停止刷新状态
          if (this.loadingStatus === 'refresh') {
            if (this.$refs.scroller !== undefined) {
              this.$refs.scroller.donePulldown()
            }
          } else if (this.loadingStatus === 'loadMore') {
            if (this.$refs.scroller !== undefined) {
              this.$refs.scroller.donePullup()
            }
          }
          if (data.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
            this.toast(data.head.message)
            // 加载失败时
            if (this.loadingStatus === 'refresh') {
              this.currentPage = this.recordPage
            }
          } else {
            // 加载成功
            this.items = this.$store.getters.orderList.havePayedList
            // 取到未完善订单列表
            this.unCompleteOrderList = this.$store.state.orderModule.needCompleteOrderList
            // 修改数据完善状态
            this.resetUncompletePrama(this.items)
            if (data.data.currentPageData.length >= 10) {
              if (this.$refs.scroller !== undefined) {
                this.$refs.scroller.enablePullup()
              }
            } else {
              if (this.$refs.scroller !== undefined) {
                this.$refs.scroller.disablePullup()
              }
            }
            this.recordPage = this.currentPage
            this.currentPage++
          }
        }).catch(e => {
          console.log('>>' + e)
          this.isLoadingData = false
          if (this.loadingStatus === 'refresh') {
            this.$refs.scroller.donePulldown()
            this.currentPage = this.recordPage
          } else if (this.loadingStatus === 'loadMore') {
            this.$refs.scroller.donePullup()
          }
        })
      },
      // ========================按钮事件===========================
      loadMoreData () {
        this.loadingStatus = 'loadMore'
        this.getHavePayedListData()
      },
      refreshData () {
        this.currentPage = 0
        this.loadingStatus = 'refresh'
        this.getHavePayedListData()
      },
      resetScroller () {
        this.$refs.scroller.reset({top: 0})
      },
      /**
       * 关联订单
       */
      relevanceOrderAction (item) {
        let param = {
          orderNo: item.orderNo,
          type: 'ASSOCIATEORDER'
        }
        this.push({path: '/trainingChangeLog', query: param})
      },
      /**
       * 完善用户信息
       */
      completeDistributionInfoAction (item) {
        this.$store.commit(storeTypes.ORDER_SET_NEED_COMPLETE_ORDER_LIST, [item.orderNo])
        this.$store.commit(storeTypes.COMPLETE_ORDER_NEED_INVOICE, false)
        this.push({
          path: '/completeOrder',
          query: {path: this.$route.path, completeOneOrAll: true}
        })
      },
      /**
       * cell点击事件，跳转详情页
       */
      cellClickAction (item) {
        let param = {
          orderNo: item.orderNo
        }
        this.push({path: '/orderDetail', query: param})
      },
      // 查看退款和查看换班记录是挂在子订单上的！！！！
      /**
       * 查看退款
       */
      seeRefundAction (item) {
        // 退款记录 主订单的id
        let param = {
          orderNo: item.orderNo
        }
        this.push({path: '/refundLog', query: param})
      },
      /**
       * 查看换班记录
       */
      changeClassRecordAction (item) {
        // 换班记录 主订单的id
        let param = {
          orderNo: item.subOrderNo,
          type: 'SWAPORDER'
        }
        this.push({path: '/trainingChangeLog', query: param})
      },
      // 修改订单的完善和未完善状态
      resetUncompletePrama (array) {
        // debugger
        // 初始化deleiverInfoComplete属性
        for (let item in array) {
          let currentItem = array[item]
          currentItem.deleiverInfoComplete = true
        }
        // 修改deleiverInfoComplete属性
        for (let item in array) {
          let currentItem = array[item]
          if (this.checkIsUnComlteOrder(currentItem.orderNo)) {
            currentItem.deleiverInfoComplete = false
          }
        }
      },
      // 检测是否已经完善
      checkIsUnComlteOrder (orderNo) {
        for (let key in this.unCompleteOrderList) {
          let order = this.unCompleteOrderList[key]
          if (order === orderNo) {
            return true
          }
        }
        return false
      }
    },
    // ========================生命周期钩子===========================
    mounted () {
      this.getHavePayedListData()
      let self = this
      setTimeout(function () {
        if (self.$refs.scroller !== undefined) {
          self.$refs.scroller.disablePullup()
        }
      }, 300)
      this.showLoading('数据加载中...')
      this.scrollerHeight = ((window.outerHeight - 90) || (window.innerHeight - 90)) + 'px'
    },
    created () {
      console.log('havePayed created')
    },
    activated () {
      console.log('havePayed activated')
    },
    deactivated () {
      console.log('havePayed deactivated')
    },
    beforeDestroy () {
      console.log('havePayed beforeDestroy')
    }
  }
</script>

