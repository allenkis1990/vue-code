<template>
  <div class="container weui-tab">
    <div class="weui-tab__panel">
      <div class="weui-panel hb-panel">
        <div class="weui-panel__hd">开票方式</div>
        <div class="weui-cells">
          <!-- 1 只支持纸质 2 只支持电子发票 3 支持纸质和电子发票 -->
          <div class="weui-cell" v-if="invoiceType == 1">
            <div class="weui-cell__bd">
              <a href="javascript:;" class="hb-btn-s current">纸质普票</a>
            </div>
          </div>
          <div class="weui-cell" v-if="invoiceType == 2">
            <div class="weui-cell__bd">
              <a href="javascript:;" class="hb-btn-s current">电子发票</a>
            </div>
          </div>
          <div class="weui-cell" v-if="invoiceType == 3">
            <div class="weui-cell__bd">
              <div @click="chooseInvoiceType(false)" :class="getInvoiceStyle(false)">纸质普票</div>
              <div @click="chooseInvoiceType(true)" :class="getInvoiceStyle(true)">电子发票</div>
            </div>
          </div>
        </div>
        <div class="tips-box p10" v-if="!electron">
          <span class="cr">提示：纸质发票配送暂仅支持EMS，配送费不支持退款。</span>
        </div>
        <div class="tips-box p10" v-if="electron">
          <span class="cr">电子发票即增值税专用发票的电子版本，可支持报销入账，其法律效力、基本用途及使用规定和纸质发票相同。获取发票时间为8-90天</span>
        </div>
      </div>
      <div class="weui-panel hb-panel">
        <div class="weui-panel__hd">发票抬头</div>
        <!-- 1 只支持个人 2 只支持单位 3 支持个人和单位 -->
        <div class="weui-cells weui-cells_radio" v-if="invoiceTitle == 1">
          <label class="weui-cell weui-check__label">
            <div class="weui-cell__bd">
              <input type="radio" class="hb-radio weui-check" checked="checked">
              <span class="form-checked"></span> 个人
            </div>
          </label>
        </div>
        <div class="weui-cells weui-cells_radio" v-if="invoiceTitle == 2">
          <label class="weui-cell weui-check__label">
            <div class="weui-cell__bd">
              <input type="radio" class="hb-radio weui-check" checked="checked">
              <span class="form-checked"></span> 单位
            </div>
          </label>
        </div>
        <div class="weui-cells weui-cells_radio" v-if="invoiceTitle == 3">
          <label class="weui-cell weui-check__label">
            <div class="weui-cell__bd">
              <input type="radio" class="hb-radio weui-check" v-model="titleType" v-bind:value=1>
              <span class="form-checked"></span> 个人
            </div>
          </label>
          <label class="weui-cell weui-check__label">
            <div class="weui-cell__bd">
              <input type="radio" class="hb-radio weui-check" v-model="titleType" v-bind:value=2>
              <span class="form-checked"></span> 单位
            </div>
          </label>
        </div>
      </div>
      <!--个人-->
      <div class="weui-panel hb-panel" v-if="getTitleType == 1">
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label"><i class="star">*</i>个人姓名</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请填写个人姓名" v-model="title">
            </div>
          </div>

          <div v-show="electron">
            <div class="weui-cell">
              <div class="weui-cell__hd"><label class="weui-label"><i class="star">*</i>电子邮箱</label></div>
              <div class="weui-cell__bd"><input type="text"
                                                v-model="email"
                                                placeholder="请填写您的邮箱"
                                                class="weui-input"></div>
            </div>
            <div class="tips-box p10"><span
              class="cr">注：电子发票将以邮件形式发至您的电子邮箱，请注意查收！</span>
            </div>
          </div>

        </div>
      </div>
      <!--/个人-->

      <!--单位-->
      <div class="weui-panel hb-panel" v-if="getTitleType == 2">
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label"><i class="star">*</i>单位全称</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请填写单位全称" v-model="title">
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label"><i class="star">*</i>纳税人识别号</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请填写纳税人识别号/社会信用统一代码" v-model="taxpayerNo">
            </div>
          </div>


          <div v-show="electron">
            <div class="weui-cell">
              <div class="weui-cell__hd"><label class="weui-label"><i class="star">*</i>电子邮箱</label></div>
              <div class="weui-cell__bd"><input type="text"
                                                v-model="email"
                                                placeholder="请填写您的邮箱"
                                                class="weui-input"></div>
            </div>
            <div class="tips-box p10"><span
              class="cr">注：1.开企业抬头发票须填写纳税人识别号/社会信用统一代码，以免影响报销。2.电子发票将以邮件形式发至您的电子邮箱，请注意查收！</span>
            </div>
          </div>

        </div>
        <div class="tips-box p10">按照国税总局公告，自2017年7月1日起，企业索取的增值税发票需填写纳税人识别号，不符合规定的发票，不得作为合法的税收凭证。</div>
      </div>
      <!--/单位-->

    </div>
    <div class="weui-tabbar hb-tabbar">
      <div @click="saveInvoiceInfo()" class="hb-btn">保 存</div>
    </div>
  </div>
</template>

<style>
</style>
<script>
import * as storeTypes from '../../../store/types';
import AppConstant from '../../../global/constants/AppConstant';
export default {
  data () {
    return {
      invoiceInfo: this.$store.state.orderModule.completeInvoiceInfo,
      // 1.只支持纸质 2.只支持电子发票 3.支持纸质和电子发票
      invoiceType: this.$route.query.invoiceType,
      // 1.只支持个人 2.只支持单位 3.只支持个人和单位
      invoiceTitle: this.$route.query.invoiceTitle,
      // // 是否支持纸质/电子(纸质和电子)发票
      // supportElectron: undefined,
      // 是否电子发票
      electron: undefined,
      // 个人还是单位 1 个人 2 单位
      titleType: -1,
      // 个人时为姓名 单位时候为公司名称
      title: '',
      // 税号
      taxpayerNo: '',
      email: undefined
    }
  },
  computed: {
    getTitleType: function () {
      if (this.titleType === 1) {
        this.title = this.$store.getters.userInfo.userName
        return 1
      } else if (this.titleType === 2) {
        if (this.invoiceInfo.titleType === 2) {
          this.title = this.invoiceInfo.title;
        } else {
          this.title = '';
          this.taxpayerNo = '';
        }
        return 2
      }
    }
  },
  methods: {
    chooseInvoiceType: function (current) {
      this.electron = current
    },
    getInvoiceStyle: function (current) {
      if (this.electron === current) {
        return ['hb-btn-s', 'current']
      } else {
        return ['hb-btn-s']
      }
    },
    initSupportElectron: function () {
      // 1.只支持纸质 2.只支持电子发票 3.支持纸质和电子发票
      switch (this.invoiceType) {
        case 1: {
          this.electron = false
          break
        }
        case 2: {
          this.electron = true
          break
        }
        case 3: {
          this.electron = undefined
          break
        }
        default:
          break
      }
    },
    initInvoiceType: function () {
      if (this.invoiceInfo.electron === true) {
        this.electron = true
      } else if (this.invoiceInfo.electron === false) {
        this.electron = false
      }
    },
    initInvoiceTitleType: function () {
      if (this.invoiceInfo.titleType === 1) {
        this.titleType = 1
      } else if (this.invoiceInfo.titleType === 2) {
        this.titleType = 2
      }
    },
    initInvoiceTitleAndtaxpayerNo: function () {
      if (this.invoiceInfo.title) {
        this.title = this.invoiceInfo.title
      }
      if (this.invoiceInfo.taxpayerNo) {
        this.taxpayerNo = this.invoiceInfo.taxpayerNo
      }
    },

    initEmail: function () {
      if (!this.email) {
        var str = this.getCookie(AppConstant.cookie.userInfo);
        var userInfo = JSON.parse(str);
        if (userInfo && userInfo.email) {
          this.email = userInfo.email;
        } else {
          this.email = '';
        }
      }
    },

    // 保存发票
    saveInvoiceInfo: function () {
      if (this.electron === undefined) {
        this.toast('请选择发票类型')
        return
      }
      if (this.titleType === -1) {
        this.toast('请选择发票抬头类型')
        return
      }
      if (!this.title) {
        this.toast('请输入发票抬头')
        return
      }
      if (this.title.length === 0) {
        this.toast('请输入发票抬头')
        return
      }
      if (this.invoiceTitle === 2) {
        if (this.taxpayerNo.length === 0) {
          this.toast('请输入纳税人识别号')
          return
        }
      }
      if (this.invoiceTitle === 3) {
        if (this.titleType === 2) {
          if (this.taxpayerNo.length === 0) {
            this.toast('请输入纳税人识别号')
            return
          }
        }
      }
      if (this.electron) {
        var emailReg = new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$');
        if (this.email === null || this.email === '' || this.email === undefined) {
          this.toast('请输入电子邮箱地址')
          return
        }
        if (!emailReg.test(this.email)) {
          this.toast('请输入正确的邮箱格式')
          return
        }
      }
      this.invoiceInfo.needInvoice = true
      this.invoiceInfo.electron = this.electron
      this.invoiceInfo.titleType = this.titleType
      this.invoiceInfo.title = this.title
      this.invoiceInfo.taxpayerNo = this.taxpayerNo
      if (!this.invoiceInfo.electron) {
        this.invoiceInfo.paperInvoiceType = 2
      } else if (this.invoiceInfo.paperInvoiceType) {
        delete this.invoiceInfo.paperInvoiceType
      }
      this.$store.dispatch(storeTypes.ORDER_SET_COMPLETE_TEMP_INVOICE_INFO, this.invoiceInfo)
      if (this.electron) {
        this.$store.commit(storeTypes.ORDER_SET_ORDEREMAIL, this.email);
      }
      this.back()
    }
  },
  mounted () {
    this.initEmail();
    this.initSupportElectron()
    this.initInvoiceType()
    this.initInvoiceTitleType()
    this.initInvoiceTitleAndtaxpayerNo()
    // 初始化的时候，若发票配置为强制提供发票，且发票类型不为纸质发票，默认为电子发票
    if (this.$route.query.provideType === 2 && this.$store.state.orderModule.completeInvoiceInfo.electron === undefined) {
      if (this.$route.query.invoiceType === 1) {
        this.electron = false;
      } else {
        this.electron = true;
      }
    }
  }
}
</script>
