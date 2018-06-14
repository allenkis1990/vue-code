<template>
  <div class="container">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-left" @click="back()">
        <a href="javascript:void(0);" class="hb-ico ico-return"></a>
      </div>
      <div class="header-tit">证明详情</div>
      <div class="header-right" v-if="showSaveButton" @click="saveCertificateAction()">
        <a href="javascript:void(0);" class="hb-ico ico-save"></a>
      </div>
    </div>

    <div class="hb-wrap-box" v-if="isCanSave">
      <scroller lock-x scrollbar-y :height="scrollerHeight">
        <div class="image-box">
          <img class="image-content" :src="certificateImageUrl">
        </div>
      </scroller>
    </div>

    <!--标题栏-->
    <div class="hb-wrap-box" v-if="!isCanSave">
      <!--培训证明-->
      <scroller lock-x scrollbar-y :height="scrollerHeight">
        <div style="padding-bottom: 12px">
          <div>
            <div class="prove-detail-box">
              <div class="prove-row">
                <span class="prove-detail-tit">主办单位</span>
                <span class="prove-detail-info">四川省建设岗位培训与执业资格注册中心</span>
              </div>
              <div class="prove-row">
                <span class="prove-detail-tit">学习形式</span>
                <span class="prove-detail-info">培训班</span>
              </div>
              <div class="prove-row">
                <span class="prove-detail-tit">姓<span class="w-1"></span>名</span>
                <span class="prove-detail-info">{{certificationDetail.userName}}</span>
              </div>
              <div class="prove-row">
                <span class="prove-detail-tit">起止日期</span>
                <span class="prove-detail-info">{{certificationDetail.beginAndEndDate}}</span>
              </div>
              <div class="prove-row">
                <span class="prove-detail-tit pd-tit-1">培训主要内容</span>
                <span class="prove-detail-tit pd-tit-2">成绩</span>
                <span class="prove-detail-tit no-bor pd-tit-2">学习</span>
              </div>

              <!-- 一行证明内容 -->
              <div class="prove-row">
                <div class="prove-detail-info pd-info-2 bor-r">
                  <span class="pd-tit-3">{{certificationDetail.className}}</span>
                </div>
                <div class="prove-detail-info pd-info-1 bor-r">
                  <span class="pd-tit-4">合格</span>
                </div>
                <div class="prove-detail-info pd-info-1">
                  <span class="pd-tit-4">{{certificationDetail.credit}}</span>
                </div>
              </div>


              <!--<div class="prove-row">-->
              <!--<div class="prove-detail-info pd-info-2 bor-r">-->
              <!--<span class="pd-tit-3">2017年度初级专业技术人员2017年度初级专业技术人员</span>-->
              <!--</div>-->
              <!--<div class="prove-detail-info pd-info-1 bor-r">-->
              <!--<span class="pd-tit-4">合格</span>-->
              <!--</div>-->
              <!--<div class="prove-detail-info pd-info-1">-->
              <!--<span class="pd-tit-4">72</span>-->
              <!--</div>-->
              <!--</div>-->

              <div class="prove-row" v-for="item in 2" :key="item">
                <div class="prove-detail-info pd-info-2 bor-r">
                  <span class="pd-tit-3"></span>
                </div>
                <div class="prove-detail-info pd-info-1 bor-r">
                  <span class="pd-tit-4"></span>
                </div>
                <div class="prove-detail-info pd-info-1">
                  <span class="pd-tit-4"></span>
                </div>
              </div>

              <div class="prove-row">
                <div class="opinion-tit-box bor-r">
                  <span class="prove-opinion-tit">单位意见</span>
                </div>
                <div class="prove-opinion-box">
                  <span
                    class="prove-date">{{certificationDetail.endingYear}}年{{certificationDetail.endingMonth}}月{{certificationDetail.endingDay}}日</span>
                  <img class="qrcode" :src="setQrcodeImage()">
                </div>
              </div>

            </div>
          </div>
        </div>
        <!--/班级列表-->
      </scroller>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
  @import "../../../design/styles/webstyle.less";
  .image-box {
    width: 100%;
    background-color: white;
  }

  .image-content {
    text-align: center;
    margin-top: -15px;
    margin-bottom: 12px;
    width: 98%;
    height: 100%;
    margin: -15px 1% 12px 1%;
  }
</style>
<script>
  import * as types from '../../store/types'
  import { Scroller, AjaxPlugin } from 'vux'
  import AppConstant from '../../global/constants/AppConstant'

  export default {
    computed: {},
    data () {
      return {
        certificationDetail: {},
        scrollerHeight: '',
        requestPicModel: {
          download: false,
          fileType: 'png',
          model: {},
          templateUrl: '',
          qrcodeText: '',
          qrcodePngPath: '',
          userDetail: {
            platformId: '',
            uniqueId: '',
            userId: ''
          }
        },
        serverContextInfo: null,
        certificateImageUrl: '',
        isCanSave: true,
        showSaveButton: false
      }
    },
    components: {Scroller},
    methods: {
      setQrcodeImage () {
        if (this.certificationDetail.qrcodePngPath === null || this.certificationDetail.qrcodePngPath === undefined || this.certificationDetail.qrcodePngPath.trim() === '') {
          return ''
        } else {
          return this.certificationDetail.qrcodePngPath
        }
      },
      saveCertificateAction () {
        this.$vux.alert.show({
          title: '提示',
          content: '请长按图片进行保存证书！',
          onShow () {
          },
          onHide () {
          }
        })
      },
      generateImageUrlFirst () {
        if (this.certificationDetail.userName === undefined) {
          return
        }
        if (this.serverContextInfo === null) {
          return
        }
        let self = this
        self.requestPicModel.model = this.certificationDetail
        self.requestPicModel.userDetail.uniqueId = self.GETGUID()
        self.requestPicModel.userDetail.userId = this.$store.getters.userInfo.userId
        self.requestPicModel.userDetail.platformId = this.serverContextInfo.platformId
        self.requestPicModel.templateUrl = this.certificationDetail.templateUrl
        self.requestPicModel.qrcodeText = this.certificationDetail.qrcodeText
        this.getPicUrl(JSON.stringify(self.requestPicModel))
      },
      getPicUrl (formData) {
        let self = this
        let requestUrl = this.serverContextInfo.generateCerPicDomain
        AjaxPlugin.$http({
          method: 'POST',
          url: requestUrl,
          timeout: 10000,
          data: formData,
          withCredentials: false,
          dataType: 'json',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          self.certificateImageUrl = AppConstant.sysContext.apiPlatformHost + response.data.info.resourceUrl + response.data.info.path
          self.showSaveButton = true
        })
      },
      GETGUID: function () {
        var guid = ''
        for (var i = 1; i <= 32; i++) {
          var n = Math.floor(Math.random() * 16.0).toString(16)
          guid += n
          if (i === 8 || i === 12 || i === 16 || i === 20) {
            guid += '-'
          }
        }
        return guid
      }
    },
    mounted () {
      this.showLoading('数据加载中...')
      this.scrollerHeight = ((window.outerHeight - 45) || (window.innerHeight - 45)) + 'px'
      // 获取上下文信息
      let self = this
      self.$store.dispatch(types.GLOBAR_GET_SERVE_CONTEXT, {}).then(data => {
        if (data.head.code !== types.NETWORK_RESULT_SUCCESS) {
          this.toast(data.head.message)
        } else {
          self.serverContextInfo = self.$store.getters.serverContextInfo
          self.generateImageUrlFirst()
        }
      }).catch(e => {
        console.log('>>' + e)
      })
      // 获取证明详情信息
      let param = {certificateId: this.$route.query.certificateId}
      self.$store.dispatch(types.CER_REQUEST_CER_DETAIL, param).then(data => {
        this.hideLoading()
        if (data.head.code !== types.NETWORK_RESULT_SUCCESS) {
          this.toast(data.head.message)
        } else {
          self.certificationDetail = self.$store.state.certificationModule.certificateDetail
          self.generateImageUrlFirst()
        }
      }).catch(e => {
        console.log('>>' + e)
      })
    }
  }
</script>
