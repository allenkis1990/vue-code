<template>
  <div class="container bg-w">
    <div class="hb-form-cells">
      <h1>欢迎登录</h1>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">帐号</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" placeholder="请输入身份证号/手机号" v-model="user.account">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="password" placeholder="请输入密码" v-model="user.password">
          </div>
        </div>
      </div>
      <div class="form-other mt15">
        <!-- <div class="tr a-forget" @click="forgetPasswordEvent">
          <a href="javascript:;">忘记密码?</a>
        </div> -->
      </div>
      <a href="javascript:;" :class="registerStyle" @click="loginEvent">立即登录</a>
      <a href="javascript:;" class="a-txt mt25" @click="registerEvent">新用户注册</a>
    </div>
  </div>
</template>

<style lang="less">
  @import "../../../node_modules/vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
  @import "../../../design/styles/webstyle.less";
</style>
<script>
  import * as storeTypes from '../../store/types'
  import LoginUtil from '../../common/core/Login'
  import AppConstant from '../../global/constants/AppConstant'

  export default {
    compents: {},
    computed: {
      registerStyle () {
        if (this.showLoginUI) {
          return ['weui-btn', 'weui-btn_primary', 'mt25']
        }
        return ['weui-btn', 'weui-btn_primary', 'mt25', 'disabled']
      }
    },
    watch: {
      user: {
        handler: function (val, oldval) {
          if (val.account.length > 0 &&
            val.password.length > 0) {
            this.showLoginUI = true
          } else {
            this.showLoginUI = false
          }
        },
        deep: true //  对象内部的属性监听，也叫深度监听
      }
    },
    data () {
      return {
        user: {
          account: '',
          password: ''
        },
        showLoginUI: false
      }
    },
    created () {},
    methods: {
      registerEvent () {
        this.push('/regiter')
      },
      loginEvent () {
        if (!this.showLoginUI) return

        let passwordLength = this.user.password.length
        let accountLengh = this.user.account.length
        if (accountLengh === 0 || accountLengh === undefined || accountLengh === null ||
          accountLengh > 11) {
          if (accountLengh > 18 || accountLengh < 15 || accountLengh === 16 || accountLengh === 17) {
            this.toast('请输入18位身份证号码')
            return
          }
        } else if (accountLengh < 11) {
          this.toast('请输入11位手机号')
          return
        }
        if (passwordLength === 0 || passwordLength < 6 || passwordLength > 18) {
          this.$vux.toast.text('请输入6-18位密码')
          return
        }
        this.WXAcountRequest()
      },
      /**
       * 第一步 平台账号和微信openID和unionID
       */
      WXAcountRequest () {
        let params = {
          account: this.user.account,
          password: this.user.password,
          unionId: this.getCookie(AppConstant.cookie.unionId),
          openId: this.getCookie(AppConstant.cookie.openId),
          accessToken: this.getCookie(AppConstant.cookie.accessToken)
        }
        this.$store.dispatch(storeTypes.ACCOUNT_BIND_WX, params).then(data => {
          // 604微信号和账号一致  605 账号已经绑定其他账号
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS || data.head.code === 604) {
            return this.login()
          } else if (data.head.code === 602) {
            this.toast('微信账号已关联其他账号，无法登陆！请使用与该微信好绑定的账号登陆！')
          } else if (data.head.code === 605) {
            this.toast('该账号已关联其他微信账号，无法登陆！请使用与该账号绑定的微信号登陆！')
          } else {
            this.toast(data.head.message)
          }
          console.log(data)
        }).catch(e => {
          console.log(e)
        })
      },
      /**
       * 第二步 登录
       */
      login () {
        this.showLoading('登录中......')
        LoginUtil.login(this.getCookie(AppConstant.cookie.openId), this.getCookie(AppConstant.cookie.unionId), this.getCookie(AppConstant.cookie.accessToken), this.getCookie(AppConstant.cookie.nickname), this, console, storeTypes).then(data => {
          this.hideLoading()
          if (data !== undefined && data !== null && data.state === true) {
            this.$store.commit(storeTypes.GLOBAR_LOGIN_SET, true)
            this.setCookie(AppConstant.cookie.account, this.user.account)
            this.setCookie(AppConstant.cookie.password, this.user.password)
            let url = this.getCookie(AppConstant.cookie.beforeLoginUrl)
            if (url === undefined || url.length <= 0) {
              this.replace(this.pages.Home)
            } else {
              this.replace(url)
            }
          } else {
            if (data !== undefined && data !== null) {
              this.toast(data.message)
            } else {
              this.toast('登录失败')
            }
          }
        }).catch(e => {
          this.hideLoading()
          console.log('---------------------登录异常-----------------' + e)
          this.toast('登录失败')
        })
      },
      /**
       * 忘记密码事件
       */
      forgetPasswordEvent () {
        this.push('/forgotPassword')
      }
    },
    mounted () {

    }
  }

</script>
