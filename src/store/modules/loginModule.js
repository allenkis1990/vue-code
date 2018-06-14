/**
 * Created by admin on 2017/11/8.
 */
import * as storeTypes from '../types'
import { fetchLogin } from '../fetch'
import AppConstant from '../../global/constants/AppConstant'

const state = {}
const actions = {
  // 登录
  [storeTypes.LOGIN_LOGIN] ({commit, dispatch, state}, obj) {
    let loginUrl = AppConstant.apiUrl.casModule.login
    let ssoUrl = AppConstant.apiUrl.casModule.sso
    let casUrl = AppConstant.sysContext.casHost
    let serverUrl = AppConstant.sysContext.apiPlatformHost
    // 【第一步】url
    let firstUrl = casUrl + loginUrl
    let target = serverUrl + ssoUrl
    let requestUrl = firstUrl + '?' + 'TARGET=' + target + '&' + 'js=' + ''
    return dispatch(storeTypes.LOGIN_REQUEST, requestUrl)
      .then((data) => {
        return (data)
      }).catch(e => {
        console.log('>>' + e)
      })
  },
  /**
   * cas的第一步网络请求
   * @param commit
   * @param requestObj
   */
  [storeTypes.LOGIN_REQUEST] ({commit}, requestUrl) {
    return fetchLogin(requestUrl).then(function (data) {
      return data
    }, function (data) {
      return ({head: {code: 700, message: '请求失败'}})
    })
  },
  /**
   * 增加加载状态计数
   * @param commit
   * @param message
   */
  [storeTypes.LOGIN_ADD_LOADING] ({commit}, message) {
    commit(storeTypes.LOGIN_ADD_LOADING, message)
  },

  /**
   * 消减加载状态计数
   * @param commit
   */
  [storeTypes.LOGIN_REMOVE_LOADING] ({commit}) {
    commit(storeTypes.LOGIN_REMOVE_LOADING)
  }
}
const mutations = {}
const getters = {}
export default {
  state,
  getters,
  actions,
  mutations
}
