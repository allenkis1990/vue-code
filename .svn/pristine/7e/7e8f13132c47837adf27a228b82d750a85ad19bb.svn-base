<template>
  <div class="container weui-tab">
    <div v-if="completeThisOrder" class="js_dialog" id="iosDialog1" style="opacity: 1;">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__bd">
          <i class="weui-icon-success weui-icon_msg"></i>
          <p class="mt20">完善信息成功！</p>
        </div>
        <div class="weui-dialog__ft">
          <div @click="gotoNextNeedCompleteOrder" class="weui-dialog__btn weui-dialog__btn_primary">完善下一笔订单</div>
        </div>
      </div>
    </div>
    <div v-if="completeAllOrders" class="js_dialog" id="iosDialog1" style="opacity: 1;">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__bd">
          <i class="weui-icon-success weui-icon_msg"></i>
          <p class="mt20">完善信息成功！</p>
        </div>
      </div>
    </div>
    <div class="weui-tab__panel">
      <div class="weui-panel hb-panel">
        <div class="weui-panel__hd">报名班级</div>
        <div class="weui-panel__bd" v-for="(item,index) in order.subOrderList" :key="item.skuId">
          <div @click="gotoTrainingDetail(item)" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="item.photoPath">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.skuName}}</h4>
              <p class="weui-media-box__desc">年度：{{getTrainingYear(item)}}年</p>
              <p class="weui-media-box__desc">科目：{{getTrainingType(item)}}</p>
              <p class="weui-media-box__desc">学时：{{item.trainingPeriod}}</p>
            </div>
            <!-- 无优惠 -->
            <div class="price">￥<span class="num">{{item.totalAmount}}元</span></div>
            <!-- 有优惠 -->
            <!--<div class="price" v-if="item.haveDiscount">
              <div class="now-price"><span class="activity-label">优惠中</span>￥<span class="num">{{item.dealPrice}}</span><span class="old-price">￥{{item.originalPrice}}</span></div>
            </div>-->
          </div>
<!--
          <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg" v-if="isElectron == false">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" src="../../../../design/images/invoice-img.jpg">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">纸质发票配送费</h4>
              <p class="weui-media-box__desc">发票类型：纸质普票</p>
            </div>
            <div class="price">￥<span class="num">{{this.invoicePrice}}元</span></div>
          </a>
-->
        </div>
      </div>
      <!-- 只支持发票 和  只支持发票和证书配送-->
      <div class="weui-panel hb-panel" v-if="(configSetting.type == 1 && configSetting.provideType != 0)|| (configSetting.type == 3 && configSetting.provideType != 0)">
        <div class="weui-panel__hd">发票</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>索要发票</p>
            </div>
            <!-- 0：无 1：学员自选是否需要发票 2：强制提供 -->
            <div class="weui-cell__ft hb-form-box" v-if="configSetting.provideType == 0">
              <div class="hb-form radio"></div>
            </div>
            <div class="weui-cell__ft hb-form-box" v-if="configSetting.provideType == 1">
              <div @click="needInvoiceAction()" :class="invoiceProvideType()"></div>
            </div>
            <div class="weui-cell__ft hb-form-box" v-if="configSetting.provideType == 2">
              <div class="hb-form radio-checked"></div>
            </div>
          </div>
          <!-- 0：无 1：学员自选是否需要发票 2：强制提供 -->
          <div v-if="configSetting.provideType == 0">
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">
                <p class="to"><span class="tit">发票抬头</span>不提供发票</p>
              </div>
              <div class="weui-cell__ft"></div>
            </a>
            <!-- <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">
                <p class="to"><span class="tit">发票配送</span>自取(厦门人才市场)</p>
              </div>
              <div class="weui-cell__ft"></div>
            </a> -->
          </div>
          <!-- 0：无 1：学员自选是否需要发票 2：强制提供 -->
          <div v-if="configSetting.provideType == 1 || configSetting.provideType == 2">
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd" @click="configInvoice()">
                <p class="to"><span class="tit">发票抬头</span>{{pageState.invoiceType}}</p>
              </div>
              <div class="weui-cell__ft"></div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" v-if="pageState.needInvoiceDeliver">
              <div class="weui-cell__bd" @click="configInvoiceDeliver()">
                <p class="to"><span class="tit">发票配送</span>{{pageState.invoiceDeliver}}</p>
              </div>
              <div class="weui-cell__ft"></div>
            </a>
          </div>
        </div>
      </div>
      <!-- 支持发票和证书   -->

      <!-- V1.0.0修复版本隐藏 -->
      <!-- 只支持证书 -->
      <!-- <div class="weui-panel hb-panel" v-if="configSetting.type == 2 || configSetting.type == 3">
        <div class="weui-panel__hd">证书</div>
        <div class="weui-cells">
          <a class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__bd" @click="configCerDeliver()">
              <p class="to"><span class="tit">证书配送</span>{{pageState.cerDeliver}}</p>
            </div>
            <div class="weui-cell__ft"></div>
          </a>
        </div>
      </div> -->
    </div>
    <div class="weui-tabbar hb-tabbar">
      <div @click="completeOrder()" class="hb-btn">提交配送信息</div>
    </div>
  </div>
</template>

<style lang="less">
</style>

<script>
import { Group, Radio } from 'vux'
import * as storeTypes from '../../../store/types'
import AppConstant from '../../../global/constants/AppConstant'
export default {
  components: { Radio, Group },
  data () {
    return {
      btnIsEnable: true,
      completeThisOrder: false,
      completeAllOrders: false,
      needCompleteOrderList: [],
      orderArray: this.$store.state.orderModule.needCompleteOrderList,
      // orderArray: this.$route.query.orderList,
      // 从哪个页面进来完善信息的 用于全部完善完信息后回到页面
      path: this.$route.query.path,
      completeOneOrAll: this.$route.query.completeOneOrAll,
      order: {},
      trainingClassDetailInfo: {},
      configSetting: {},
      invoiceInfo: this.$store.state.orderModule.completeInvoiceInfo,
      cerInfo: this.$store.state.orderModule.completeCerInfo,
      pageState: {
        // 是否需要发票
        needInvoice: this.$store.state.orderModule.completeOrderNeedInvoice || false,
        // 是否需要配送发票
        needInvoiceDeliver: false,
        // 发票抬头文案,以及选择后文字显示
        invoiceType: '',
        // 发票配送文案,以及选择后配送显示
        invoiceDeliver: '',
        // 证书配送文案,以及选后配送显示
        cerDeliver: ''
      },
      invoicePrice: AppConstant.sysContext.invoicePrice
    }
  },
  computed: {
    isElectron () {
      return this.$store.state.orderModule.completeInvoiceInfo.electron
    }
  },
  methods: {
    invoiceProvideType: function () {
      if (this.pageState.needInvoice) {
        return ['hb-form', 'radio-checked']
      } else {
        return ['hb-form', 'radio']
      }
    },
    getTrainingYear (item) {
      if (item.skuPropertyNameList) {
        console.log(item)
        for (var i = 0; i < item.skuPropertyNameList.length; i++) {
          if (item.skuPropertyNameList[i].skuPropertyName === '继续教育年度') {
            return item.skuPropertyNameList[i].skuPropertyValueName
          }
        }
      }
    },
    getMajor (item) {
      if (item.skuPropertyNameList) {
        for (var i = 0; i < item.skuPropertyNameList.length; i++) {
          if (item.skuPropertyNameList[i].skuPropertyName === '专业') {
            return item.skuPropertyNameList[i].skuPropertyValueName
          }
        }
      }
    },
    getTrainingType (item) {
      if (item.skuPropertyNameList) {
        for (var i = 0; i < item.skuPropertyNameList.length; i++) {
          if (item.skuPropertyNameList[i].skuPropertyName === '科目') {
            return item.skuPropertyNameList[i].skuPropertyValueName
          }
        }
      }
    },
    configInvoice: function () {
      if (this.configSetting.provideType === 1) {
        if (!this.pageState.needInvoice) {
          this.toast('请勾选索要发票选项!')
          return
        }
      }
      this.$store.commit(storeTypes.COMPLETE_ORDER_NEED_INVOICE, this.pageState.needInvoice)
      this.push({
        path: '/configCompleteInvoiceInfo',
        query: {
          invoiceType: this.configSetting.invoiceType,
          invoiceTitle: this.configSetting.invoiceTitle,
          provideType: this.configSetting.provideType
        }
      })
    },
    configInvoiceDeliver: function () {
      if (this.configSetting.provideType === 1) {
        if (!this.pageState.needInvoice) {
          this.toast('请勾选所要发票按钮!')
          return
        }
      }
      this.$store.commit(storeTypes.COMPLETE_ORDER_NEED_INVOICE, this.pageState.needInvoice)
      this.push({path: '/configCompleteInvoiceDeliver'})
    },
    configCerDeliver: function () {
      this.push({path: '/configCompleteCerDeliver'})
    },
    gotoTrainingDetail: function () {
      var yearObj = {
        skuPropertyId: '',
        skuPropertyName: '',
        skuPropertyValueId: '',
        skuPropertyValueName: ''
      }
      for (var i = 0; i < this.trainingClassDetailInfo.skuPropertyNameList.length; i++) {
        if (this.trainingClassDetailInfo.skuPropertyNameList[i].skuPropertyName === '继续教育年度') {
          yearObj = this.trainingClassDetailInfo.skuPropertyNameList[i]
          break
        }
      }
      this.$router.push({path: '/classDetail', query: { yearObject: yearObj, amount: this.trainingClassDetailInfo.dealPrice, skuId: this.trainingClassDetailInfo.skuId }})
    },
    needInvoiceAction: function () {
      this.pageState.needInvoice = !this.pageState.needInvoice
      if (this.pageState.needInvoice === false) {
        this.$store.dispatch(storeTypes.ORDER_SET_COMPLETE_TEMP_INVOICE_INFO, {})
        this.invoiceInfo = this.$store.state.orderModule.comoleteInvoiceInfo
        this.pageState.invoiceType = '请选择发票抬头'
        this.pageState.invoiceDeliver = '请选择配送方式'
        this.pageState.needInvoiceDeliver = false
      }
    },
    requestConfigSetting: function () {
      this.showLoading('加载中...')
      var orderNo = ''
      if (this.orderArray.length > 0) {
        // orderNo = this.orderArray[0].orderNumber
        orderNo = this.orderArray[0]
      } else {
        this.hideLoading()
        this.back()
      }
      this.$store.dispatch(storeTypes.ORDER_GET_COMPLETE_CONFIG_SETTING, { orderNo: orderNo })
        .then(data => {
          this.hideLoading()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.configSetting = data.data
            this.initPageState()
          } else {
            console.log(JSON.stringify(data))
            this.toast(data.head.message)
          }
        })
        .then(e => {
          this.hideLoading()
        })
    },
    initPageState: function () {
      if (this.configSetting.type === 1) {
        // 初始化发票配送抬头
        this.initInvoiceTitle()
        // 初始化是和否需要发票
        this.initNeedInvoice()
        // 初始化发票配送信息
        this.initInvoiceDeliver()
      } if (this.configSetting.type === 2) {
        // 初始化证书配送信息
        this.initCerDeliver()
      } if (this.configSetting.type === 3) {
        // 初始化发票配送抬头
        this.initInvoiceTitle()
        // 初始化是和否需要发票
        this.initNeedInvoice()
        // 初始化发票配送信息
        this.initInvoiceDeliver()
        // 初始化证书配送信息
        this.initCerDeliver()
      }
    },
    // 初始化发票抬头内容
    initInvoiceTitle: function () {
      if (this.invoiceInfo.electron === true) {
        this.pageState.invoiceType = '电子-'
      } else if (this.invoiceInfo.electron === false) {
        this.pageState.invoiceType = '纸质-'
      }
      if (this.invoiceInfo.titleType === 1) {
        this.pageState.invoiceType = this.pageState.invoiceType + '个人'
      } else if (this.invoiceInfo.titleType === 2) {
        this.pageState.invoiceType = this.pageState.invoiceType + '单位(' + this.invoiceInfo.title + ')'
      }
      if (this.pageState.invoiceType.length === 0) {
        this.pageState.invoiceType = '请选择发票抬头'
      }
    },
    // 初始化索要发票按钮状态
    initNeedInvoice: function () {
      if (this.pageState.invoiceType !== '请选择发票抬头' && this.pageState.invoiceType.length !== 0) {
        this.pageState.needInvoice = true
      }
    },
    // 初始化发票配送内容
    initInvoiceDeliver: function () {
      if (this.invoiceInfo.electron === undefined || this.invoiceInfo.electron === true) {
        this.pageState.needInvoiceDeliver = false
      } else if (this.invoiceInfo.electron === false) {
        this.pageState.needInvoiceDeliver = true
        if (this.invoiceInfo.deliverType === 1) {
          this.pageState.invoiceDeliver = '邮寄(' + this.invoiceInfo.addressDetails + ')'
        } else if (this.invoiceInfo.deliverType === 2) {
          this.pageState.invoiceDeliver = '自取(' + this.invoiceInfo.selfStorageName + ')'
        } else {
          this.pageState.invoiceDeliver = '请选择配送方式'
        }
      }
    },
    initCerDeliver: function () {
      if (this.cerInfo.deliverType === 1) {
        this.pageState.cerDeliver = '邮寄(' + this.cerInfo.addressDetails + ')'
      } else if (this.cerInfo.deliverType === 2) {
        this.pageState.cerDeliver = '自取(' + this.cerInfo.selfStorageName + ')'
      } else {
        this.pageState.cerDeliver = '请选择配送方式'
      }
    },
    requestOrderInfo: function () {
      var orderNo = ''
      if (this.orderArray.length > 0) {
        // orderNo = this.orderArray[0].orderNumber
        orderNo = this.orderArray[0]
      } else {
        this.back()
      }
      // 获取订单详情
      this.$store.dispatch(storeTypes.ORDER_GET_ORDER_DETAIL, { orderNo: orderNo })
        .then(data => {
          this.hideLoading()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.order = data.data
            this.initPageState()
          } else {
            console.log(JSON.stringify(data))
          }
        })
        .then(e => {
          this.hideLoading()
        })
    },
    gotoOriginalView: function () {
      this.$store.commit(storeTypes.COMPLETE_ORDER_NEED_INVOICE, false)
      // this.push({ path: '/completeOrder', query: {path: this.path, orderList: data.data.orderList} })
      this.replace({path: this.path, query: {orderNo: this.order.orderNo}})
    },
    gotoNextNeedCompleteOrder: function () {
      this.invoiceInfo = {}
      this.cerInfo = {}
      this.pageState.needInvoice = false
      this.pageState.needInvoiceDeliver = false
      this.pageState.invoiceType = ''
      this.pageState.invoiceDeliver = ''
      this.pageState.cerDeliver = ''
      this.completeThisOrder = false
      this.orderArray = []
      this.orderArray = this.needCompleteOrderList
      this.$store.commit(storeTypes.COMPLETE_ORDER_NEED_INVOICE, false)
      this.requestConfigSetting()
      this.requestOrderInfo()
    },
    completeOrder: function () {
      if (this.btnIsEnable === false) return
      this.btnIsEnable = false
      var param = {}
      param.orderNo = this.orderArray[0]
      param.paymentChannel = 'WECHAT'
      param.orderSkuPlaceInfoList = [{skuId: this.skuId, purchaseQuantity: 1}]
      param.deliverInfo = {}
      var email = this.$store.state.orderModule.orderEmail;
      // 赋值提交数据
      param.deliverInfo = this.assignValue(email)
      if (this.configSetting.provideType === 1 && !this.pageState.needInvoice) {
        param.deliverInfo = {};
        this.submit(param);
        return;
      }
      // 验证提交数据
      if (this.checkValue(param.deliverInfo)) {
        this.submit(param);
      } else {
        this.btnIsEnable = true
      }
    },
    submit (param) {
      this.$store.dispatch(storeTypes.ORDER_COMPLETE_ORDER, param).then(data => {
        this.hideLoading()
        this.btnIsEnable = true
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          this.$store.dispatch(storeTypes.ORDER_GET_NEED_COMPLETE_ORDER_LIST).then(data => {
            if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
              this.$store.dispatch(storeTypes.ORDER_SET_COMPLETE_TEMP_INVOICE_INFO, {})
              this.$store.dispatch(storeTypes.ORDER_SET_COMPLETE_TEMP_CER_INFO, {})
              // false 是完善全部订单 true 是完善单个订单
              if (!this.completeOneOrAll) {
                // 还有订单需要完善
                if (data.data.orderList.length > 0) {
                  this.needCompleteOrderList = []
                  for (var i = 0; i < data.data.orderList.length; i++) {
                    this.needCompleteOrderList.push(data.data.orderList[i].orderNumber)
                  }
                  this.completeThisOrder = true
                  // 没有订单信息需要完善
                } else {
                  this.completeAllOrders = true
                  setTimeout(this.gotoOriginalView, 5000)
                }
              } else {
                this.toast('完善信息成功')
                this.replace({path: this.path, query: {orderNo: this.order.orderNo}})
              }
            } else {
              this.toast(data.head.message)
            }
          })
        } else {
          this.btnIsEnable = true
          this.toast(data.head.message)
        }
      }).then(e => {
        this.btnIsEnable = true
        this.hideLoading()
      })
    },
    assignValue: function (email) {
      var deliverInfo = {}
      deliverInfo.invoiceInfo = this.invoiceInfo
      if (email) {
        deliverInfo.invoiceInfo.email = email
      }
      deliverInfo.cerInfo = this.cerInfo
      return deliverInfo
    },
    checkValue: function (param) {
      // type             1.只支持发票 2.只支持证书 3.支持发票和证书配送
      // provideType      0：无 1：学员自选是否需要发票 2：强制提供
      switch (this.configSetting.type) {
        // 只支持发票
        case 1: {
          // invoiceType
          // 1.只支持纸质
          if (this.configSetting.invoiceType === 1) {
            // 检查发票内容
            if (!this.checkInvoiceInfo(param.invoiceInfo)) {
              return false
            }
            // 检查发票配送信息
            if (!this.checkInvoiceDeliverInfo(param.invoiceInfo)) {
              return false
            }
          // 2.只支持电子发票
          } else if (this.configSetting.invoiceType === 2) {
            // 检查发票内容
            if (!this.checkInvoiceInfo(param.invoiceInfo)) {
              return false
            }
          // 3.支持纸质和电子发票
          } else if (this.configSetting.invoiceType === 3) {
            // 检查发票内容
            if (!this.checkInvoiceInfo(param.invoiceInfo)) {
              return false
            }
            // 纸质发票时候检查配送信息
            if (!param.invoiceInfo.electron) {
              // 检查发票配送信息
              if (!this.checkInvoiceDeliverInfo(param.invoiceInfo)) {
                return
              }
            }
          }
          break
        }
        // 只支持证书
        case 2: {
          if (!this.checkCerInfo(param.cerInfo)) {
            return false
          }
          break
        }
        // 支持发票和证书
        case 3: {
          // invoiceType
          // 1.只支持纸质
          if (this.configSetting.invoiceType === 1) {
            // 检查发票内容
            if (!this.checkInvoiceInfo(param.invoiceInfo)) {
              return false
            }
            // 检查发票配送信息
            if (!this.checkInvoiceDeliverInfo(param.invoiceInfo)) {
              return false
            }
            // 2.只支持电子发票
          } else if (this.configSetting.invoiceType === 2) {
            // 检查发票内容
            if (!this.checkInvoiceInfo(param.invoiceInfo)) {
              return false
            }
            // 3.支持纸质和电子发票
          } else if (this.configSetting.invoiceType === 3) {
            // 检查发票内容
            if (!this.checkInvoiceInfo(param.invoiceInfo)) {
              return false
            }
            // 纸质发票时候检查配送信息
            if (!param.invoiceInfo.electron) {
              // 检查发票配送信息
              if (!this.checkInvoiceDeliverInfo(param.invoiceInfo)) {
                return false
              }
            }
            // 检查证书
            // if (!this.checkCerInfo(param.cerInfo)) {
            //   return false
            // }
          }
          break
        }
        default:
          break
      }
      return true
    },
    checkInvoiceInfo: function (invoiceInfo) {
      if (!invoiceInfo.title) {
        this.toast('请配置发票信息')
        return false
      }
      if (invoiceInfo.title.length === 0) {
        this.toast('请输入发票抬头')
        return false
      }
      // invoiceTitle     1.只支持个人 2.只支持单位 3.支持个人和单位
      // 2：企业
      if (invoiceInfo.titleType === 2) {
        if (invoiceInfo.taxpayerNo.length === 0) {
          this.toast('请输出纳税识别号')
          return false
        }
      }
      return true
    },
    checkInvoiceDeliverInfo: function (invoiceInfo) {
      if (!invoiceInfo.deliverType) {
        this.toast('请配置发票信息')
        return false
      }
      // 1.邮寄 2.买家自取
      if (invoiceInfo.deliverType === 1) {
        if (invoiceInfo.receiverAddressId.length === 0) {
          this.toast('请输入发票邮寄地址')
          return false
        }
      }
      if (invoiceInfo.deliverType === 2) {
        if (invoiceInfo.selfStorageId.length === 0) {
          this.toast('请选择发票自取地址')
          return false
        }
      }
      return true
    },
    checkCerInfo: function (cerInfo) {
      if (!cerInfo.deliverType) {
        this.toast('请配置证书信息')
        return false
      }
      // 1.邮寄 2.买家自取
      if (cerInfo.deliverType === 1) {
        if (cerInfo.receiverAddressId.length === 0) {
          this.toast('请输入证书邮寄地址')
          return false
        }
      }
      if (cerInfo.deliverType === 2) {
        if (cerInfo.selfStorageId.length === 0) {
          this.toast('请选择证书自取地址')
          return false
        }
      }
      return true
    }
  },
  mounted () {
    // 从哪个页面进来完善信息的 用于全部完善完信息后回到页面
    this.requestConfigSetting()
    this.requestOrderInfo()
  }
}
</script>
