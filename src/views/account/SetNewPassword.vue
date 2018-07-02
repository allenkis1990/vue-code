<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-left">
        <a class="hb-ico ico-menu"></a>
      </div>
      <div class="header-tit">忘记密码</div>
      <div class="header-right">
        <a class="header-txt"><span @click="() => {this.push('/loginByPassword')}">登录</span>/<span @click="() => {this.push('/regiter')}">注册</span></a>
      </div>
    </div>
    <!--标题栏-->
    <div class="hb-form-cells mt150">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label">新密码</span></div>
          <div class="weui-cell__bd"><input type="password" placeholder="请输入6~18位由字母、数字组成的密码" class="weui-input" v-model="info.password"/></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label">确认密码</span></div>
          <div class="weui-cell__bd"><input type="password" placeholder="请再次输入密码" class="weui-input" v-model="againPassword"/></div>
        </div>
      </div>
      <div class="btn-primary mt80" @click="setNewPassword">提交新密码</div>
    </div>
  </div>
</template>
<script>
  import * as storeTypes from '../../store/types'
  export default {
    data () {
      return {
        info: {
          password: ''
        },
        againPassword: ''
      }
    },
    methods: {
      checkInfoAndToast () {
        if (!this.info.password) {
          this.toast('密码不能为空')
          return false
        }
        if (this.info.password.length && (this.info.password.length > 18 || this.info.password.length < 6)) {
          this.toast('请输入6到18位密码')
          return false
        }
        if (!this.againPassword) {
          this.toast('确认密码不能为空')
          return false
        }
        if (this.againPassword.length && (this.againPassword.length > 18 || this.againPassword.length < 6)) {
          this.toast('请输入6到18位确认密码')
          return false
        }
        if (this.info.password !== this.againPassword) {
          this.toast('密码前后不一致，请核查！')
          return false
        }
        return true
      },
      setNewPassword () {
        if (this.checkInfoAndToast()) {
          let params = {
            identityCardNo: this.$route.query.identityCardNo,
            password: this.info.password
          }
          this.$store.dispatch(storeTypes.SET_NEW_PASSWORD, params).then(data => {
            this.hideLoading()
            if (data.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
              return this.toast(data.head.message)
            }
            this.replace('/loginByPassword')
          }).catch(e => {
            this.hideLoading()
            console.log(e)
          })
        }
      }
    }
  }
</script>
