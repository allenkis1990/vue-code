<template>
  <!--// 登录-->
</template>
<script>
  import * as storeTypes from '../../store/types'
  import AppConstant from '../../global/constants/AppConstant'
  import LoginUtil from '../../common/core/Login'

  export default {
    data () {
      return {}
    },
    created () {
      this.handleCode()
    },
    methods: {
      /**
       * 网络    获取微信的unionId和openId数据
       * @param query
       */
      wxInfoRequest (query) {
        let params = {
          code: query.code
        }
        this.showLoading('加载中......')
        this.$store.dispatch(storeTypes.ACCOUNT_WX_INFO_REQUEST, params).then(data => {
          this.hideLoading()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.setCookie(AppConstant.cookie.openId, data.data.openId)
            this.setCookie(AppConstant.cookie.unionId, data.data.unionId)
            // window.localStorage.setItem(AppConstant.localStorage.unionId, data.data.unionId)
            // window.localStorage.setItem(AppConstant.localStorage.openId, data.data.openId)
            this.setCookie(AppConstant.cookie.accessToken, data.data.accessToken)
            this.setCookie(AppConstant.cookie.refreshToken, data.data.refreshToken)
            this.setCookie(AppConstant.cookie.nickname, data.data.nickname)
            this.hasBindWXRquest()
            return
          }
          console.log('---------------------获取微信的unionId和openId失败---------------------------------' + data)
        }).catch(e => {
          this.hideLoading()
          console.log('---------------------获取微信的unionId和openId异常---------------------------------- ' + e)
        })
      },
      /**
       * 判断是否走code授权流程
       */
      handleCode () {
        // 判断是否具有unionId和OpenId
        if (this.getUnionIDAndOpendIDFromCookie()) {
          this.requireWXAppId()
          return this.requireCheckBindWX()
        }
        // 是否用户授权
        if (this.getQuery().code) {
          this.wxInfoRequest(this.getQuery())
        } else {
          this.requireWXAppId()
          this.replace(this.pages.Login)
        }
      },
      /**
       * 网络请求 获取账号绑定微信账号
       * @param cookie
       */
      hasBindWXRquest () {
        let params = {
          unionId: this.getCookie(AppConstant.cookie.unionId),
          openId: this.getCookie(AppConstant.cookie.openId)
        }
        // let params = {
        //   unionId: window.localStorage.getItem(AppConstant.localStorage.unionId),
        //   openId: window.localStorage.getItem(AppConstant.localStorage.openId)
        // }
        this.showLoading('加载中......')
        this.$store.dispatch(storeTypes.ACCOUNT_WX_HASBIND_REQUEST, params).then(data => {
          this.hideLoading()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            // 微信账号是否绑定账号
            if (data.data.haveBind) {
              return this.login()
            } else {
              this.replace('/loginByPassword')
              return
            }
          }
          let url = this.getCookie(AppConstant.cookie.beforeLoginUrl)
          if (url === undefined || url.length <= 0 || url === this.pages.Home) {
            this.setCookie(AppConstant.cookie.beforeLoginUrl, window.location.href)
          }
          this.replace(this.pages.Login)
        }).catch(e => {
          this.hideLoading()
          console.log('--------------------------获取是否绑定微信异常----------------------------------' + e)
        })
      },
      /**
       * 登录
       */
      login () {
        this.showLoading('加载中......')
        let context = this
        LoginUtil.login(this.getCookie(AppConstant.cookie.openId), this.getCookie(AppConstant.cookie.unionId), this.getCookie(AppConstant.cookie.accessToken), this.getCookie(AppConstant.cookie.nickname), this, console, storeTypes).then(data => {
          this.hideLoading()
          if (data !== undefined && data !== null && data.state === true) {
            context.$store.commit(storeTypes.GLOBAR_LOGIN_SET, true)
//            context.replace(context.pages.Home)
            let url = context.getCookie(AppConstant.cookie.beforeLoginUrl)
            console.log(url);
            let tempUrl;
            if (url === undefined || url.length <= 0) {
              // this.replace(context.pages.Home)
              tempUrl = context.pages.Home
            } else {
              // this.replace(url)
              tempUrl = url
            }
            context.replace(tempUrl)
          } else {
            if (data !== undefined && data !== null) {
              context.toast(data.message)
            } else {
              context.toast('登录失败')
            }
            // 跳转到一个新界面，只要一个登录按钮，并执行登录
            context.replace(context.pages.Login)
          }
        }).catch(e => {
          context.hideLoading()
          console.log('---------------------登录异常-----------------' + e)
          context.toast('登录失败')
          context.replace(context.pages.Login)
        })
      },
      /**
       * 网络请求 获取微信APPID
       */
      requireWXAppId () {
        let params = {}
        this.$store.dispatch(storeTypes.ACCOUNT_WX_APPID_REQUEST, params).then(data => {
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.setCookie(AppConstant.cookie.appId, data.data.WXAppId)
          }
        }).catch(e => {
          console.log('e>>>>>' + e)
        })
      },
      /**
       * 第二步 判断是否绑定微信
       */
      requireCheckBindWX () {
        let params = {
          unionId: this.getCookie(AppConstant.cookie.unionId),
          openId: this.getCookie(AppConstant.cookie.openId)
        }
        // let params = {
        //   unionId: window.localStorage.getItem(AppConstant.localStorage.unionId),
        //   openId: window.localStorage.getItem(AppConstant.localStorage.openId)
        // }
        this.showLoading('加载中.......')
        this.$store.dispatch(storeTypes.ACCOUNT_WX_HASBIND_REQUEST, params).then(data => {
          this.hideLoading()
          // 判断微信是否绑定账号，有就直接登录，没有跳到注册
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            if (data.data.haveBind) {
              return this.login()
            } else {
              // 跳到注册页面
              this.replace('/loginByPassword')
              return
            }
          }
          this.replace(this.pages.Login)
        }).catch(e => {
          this.hideLoading()
          console.log(e)
          this.replace(this.pages.Login)
        })
      },
      /**
       * 历史路径
       */
      findBeforLoginUrl (index) {
        let url = this.getCookie(AppConstant.cookie.beforeLoginUrl)
        if (url === undefined || url.length <= 0) {
          if (index === 1) {
            this.replace(this.pages.Login)
          } else {
            this.replace(this.pages.Home)
          }
        } else {
          this.replace(url)
        }
      }
    }
  }
</script>
