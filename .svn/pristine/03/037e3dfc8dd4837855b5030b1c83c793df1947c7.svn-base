<template>
  <div class="container weui-tab">
    <div class="weui-tab__panel">
      <div class="hb-warm-tips">
        <i class="weui-icon-warn"></i>
        <span class="tips-txt">请在下单后24小时内完成支付。</span>
      </div>
      <div class="weui-cells">
        <div class="weui-cell hb-order-status">
          <div class="weui-cell__hd">
            <span class="hb-ico pay-wait"></span>
          </div>
          <div class="weui-cell__bd">
            <p>订单状态：
              <span class="cr">{{orderStatus(order.status)}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="weui-panel hb-panel">
        <div class="weui-panel__hd">订单信息</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>
                <span class="tit">订单号</span>{{order.orderNo}}</p>
            </div>
          </div>
          <!-- 2017-12-12<span class="ml10">19:23:23</span> -->
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>
                <span class="tit">下单时间</span>{{order.createTime}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-panel hb-panel">
        <div class="weui-panel__hd">报名班级</div>
        <div class="weui-panel__bd" v-for="(item,index) in order.subOrderList" :key="index">
          <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="item.photoPath">
              <!-- <img class="weui-media-box__thumb" src="../../../design/images/course-img.jpg"> -->
            </div>
            <div class="weui-media-box__bd" @click="goToTrainingDetail(item)">
              <h4 class="weui-media-box__title">{{item.skuName}}</h4>
              <p class="weui-media-box__desc">年度：{{getTrainingYear(item)}}年</p>
              <p class="weui-media-box__desc">科目：{{getTrainingType(item)}}</p>
              <p class="weui-media-box__desc">学时：{{item.trainingPeriod}}</p>
            </div>
            <div class="price">￥
              <span class="num">{{item.totalAmount}}元</span>
            </div>
            <!--<div class="price" v-if="item.originalPrice !== item.totalAmount">
              <div class="now-price">
                <span class="activity-label">优惠中</span>￥
                <span class="num">{{item.totalAmount}}</span>
                <span class="old-price">￥{{item.originalPrice}}</span>
              </div>
            </div>-->
          </a>
        </div>
        <div class="weui-panel__hd" v-if="order.associatedOrderDtoList != undefined && order.associatedOrderDtoList.length != 0">发票配送</div>
        <div class="weui-panel__bd" v-if="order.associatedOrderDtoList != undefined && order.associatedOrderDtoList.length != 0">
          <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" src="../../../design/images/invoice-img.jpg">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">纸质发票配送费</h4>
              <p class="weui-media-box__desc">发票类型：纸质普票</p>
            </div>
            <div class="price">
              <div class="now-price">￥
                <span class="num">{{this.invoicePrice}}</span>
              </div>
            </div>
          </a>
        </div>
        <div class="bor-t sum-bar tr">需支付
          <span class="cr ml10">￥{{order.totalAmount}}元</span>
        </div>
      </div>
      <div class="weui-panel hb-panel">
        <div class="weui-panel__hd">支付方式</div>
        <group>
          <radio title="title" :options="options" v-model="payType"></radio>
        </group>
        <!--    <div class="weui-cells" v-for="(item,index) in order.payType">
                <div class="weui-cell">
                  <div class="weui-cell__bd"><img src="../../../design/images/icon-pay-wx.jpg" alt=" " class="hb-pay-img"></div>
                  <div class="weui-cell__ft hb-form-box">
                    <div class="hb-form radio-checked"></div>
                  </div>
                </div>
              </div> -->
      </div>
    </div>
    <div class="weui-tabbar hb-tabbar" @click="paidOrder()">
      <a href="javascript:;" class="hb-btn">确认支付</a>
    </div>
  </div>
</template>
<style lang="less">
.container .vux-radio-icon {
  width: 120px;
  height: 30px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}
</style>
<script>
import { Group, Radio } from 'vux'
import * as storeTypes from '../../store/types'
import AppConstant from '../../global/constants/AppConstant'
export default {
  components: { Radio, Group },
  data() {
    return {
      btnIsEnable: true,
      orderNo: this.$route.query.orderNo,
      order: {},
      payType: undefined,
      options: [],
      isElectron: this.$route.query.isElectron,
      invoicePrice: AppConstant.sysContext.invoicePrice
    }
  },
  computed: {},
  methods: {
    goToTrainingDetail(obj) {
      var yearObj = {
        skuPropertyId: '',
        skuPropertyName: '',
        skuPropertyValueId: '',
        skuPropertyValueName: ''
      }
      for (var i = 0; i < obj.skuPropertyNameList.length; i++) {
        if (obj.skuPropertyNameList[i].skuPropertyName === '继续教育年度') {
          yearObj = obj.skuPropertyNameList[i]
          break
        }
      }
      this.$router.push({
        path: '/classDetail',
        query: { yearObject: yearObj.skuPropertyValueName, amount: obj.totalAmount, skuId: obj.skuId }
      })
    },
    paidOrder() {
      if (!this.payType) {
        this.toast('请选择支付方式')
        return
      }
      // 未初始化
      if (typeof window.WeixinJSBridge === 'undefined') {
        if (window.document.addEventListener) {
          window.document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
        } else if (window.document.attachEvent) {
          window.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
          window.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
        }
      } else {
        this.payAction()
      }
    },
    payAction() {
      if (this.btnIsEnable === false) return
      let that = this;
      this.$vux.confirm.show({
        title: '提示',
        content: '是否确认付款？请核对订单信息正确',
        confirmText: '继续支付',
        onShow() {
          console.log('plugin show')
        },
        onHide() {
          console.log('plugin hide')
        },
        onCancel() {
          console.log('plugin cancel')
        },
        onConfirm() {
          that.btnIsEnable = false
          var productName = that.getProductName()
          // var openId = 'oxbS9tynHiUyS6oxZSYKsaMfPvnU' 会计openId
          // var openId = 'oRacG03SEY7gPxJYpXnDpJdP7EHM' // 华博openId
          // var openId = 'oRacG03syU52NwLpCwXjuiD2q76I' // 佳斌openId
          var openId = that.getCookie(AppConstant.cookie.openId)
          // var openId = window.localStorage.getItem(AppConstant.localStorage.openId)
          that.showLoading('正在请求支付信息......')
          that.$store.dispatch(storeTypes.ORDER_GET_ORDER_PAY_INFO, {
            orderNo: that.orderNo,
            payTypeId: that.payType,
            payAccountId: that.payAccountId,
            productName: productName,
            payMoney: that.order.totalAmount,
            openId: openId
          }).then(data => {
            console.log(111);
            that.btnIsEnable = true
            that.hideLoading()
            if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
              console.log('wxPay:' + data.data.url)
              var jsonObj = JSON.parse(data.data.url)
              console.log(jsonObj)
              // 初始化好
              var param = {
                appId: jsonObj.appId,
                timeStamp: jsonObj.timeStamp,
                nonceStr: jsonObj.nonceStr,
                package: jsonObj.package,
                signType: jsonObj.signType,
                paySign: jsonObj.paySign
              }
              that.toast('准备进行微信支付.....')
              window.WeixinJSBridge.invoke('getBrandWCPayRequest', param, function(res) {
                console.log(res);
                //                window.alert(res.err_msg + '/' + AppConstant.wx.success)
                if (res.err_msg === 'get_brand_wcpay_request:ok') {
                  that.toast('支付成功')
                  that.replace({ path: '/orderPaidSuccess', query: { order: that.order } })
                } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                  that.toast(res)
                } else {
                  that.toast('支付取消')
                }
              })
            } else {
              that.toast(data.head.message)
            }
          }).then(e => {
            // this.hideLoading()
            that.btnIsEnable = true
            console.log(JSON.stringify(e))
          })
        }
      })
    },
    getTrainingYear(item) {
      for (var i = 0; i < item.skuPropertyNameList.length; i++) {
        if (item.skuPropertyNameList[i].skuPropertyName === '继续教育年度') {
          return item.skuPropertyNameList[i].skuPropertyValueName
        }
      }
    },
    getMajor(item) {
      for (var i = 0; i < item.skuPropertyNameList.length; i++) {
        if (item.skuPropertyNameList[i].skuPropertyName === '专业') {
          return item.skuPropertyNameList[i].skuPropertyValueName
        }
      }
    },
    getProductName() {
      var productName = ''
      if (this.order.subOrderList.length > 0) {
        for (var i = 0; i < this.order.subOrderList.length; i++) {
          productName = productName + '|' + this.order.subOrderList[i].skuName
        }
        return productName
      } else {
        return productName
      }
    },
    getTrainingType(item) {
      for (var i = 0; i < item.skuPropertyNameList.length; i++) {
        if (item.skuPropertyNameList[i].skuPropertyName === '科目') {
          return item.skuPropertyNameList[i].skuPropertyValueName
        }
      }
    },
    orderStatus(type) {
      var str = ''
      switch (type) {
        case 0: {
          str = '待支付'
          break
        }
        case 1: {
          str = '支付中'
          break
        }
        case 2: {
          str = '已付款'
          break
        }
        default:
          break
      }
      return str
    },
    requestConfirmPayOrder: function() {
      this.showLoading('加载中...')
      let that = this
      this.$store.dispatch(storeTypes.ORDER_GET_CONFIRM_PAYORDER, { orderNo: this.orderNo })
        .then(data => {
          that.hideLoading()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            that.order = data.data
            for (var i = 0; i < that.order.paymentAccountList.length; i++) {
              that.options.push({
                // icon: 'https://ws1.sinaimg.cn/large/006tKfTcgy1fm4qdc3vedj305k01oq2q.jpg',
                icon: that.order.paymentAccountList[i].payAccountLogoPath,
                key: that.order.paymentAccountList[i].payAccountId,
                // value: that.order.paymentAccountList[i].payAccountName
                value: ''
              })
            }
            if (that.order.paymentAccountList.length === 1) {
              that.payType = that.order.paymentAccountList[0].payAccountId
              that.payAccountId = that.order.paymentAccountList[0].payAccountId
            }
          } else {
            console.log(JSON.stringify(data))
          }
        })
        .then(e => {
          that.hideLoading()
          console.log(JSON.stringify(e))
        })
    },
    onBridgeReady: function() {
      this.payAction()
    }
  },
  mounted() {
    this.requestConfirmPayOrder()
  }
}

</script>
