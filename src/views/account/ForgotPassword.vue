<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-left">
        <a class="hb-ico ico-menu"></a>
      </div>
      <div class="header-tit">忘记密码</div>
      <div class="header-right">
        <a class="header-txt" ><span @click="() => {this.push('/loginByPassword')}">登录</span>/<span @click="() => {this.push('/regiter')}">注册</span></a>
      </div>
    </div>
    <!--标题栏-->
    <div class="hb-form-cells mt150">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label">身份证</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请输入身份证号" class="weui-input" v-model="identityCardNo" /></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label">姓名</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请输入姓名" class="weui-input" v-model="userName" /></div>
        </div>
      </div>
      <div class="btn-primary mt80" @click="submit">找回密码</div>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
  @import "../../../design/styles/webstyle.less";
</style>
<script>
  import * as storeTypes from '../../store/types'
  
  export default {
    data () {
      return {
        userName: '',
        identityCardNo: ''
      }
    },
    methods: {
      backEvent () {
        this.back()
      },
      checkInfoAndToast () {
        if (!this.identityCardNo) {
          this.toast('身份证不能为空')
          return false
        }
        if (this.identityCardNo.length && this.identityCardNo.length !== 18) {
          this.toast('请输入18位身份证号')
          return false
        }
        if (!this.userName) {
          this.toast('姓名不能为空')
          return false
        }
        return true
      },
      submit () {
        if (!this.checkInfoAndToast()) {
          return
        }
        let params = {
          userName: this.userName,
          identityCardNo: this.identityCardNo
        }
        this.$store.dispatch(storeTypes.ACCOUNT_RESET_PASSWORD_REQUEST, params).then(data => {
          this.hideLoading()
          if (data.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
            return this.toast(data.head.message)
          }
          this.replace({
            path: '/setNewPassword',
            query: {
              identityCardNo: this.identityCardNo
            }
          }) // 设置新密码界面
        }).catch(e => {
          this.hideLoading()
          console.log(e)
        })
      }
    }
  }
</script>
