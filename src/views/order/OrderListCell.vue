<template>
  <div class="weui-panel hb-panel bor-b20" @click="cellClickAction">
    <!-- <div class="order-info-box" style="border-bottom: 1px solid #e8e8e8;border-top: 1px solid #e8e8e8;">
      <div>{{item.unitName}}</div>
    </div> -->
    <div class="weui-cell weui-cell_access">
      <div class="weui-cell__bd">
        <div class="to c6 fs28"><span class="label-company">机构</span>{{item.unitName}}</div>
      </div>
      <div class="weui-cell__ft"></div>
    </div>
    <div class="order-info-box">
      <div>{{item.createTime}}</div>
      <div class="tr-2">订单号：{{item.orderNo}}</div>
    </div>
    <order-list-sub-cell v-for="subItem in item.subOrderShow" :key="subItem.subOrderNo" :subOrderLen="item.subOrderList.length" :subItem="subItem" :channel="item.channel" :overThree="item.overThree" @on-subSeeRefund="seeRefundAction(subItem)"  @on-subChangeClassRecord="changeClassRecordAction(subItem)" ></order-list-sub-cell>
    <!-- <order-list-sub-cell v-if="item.subOrderList.length > 3" :subItem="item.subOrderList[0]" :overThree="true"></order-list-sub-cell> -->
    <!-- <div class="show-more" v-if="item.subOrderList.length > 3" @click="goMoreSubOrderList(item.subOrderList, $event)">查看更多培训内容 ></div> -->
    <div class="weui-cells" style="margin-top:0" v-if="item.overThree" @click="toggleExpand($event)">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd"></div>
        <div class="weui-cell__ft weui-cell__ft-1" v-show="!item.expand">查看更多培训内容</div>
        <div class="weui-cell__ft weui-cell__ft-2" v-show="item.expand">收起</div>
      </div>
    </div>
    <div class="order-info-box bor-t">
      <div>订单状态：<span class="ci">{{getOrderStatusText()}}</span></div>
      <div>{{getTotalPriceText()}}<span class="ml10 ci fs32">¥ {{item.totalAmount}}</span></div>
    </div>
    <div class="weui-panel__op bor-t" ref="bottomBar" v-if="isShowBottomBar()" style="padding-top:10px;border-bottom: 1px solid #e8e8e8">
      <div class="hb-btn-s" @click="buttonAction('seeRefund', $event)" v-if="isShowSeeRefundButtton(this.item)">查看退款</div>
      <div class="hb-btn-s" @click="buttonAction('changeClassRecord', $event)" v-if="isShowChangeClassRecordButton(this.item)">换班记录</div>
      <div class="hb-btn-s" @click="buttonAction('relevanceOrder', $event)" v-if="isShowRelevanceOrder(this.item)">关联订单</div>
      <div class="hb-btn-s" @click="buttonAction('cancelOrder', $event)" v-if="isShowCancelOrderButton(this.item) && item.tradeChannel !== 'COLLECTIVE' && item.tradeChannel !== 'PRESENT'">取消订单</div>
      <div class="hb-btn-s current" @click="buttonAction('goToPay', $event)" v-if="isShowCancelOrderButton(this.item) && item.tradeChannel !== 'COLLECTIVE' && item.tradeChannel !== 'PRESENT'">立即支付</div>
      <div class="hb-btn-s current" @click="buttonAction('completeDistributionInfo', $event)" v-if="isShowcompleteDistributionInfoButtton(this.item)">完善信息</div>
    </div>
  </div>
</template>
<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
  @import "../../../design/styles/webstyle.less";
  .show-more {
    width: 100%;
    padding: 0.2rem 0.3rem;
    text-align: right;
    color:#999;
    font-size:15px;
    cursor: pointer;
  }
  .hb-btn-s-order{
    width: 75px;
    height: 30px;
    line-height: 2.5;
    text-align: center;
    border: 1px solid #ddd;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;
    display: inline-block;
    color: #666;
    font-size: 13px;
    margin-top: 7px;
    margin-bottom: 7px;
   &.current{
     border-color: @theme-color;
     background-color: @theme-color;
     color: #fff;
   }
  }
</style>
<script>
  import OrderListSubCell from './OrderListSubCell.vue'
  export default {
    components: {OrderListSubCell},
    props: {
      item: {
        type: Object,
        require: true
      }
    },
    data () {
      return {}
    },
    beforeMount () {
      this.transformItem(this.item)
    },
    beforeUpdate () {
      this.transformItem(this.item)
    },
    methods: {
      transformItem (item) {
        if (item.subOrderShow) {
          return
        }
        if (item.subOrderList.length > 3) {
          this.$set(item, 'overThree', true)
          this.$set(item, 'expand', false)
          this.$set(item, 'subOrderShow', [item.subOrderList[0]])
        } else {
          this.$set(item, 'subOrderShow', item.subOrderList)
        }
      },
      toggleExpand (e) {
        e.stopPropagation()
        if (this.item.expand === undefined) {
          return
        }
        if (this.item.expand) {
          this.item.expand = false
          this.item.subOrderShow = [this.item.subOrderList[0]]
        } else {
          this.item.expand = true
          this.item.subOrderShow = this.item.subOrderList
        }
      },
      goMoreSubOrderList (list, e) {
        e.stopPropagation()
        this.push({
          name: 'moreSubOrderList',
          params: {
            subOrderList: list
          }
        })
      },
      getTotalPriceText () {
        if (this.item.status === 1 || this.item.status === 2 || this.item.status === 7 || this.item.status === 8) {
          return '总价'
        } else {
          return '实付'
        }
      },
      getOrderStatusText () {
        switch (this.item.status) {
          case 1: {
            return '未支付'
          }
          case 2: {
            return '未支付'
          }
          case 3: {
            return '开通中'
          }
          case 4: {
            return '开通中'
          }
          case 5: {
            return '开通中'
          }
          case 6: {
            return '交易成功'
          }
          case 7: {
            return '交易关闭'
          }
          case 8: {
            return '支付中'
          }
        }
      },
      isShowSeeRefundButtton (item) {
        if (item === undefined) {
          return false
        }
        if (item.subOrderList === undefined || !item.subOrderList.length) {
          return false
        }
        if (item.subOrderList.length === 1) {
          let subItem = item.subOrderList[0]
          if (subItem.status === 8 || subItem.status === 9 || subItem.exitRefundOrder) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      },
      seeRefundAction (subItem) {
        // 退款记录 主订单的id
        this.$emit('on-seeRefund', this.item)
      },
      isShowChangeClassRecordButton (item) {
        if (item === undefined) {
          return false
        }
        if (item.subOrderList === undefined || !item.subOrderList.length) {
          return false
        } else {
          if (item.subOrderList.length === 1) {
            let subItem = item.subOrderList[0]
            if ((item.businessType === 'NORMAL' || item.businessType === 'SWAP_OUT' || item.businessType === 'SWAP_IN_AND_OUT') && subItem.swapOut) {
              return true
            } else {
              return false
            }
          } else {
            return false
          }
        }
      },
      changeClassRecordAction (subItem) {
        // 换班记录 子订单的id
        this.$emit('on-changeClassRecord', subItem)
      },
      isShowRelevanceOrder (item) {
        if (item === undefined) {
          return false
        }
        if ((item.businessType === 'SWAP_IN' || item.businessType === 'SWAP_IN_AND_OUT')) {
          return true
        } else {
          return false
        }
      },
      isShowcompleteDistributionInfoButtton  () {
        let item = this.item
        if (item === undefined || item.status === undefined) {
          return false
        }
        if ((item.status === 3 || item.status === 4 || item.status === 5 || item.status === 6) && !item.deleiverInfoComplete) {
          return true
        } else {
          return false
        }
      },
      getTopBarClass () {
        // if (!this.item.deleiverInfoComplete && (this.item.status === 3 || this.item.status === 4 || this.item.status === 5 || this.item.status === 6)) {
        //   return ['weui-panel__hd', 'undo']
        // } else {
        //   return ['weui-panel__hd']
        // }
        return ['weui-panel__hd']
      },
      buttonAction (type, event) {
        if (event) {
          event.stopPropagation()
        }
        switch (type) {
          // 立即支付
          case 'goToPay' : {
            this.$emit('on-goToPay', this.item)
            break
          }
          // 完善配送信息
          case 'completeDistributionInfo' : {
            this.$emit('on-completeDistributionInfo', this.item)
            break
          }
          // 关联订单
          case 'relevanceOrder' : {
            this.$emit('on-relevanceOrder', this.item)
            break
          }
          // 取消订单
          case 'cancelOrder' : {
            this.$emit('on-cancelOrder', this.item)
            break
          }
          // 比较特殊，只有在子订单数为一的时候会调用此方法，故应该考虑传的是哪一个订单号
          // 查看换班记录
          case 'changeClassRecord' : {
            if (this.item.subOrderList.length === 1) {
              this.$emit('on-changeClassRecord', this.item.subOrderList[0])
            }
            break
          }
          // 查看退款
          case 'seeRefund' : {
            if (this.item.subOrderList.length === 1) {
              this.$emit('on-seeRefund', this.item)
            }
            break
          }
        }
      },
      cellClickAction () {
        this.$emit('on-cellClick', this.item)
      },
      /**
       * 判断是否显示控件方法
       */
      isShowBottomBar () {
        // 除交易关闭的情况下不显示，其余情况都显示
        if (this.item.status === 7) {
          return false
        } else {
          if (this.isShowSeeRefundButtton() || this.isShowChangeClassRecordButton() || this.isShowRelevanceOrder() || this.isShowCancelOrderButton() || this.isShowcompleteDistributionInfoButtton()) {
            return true
          } else {
            return false
          }
        }
      },
      // 在订单状态为支付中和未支付的情况下，显示取消订单和立即支付按钮
      isShowCancelOrderButton () {
        if (this.item.status === 1 || this.item.status === 2 || this.item.status === 8) {
          return true
        } else {
          return false
        }
      },
      isShowGoToPayButton () {
        if (this.item.status === 1 || this.item.status === 2 || this.item.status === 8) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

