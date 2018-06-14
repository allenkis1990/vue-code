import * as storeTypes from '../types'
import { request } from '../fetch'
const state = {
  certificateList: [],
  certificateDetail: {},
  isEmptyData: false
}

const getters = {
  certificateList (state) {
    return state.certificateList
  },
  certificateDetail (state) {
    return state.certificateDetail
  },

  isEmptyData (state) {
    if (state.certificateList.length > 0) {
      state.isEmptyData = false
    } else {
      state.isEmptyData = true
    }
    return state.isEmptyData
  }
}

const mutations = {
  [storeTypes.CER_REQUEST_CER_LIST] (state, certificateList) {
    state.certificateList = certificateList
  },
  [storeTypes.CER_REQUEST_CER_DETAIL] (state, certificateDetail) {
    state.certificateDetail = certificateDetail
  }
}

const actions = {
  // 请求证明列表
  [storeTypes.CER_REQUEST_CER_LIST] ({commit}, jsonObj) {
    var url = 'mobile/user/mobileTrainingCertify/getCertifiedList'
    // 网络请求
    return request('GET', jsonObj, url).then(function (data) {
      if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
        commit(storeTypes.CER_REQUEST_CER_LIST, data.data.certificateList)
        return (data)
      } else {
        return (data)
      }
    }, function (data) {
      return ({head: {code: 700, message: '请求失败'}})
    })
  },

  // 请求证明详情
  [storeTypes.CER_REQUEST_CER_DETAIL] ({commit}, jsonObj) {
    var url = 'mobile/user/mobileTrainingCertify/getCertifiedDetail'
    return request('GET', jsonObj, url).then(function (data) {
      if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
        commit(storeTypes.CER_REQUEST_CER_DETAIL, data.data)
        return (data)
      } else {
        return (data)
      }
    }, function (data) {
      return ({head: {code: 700, message: '请求失败'}})
    })
  },
  // 能否打印证书
  [storeTypes.CAN_PRINT_CER] ({commit}, jsonObj) {
    var url = 'mobile/user/mobileTrainingCertify/canPrintCertificate'
    return request('GET', jsonObj, url).then(function (data) {
      return data;
    }, function (data) {
      return ({head: {code: 700, message: '请求失败'}})
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
