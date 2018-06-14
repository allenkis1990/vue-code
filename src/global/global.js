/**
 * Created by 46607 on 2017/7/8.
 */
import { cookie, querystring } from 'vux'
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
  methods: {
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
    }
  },
  AppConstant
}
