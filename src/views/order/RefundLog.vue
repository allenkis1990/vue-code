<template>
  <div class="contain">
    <scroller lock-x>
      <!--成功-->
      <div class="hb-timeline-box">
        <ul class="hb-timeline">
          <li v-for="(item, index) in refundLogList" :key="index" class="timeline-items">
            <span :class="getRefundStatusStyle(item)"></span>
            <div class="items-bd">
              <p class="items-info">{{getRefundStatusText(item)}}</p>
              <p class="sub-info">{{item.operateTime}}</p>
              <p v-if="item.status === 1" class="sub-info">订单号: {{orderRefundLog.orderNo}}</p>
              <p v-if="item.status === 3" class="sub-info">原因: {{item.reason}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="weui-panel hb-panel">
        <div class="weui-panel__hd">退款信息</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p><span class="tit">退款单号</span>{{orderRefundLog.orderNo}}</p>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p><span class="tit">退款金额</span>￥{{orderRefundLog.refundAmount}}</p>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p><span class="tit">退款方式</span>{{refundType}}</p>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p><span class="tit">退款原因</span>{{orderRefundLog.refundReason}}</p>
            </div>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
import * as storeTypes from '../../store/types'
import { Scroller } from 'vux'
export default {
  components: { Scroller },
  data () {
    return {
      orderNo: this.$route.query.subOrderNo,
      refundLogList: []
    }
  },
  mounted () {
    this.requestOrderRefundLog()
  },
  computed: {
    orderRefundLog () {
      return this.$store.state.orderModule.orderRefundLog
    },
    refundType () {
      var str = ''
      switch (this.orderRefundLog.refundType) {
        case 1: {
          str = '线上退款'
          break
        }
        case 2: {
          str = '线下退款'
          break
        }
        default:
          str = '-'
          break
      }
      return str
    }
  },
  methods: {
    refundLogSort: function (array) {
      // 冒泡排序
      var len = array.length
      for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
          if (array[j].status < array[j + 1].status) {
            var temp = array[j]
            array[j] = array[j + 1]
            array[j + 1] = temp
          }
        }
      }
      return array
    },
    getRefundStatusStyle: function (item) {
      var str = []
      // 0 申请退款   1 审核通过  2 退款成功 3 退款失败
      switch (item.status) {
        case 1: {
          str = ['hb-ico', 'ico-submit']
          break
        }
        case 2: {
          str = ['hb-ico', 'ico-audit']
          break
        }
        case 3: {
          str = ['hb-ico', 'ico-fail']
          break
        }
        case 4: {
          str = ['hb-ico', 'ico-submit']
          break
        }
        case 5: {
          str = ['hb-ico', 'ico-succ']
          break
        }
        case 6: {
          str = ['hb-ico', 'ico-fail']
          break
        }
        case 7: {
          str = ['hb-ico', 'ico-submit']
          break
        }
        default:
          break
      }
      return str
    },
    getRefundStatusText: function (item) {
      var str = ''
      // 1:退款申请审核中，2:退款审核通过，3:退款处理中，4:退款申请被拒绝，5:退款成功，6:退款失败
      switch (item.status) {
        case 1: {
          str = '退款提交申请'
          break
        }
        case 2: {
          str = '退款申请审核通过'
          break
        }
        case 3: {
          str = '退款申请被拒绝'
          break
        }
        case 4: {
          str = '退款处理中'
          break
        }
        case 5: {
          str = '退款成功'
          break
        }
        case 6: {
          str = '退款处理中'
          break
        }
        case 7: {
          str = '取消退款'
          break
        }
        default:
          break
      }
      return str
    },
    requestOrderRefundLog: function () {
      this.showLoading('加载中...')
      let that = this
      this.$store.dispatch(storeTypes.ORDER_GET_REFUND_LOG, { subOrderNo: this.orderNo })
        .then(data => {
          that.hideLoading()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            // // 对数组进行排序
            that.refundLogList = that.$store.state.orderModule.orderRefundLog.refundLogList
          } else {
            console.log(JSON.stringify(data))
          }
        })
        .then(e => {
          that.hideLoading()
          console.log(JSON.stringify(e))
        })
    }
  }
}
</script>
