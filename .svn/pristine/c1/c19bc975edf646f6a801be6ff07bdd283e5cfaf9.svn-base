<template>
  <div class="container bg-w">
    <div class="container" v-if="needCompleteOrderList.length > 0">
      <div class="js_dialog" id="iosDialog1" style="opacity: 1;">
        <div class="weui-mask"></div>
        <div class="weui-dialog weui-dialog-1">
          <div class="dialog-pic"><img src="../../../design/images/distribution-img.png" alt=""></div>
          <div class="weui-dialog__bd">亲，您存在<span class="cr"> {{needCompleteOrderList.length}}个 </span>订单需要完善配送信息，以便发票/证书的配送！</div>
          <div class="weui-dialog__ft">
            <div @click="gotoCompleteOrder()" class="weui-dialog__btn weui-dialog__btn_primary">前往完善</div>
          </div>
        </div>
      </div>
    </div>
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-left" @click="drawerVisibilityEvent">
        <a href="javascript:void(0);" class="hb-ico ico-menu"></a>
      </div>
      <div class="header-tit">个人中心</div>
    </div>
    <!-- 内容 -->
    <div class="hb-user-img">
      <img class="user-img" :src="imgUserHeader()" alt=" " @click="changeUserIcon()">
      <div class="mt10">{{$store.getters.userInfo.userName}}</div>
    </div>
    <div class="weui-cells hb-panel hb-personal-center">
      <div class="weui-cell weui-cell_access"  @click="jumpTo('personalInfo')">
        <div class="weui-cell__hd"><span class="hb-ico ico-info"></span></div>
        <div class="weui-cell__bd">
          <div class="bd-items fs30">个人信息</div>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div class="weui-cell weui-cell_access" @click="jumpTo('receiptInformation')">
        <div class="weui-cell__hd"><span class="hb-ico ico-add"></span></div>
        <div class="weui-cell__bd">
          <div class="bd-items fs30">收货地址</div>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div class="weui-cell weui-cell_access" @click="jumpTo('changePassword')">
        <div class="weui-cell__hd"><span class="hb-ico ico-password"></span></div>
        <div class="weui-cell__bd">
          <div class="bd-items fs30">修改密码</div>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../../../design/styles/webstyle.less')
  import {Group, Cell} from 'vux'
  import * as storeTypes from '../../store/types'
//  const jsonp = require('jsonp')
  import { hexSha1, sha1VmTest } from './sha1'
//  import AppConstant from '../../global/constants/AppConstant'
  export default{
    components: {Group, Cell},
    data () {
      return {
        needCompleteOrderList: []
      }
    },
    methods: {
      imgUserHeader () {
        let user = this.$store.getters.userInfo
        if (user && user.displayPhotoUrl) {
          if (user.displayPhotoUrl.trim() !== '') {
            return user.displayPhotoUrl
          }
        }
        return require('../../../design/images/default-user-img.jpg')
      },
      jumpTo (name) {
        this.$router.push('/' + name)
      },
      /**
       * 是否显示菜单 点击事件
       */
      drawerVisibilityEvent () {
        this.$store.commit(storeTypes.GLOBAL_SET_DRAWER, true)
      },
      changeUserIcon () {
        this.getJsApiTicket()
      },
      selectPicture (type) {
        var self = this
        console.log(this.$wechat)
        this.$wechat.ready(function () {
          this.$wechat.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (resImage) {
              self.$wechat.getLocalImgData({
                localId: resImage.localIds[0],
                success: function (res) {
                  var localData = res.localData
                  if (window.__wxjs_is_wkwebview) { // 如果是IOS，需要去掉前缀
                  } else {
                    // android
                    localData = 'data:image/png;base64,' + localData
                  }
                  console.log(localData)
//                  let pic = convertImgDataToBlob(localData)
//                  console.log(pic)
                },
                error: function (res) {
                  console.log('===============res:' + res)
                  this.toast('选择图片失败')
                }
              })
            },
            error: function (res) {
              this.toast('选择图片失败')
            }
          })
        })
        self.$wechat.error(function (res) {
          console.log('===============res:' + res)
          this.toast('选择图库失败')
        })
      },
      getJsApiTicket () {
        this.getSignText()
      },
      getSignText () {
        this.ticket = 'HoagFKDcsGMVCIY2vOjf9lNTJ_yObNfijBLsXsH5GxL2unIfS-u3ohbMa6S5gUiKIHQHw56i1xgXzbGT-Nz_Ug'
        var timestamp = (new Date()).valueOf()
        console.log(timestamp)
        var ranndomString = this.randomString(16)
        console.log(ranndomString)
        let primaryString = 'jsapi_ticket=' + this.ticket + '&' + 'noncestr=' + ranndomString + '&' + 'timestamp=' + timestamp + '&' + 'url=' + 'http://www.fjhb.cn'
        console.log(primaryString)
        let changedString = hexSha1(primaryString)
        sha1VmTest()
        console.log(changedString)
        this.$wechat.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wx518a0d261d147f36', // 必填，公众号的唯一标识
          timestamp: 1511938133, // 必填，生成签名的时间戳
          nonceStr: '8nxBSdAnWKRSyGwf', // 必填，生成签名的随机串
          signature: '51e9f65a9e92cde7321e8f2f7e5eb712b63c1620', // 必填，签名，见附录1
          jsApiList: ['chooseImage', 'previewImage', 'uploadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        this.selectPicture(0)
      },
      randomString (len) {
        len = len || 32
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        /** 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1**/
        var maxPos = $chars.length
        var randomString = ''
        for (let i = 0; i < len; i++) {
          randomString += $chars.charAt(Math.floor(Math.random() * maxPos))
        }
        return randomString
      },
      gotoCompleteOrder () {
        this.$store.commit(storeTypes.COMPLETE_ORDER_NEED_INVOICE, false)
        this.push({ path: '/completeOrder', query: {path: '/demo/mine', orderList: this.needCompleteOrderList} })
      }
    },
    mounted () {
      //  若用户信息为空，则重新加载用户数据
      if (this.$store.getters.userInfo.userName === undefined) {
        // debugger
        this.$store.dispatch(storeTypes.ACCOUNT_GET_USERINFO).then(data => {
          if (data.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
            this.toast(data.head.message)
          }
        })
      }
      this.$store.dispatch(storeTypes.ORDER_GET_NEED_COMPLETE_ORDER_LIST).then(data => {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          if (data.data.orderList.length > 0) {
            for (var i = 0; i < data.data.orderList.length; i++) {
              this.needCompleteOrderList.push(data.data.orderList[i].orderNumber)
            }
          }
        } else {
          this.toast(data.head.message)
        }
      })
      let params = {}
      this.$store.dispatch(storeTypes.ACCOUNT_GET_RECEIPTINFO, params).then((data) => {
        if (data.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
          this.toast(data.head.message)
        } else {
          console.log(data)
        }
      }).catch(e => {
        console.log('>>' + e)
      })
    }
  }
</script>
