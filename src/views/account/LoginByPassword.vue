<template>
  <div class="contain">
    <div class="hb-form-cells">
      <div class="tit-box">
        <div class="h1">欢迎登录</div>
        <div class="fs30 c9 mt5">Welcome to login</div>
      </div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label">帐号</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请输入身份证号" class="weui-input" v-model="info.account"/></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label">密码</span></div>
          <div class="weui-cell__bd"><input type="password" placeholder="请输入密码" class="weui-input" v-model="info.password"/></div>
        </div>
      </div>
      <div class="btn-primary mt80" @click="submit">立即登录</div>
      <div class="form-other mt60">
        <div class="weui-check__label cb" @click="() => {this.push('/regiter')}">注册新用户</div>
        <div class="tr a-forget" @click="() => {this.push('/forgotPassword')}">忘记密码?</div>
      </div>
      <div class="other-login"><span class="line"></span><span class="txt">微信授权登录</span><span class="line"></span></div>
      <div class="login-enter tc"><img class="img" src="../../../design/images/wx-icon.png" alt=" " @click="auth"/></div>
    </div>
    <img class="login-box-img" src="../../../design/images/login-pic.jpg" alt=""/>
  </div>
</template>
<style>
</style>
<script>
import * as storeTypes from '../../store/types';
import AppConstant from '../../global/constants/AppConstant';
import LoginUtil from '../../common/core/Login';

export default {
  data() {
    return {
      info: {
        account: '',
        password: ''
      }
    };
  },
  methods: {
    auth () {
      window.location.href = this.getCookie('authPath')
    },
    checkInfoAndToast () {
      if (!this.info.account) {
        this.toast('身份证号不能为空')
        return false
      }
      if (this.info.account.length && this.info.account.length !== 18) {
        this.toast('请输入18位身份证号')
        return false
      }
      if (!this.info.password) {
        this.toast('密码不能为空')
        return false
      }
      if (this.info.password.length && (this.info.password.length > 18 || this.info.password.length < 6)) {
        this.toast('请输入6-18位密码')
        return false
      }
      return true
    },
    submit() {
      if (this.checkInfoAndToast()) {
        this.accountHasBindWx();
      }
    },
    accountHasBindWx() {
      let params = {
        account: this.info.account,
        password: this.info.password,
        openId: this.getCookie(AppConstant.cookie.openId),
        unionId: this.getCookie(AppConstant.cookie.unionId),
        registerChannel: '3'
      };
      this.$store
        .dispatch(storeTypes.ACCOUNT_HAS_BIND_WX, params)
        .then((data) => {
          this.hideLoading();
          switch (data.head.code) {
            case storeTypes.NETWORK_RESULT_SUCCESS:
              this.login();
              break;
            case '601':
              this.toast('账号错误');
              break;
            case '602':
              this.toast('密码错误');
              break;
            case '603':
              this.toast('该微信号被其他账号绑定');
              break;
            case '604':
              this.toast(
                '该账号已关联了其他微信账号，无法登录！请使用与该微信号绑定的账号登录！'
              );
              break;
            default:
              this.toast(data.head.message);
          }
        })
        .catch(e => {
          this.hideLoading();
          console.log(e);
        });
    },
    login() {
      this.showLoading('加载中......');
      let context = this;
      LoginUtil.login(
        this.getCookie(AppConstant.cookie.openId),
        this.getCookie(AppConstant.cookie.unionId),
        this.getCookie(AppConstant.cookie.accessToken),
        this.getCookie(AppConstant.cookie.nickname),
        this,
        console,
        storeTypes
      ).then(data => {
        this.hideLoading();
        if (data !== undefined && data !== null && data.state === true) {
          context.$store.commit(storeTypes.GLOBAR_LOGIN_SET, true);
          let url = context.getCookie(AppConstant.cookie.beforeLoginUrl);
          let tempUrl;
          if (url === undefined || url.length <= 0) {
            tempUrl = context.pages.Home;
          } else {
            tempUrl = url;
          }
          context.replace(tempUrl)
        } else {
          if (data !== undefined && data !== null) {
            context.toast(data.message);
          } else {
            context.toast('登录失败');
          }
            // 跳转到一个新界面，只要一个登录按钮，并执行登录
          context.replace(context.pages.Login);
        }
      })
        .catch(e => {
          context.hideLoading();
          console.log('---------------------登录异常-----------------' + e);
          context.toast('登录失败');
          context.replace(context.pages.Login);
        });
    }
  }
};
</script>
