<template>
  <!--结算成功-->
  <div class="contain hb-box">
    <div>
      <div class="hb-box-bd">
        <div class="hb-msg bor-b20">
          <img class="icon-success" src="../../../design/images/icon-success.png" />
          <div class="fs30 mt20">支付成功</div>
        </div>
        <div class="weui-panel hb-panel bor-b20">
          <div class="weui-panel__hd">订单信息</div>
          <div class="weui-cells">
            <div class="weui-cell">
              <div class="weui-cell__bd"><div><span class="tit">订单号</span>{{orderInfo.orderNo}}</div></div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd"><div><span class="tit">下单时间</span>{{orderInfo.createTime}}</div></div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd"><div><span class="tit">付款金额</span><span class="ml10 ci">¥{{priceChangetoDecimal2(orderInfo.totalAmount)}}</span></div></div>
            </div>
          </div>
        </div>
        <div class="weui-panel hb-panel">
          <div class="weui-panel__hd">培训内容</div>
          <div class="weui-panel__bd">
            <div class="hb-media-box" v-for="(item,index) in orderInfo.subOrderList">
              <div class="hb-media-box-hd">
                <img class="hb-media-box-thumb" :src="item.photoPath" />
              </div>
              <div class="hb-media-box-bd">
                <div class="hb-media-box-title">{{item.skuName}}</div>
                <div class="hb-media-box-desc">年度：{{getSkuValueName(item.skuPropertyNameList,'年度')}}年</div>
                <div class="hb-media-box-desc">科目：{{getSkuValueName(item.skuPropertyNameList,'科目')}}</div>
                <div class="hb-media-box-desc">学时：{{item.trainingPeriod}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hb-tabbar">
        <div class="hb-btn hb-btn-3" @click="goToOrderDetailAction">查看订单详情</div>
        <div class="hb-btn-w hb-btn-3" @click="goToMyStudyListAction">进入我的学习</div>
      </div>
    </div>
    <go-study-dialog :show="showGoStudyDialog" @hide="closeStudyDialog"></go-study-dialog>
  </div>
</template>

<style lang="less">
</style>
<script>
import goStudyDialog from '@/components/goStudyDialog'
export default {
  components: {
    goStudyDialog: goStudyDialog
  },
  data () {
    return {
      orderInfo: {
        orderNo: '',
        createTime: '',
        totalAmount: '',
        subOrderList: []
      },
      showGoStudyDialog: false
    }
  },
  computed: {},
  methods: {
    priceChangetoDecimal2: function (x) {
      if (x === undefined) {
        return '0.00'
      }
      var f
      f = parseFloat(x)
      if (isNaN(f)) {
        return false
      }
      f = Math.round(x * 100) / 100
      var s = f.toString()
      var rs = s.indexOf('.')
      if (rs < 0) {
        rs = s.length
        s += '.'
      }
      while (s.length <= rs + 2) {
        s += '0'
      }
      return s
    },
    getSkuValueName: function (skuArr,skuName) {
      if (!skuArr) {
        return ''
      }
      var str = ''
      skuArr.forEach(function (item) {
        if (item.skuPropertyName === skuName) {
          str = item.skuPropertyValueName
        }
      })
      return str
    },
    /**
     * 跳转至订单详情页面
     */
    goToOrderDetailAction() {
      this.push({
        path: '/orderDetail',
        query: {
          orderNo: this.orderInfo.orderNo
        }
      })
    },
    /**
     * 跳转至我的学习页面
     */
    goToMyStudyListAction() {
      this.showGoStudyDialog = true
      console.log('打开小程序学习二维码')
    },
    closeStudyDialog() {
      this.showGoStudyDialog = false
      console.log('关闭')
    }
  },
  mounted () {
    if (this.$store.state.orderModule.payOrderInfo) {
      this.orderInfo = this.$store.state.orderModule.payOrderInfo
      console.log(this.orderInfo,'传递过来的payOrderInfo')
    } else {
      this.toast('数据错误')
    }
  }
}
</script>
