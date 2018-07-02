/**
 * Created by 46607 on 2017/7/8.
 */
import { cookie, querystring, AjaxPlugin } from 'vux'
import AppConstant from './constants/AppConstant'
import * as storeTypes from '../store/types'

const fiterPath = ['']
// 登录后跳转方法
export default {
  cookie: cookie,
  fiterPath: fiterPath,
  data () {
    return {
      pages: { // 页面
        Home: '/demo/home', // 首页
        Login: '/login', // 登录页
        AuthLogin: '/authLogin' // 自动登录
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    let isLoading = this.$store.state.loadInfo.isLoading
    if (isLoading) {
      this.hideLoading()
    }
    next()
  },
  methods: {
    setHeaderDomain (domain) {
      AjaxPlugin.$http.defaults.headers.post['Hb-Domain-Path'] = domain
      AjaxPlugin.$http.defaults.headers.get['Hb-Domain-Path'] = domain
    },
    showLoading (text) {
      this.$store.dispatch(storeTypes.GLOBAL_ADD_LOADING, text)
    },
    hideLoading () {
      this.$store.dispatch(storeTypes.GLOBAL_REMOVE_LOADING)
    },
    toast (text) {
      if (text === undefined || text === '') {
        return
      }
      this.$vux.toast.text(text, 'middle')
    },
    push (params) {
      this.$router.push(params)
    },
    replace (params) {
      this.$router.replace(params)
    },
    back () {
      this.$router.back()
    },
    backTop () {
      document.body.scrollTop = 0
    },
    setCookie () {
      return cookie.set.apply(this, arguments)
    },
    getCookie () {
      return cookie.get.apply(this, arguments)
    },
    removeCookie (key, options) {
      return cookie.remove(key, options)
    },
    getQuery () {
      return querystring.parse(window.location.search.replace(/^\?/, ''))
    },
    getUnionIDAndOpendIDFromCookie () {
      let unionId = this.getCookie(AppConstant.cookie.unionId)
      let openId = this.getCookie(AppConstant.cookie.openId)
      // let unionId = window.localStorage.getItem(AppConstant.localStorage.unionId)
      // let openId = window.localStorage.getItem(AppConstant.localStorage.openId)
      if (openId === undefined || unionId === undefined || openId.length === 0 || unionId === 0) {
        return false
      }
      return true
    },
    getAccountAndPasswordFormCookie () {
      let account = this.getCookie(AppConstant.cookie.account)
      let password = this.getCookie(AppConstant.cookie.password)
      if (account === undefined || password === undefined || account.length === 0 || password === 0) {
        return false
      }
      return false
    },
    goBeforeUrl () {
      let url = this.getCookie(AppConstant.cookie.beforeLoginUrl)
      if (!url || url.indexOf(this.pages.AuthLogin) !== -1) {
        this.$router.push(this.pages.Home)
      } else {
        this.$router.push({
          path: url
        })
        this.removeCookie(AppConstant.cookie.beforeLoginUrl)
      }
    },
    ajaxGet (url, options) {
      return this.$http.get(url, options)
        .then((data) => {
          return data
        }, (error, config) => {
          console.log(error, config)
        })
    },
    ajaxPost (url, options) {
      return this.$http.post(url, options)
        .then((data) => {
          return data
        })
    },
    errorInfo (message) {
      this.$vux.toast.show({
        type: 'text',
        width: '20em',
        text: `<span style="padding: 15px;word-break: break-all;box-sizing: border-box;display: inline-block;">${message}</span>`
      })
    },
    /**
     * 复制文字
     */
    copyArticle (txt) {
      var range = document.createRange()
      var copyContent = document.getElementById('copyArticle')
      copyContent.innerText = txt
      console.log(copyContent)
      range.selectNode(copyContent)
      var selection = window.getSelection()
      if (selection.rangeCount > 0) selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('copy')
      this.toast('复制成功！')
//        console.log('复制成功！')
    },
    commonConfirm (that,data) {
      that.$vux.confirm.show({
        title: '提示',
        content: data.head.message,
        confirmText: '知道了',
        cancelText: '复制域名',
        onCancel: function () {
          console.log('取消删除')
          that.copyArticle(data.data)
        },
        onConfirm: function () {
          console.log('确认删除')
        }
      })
    }
  },
  AppConstant
}
