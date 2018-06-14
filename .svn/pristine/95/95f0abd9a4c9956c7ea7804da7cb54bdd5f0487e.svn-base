/**
 * Created by 46607 on 2017/6/26.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import { cookie, querystring } from 'vux'
import modules from './modules/modules'

Vue.use(Vuex)
const query = querystring.parse(window.location.search.replace(/^\?/, ''))
let AppId
let cookieAppId = cookie.get('appId')
if (cookieAppId && cookieAppId !== 'undefined' && cookieAppId !== null && cookieAppId !== 'null') {
  if (query.appId && query.appId !== cookieAppId) {
    cookie.remove('appId')
    cookie.set('appId', query.appId)
    AppId = query.appId
  } else {
    AppId = cookieAppId
  }
} else {
  AppId = query.appId
  cookie.remove('appId')
  cookie.set('appId', query.appId)
}

const store = new Vuex.Store({
  actions,
  mutations,
  getters,
  state: {
    navTabDirection: true,
    animationsName: 'router',
    tabIndex: 1,
    weixin: {
      appId: AppId
    },
    rootInfo: {
      userInfo: {}
    },
    systemConfig: undefined,
    isLoading: false,
    direction: 'forward',
    appInfo: {
      title: '我是title1' // 页面标题，提供给浏览器显示
    },
    drawerVisibility: false,
    loadInfo: {isLoading: false, text: ''},
    hasLogin: false,
    fiterPath: ['/classDetail'],
    serverContextInfo: {}
  },
  modules: modules
})
export default store
