import * as storeTypes from './types'
import { request } from './fetch'

export default {
  [storeTypes.GLOBAL_CHANGENAV] (mutation, index) {
    mutation.commit('changeNav', index)
  },
  [storeTypes.GLOBAL_SET_CURRENTUSER] (mutation, info) {
    mutation.commit('login', info)
  },
  [storeTypes.GLOBAL_SET_TITLE] (mutation, info) {
    mutation.commit('setTitle', info)
  },
  [storeTypes.GLOBAL_ADD_LOADING] (mutation, text) {
    mutation.commit(storeTypes.GLOBAL_ADD_LOADING, text)
  },
  [storeTypes.GLOBAL_REMOVE_LOADING] (mutation) {
    mutation.commit(storeTypes.GLOBAL_REMOVE_LOADING)
  },
  [storeTypes.GLOBAL_GET_AREA_INFO] (mutation) {
    let type = 'GET'
    let url = 'mobile/home/mobileHome/findRegion'
    return request(type, {}, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  [storeTypes.GLOBAR_GET_SERVE_CONTEXT] (mutation, param) {
    let type = 'POST'
    let url = 'mobile/home/mobileRegister/getServeContext'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          mutation.commit(storeTypes.GLOBAR_SET_SERVE_CONTEXT, data.data)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  }
}
