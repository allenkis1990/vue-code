import * as storeTypes from '../types'
import { request } from '../fetch'
import AppConstant from '../../global/constants/AppConstant'

const state = {
  validateCodeImageUrl: '',
  WXAppId: '',
  WXInfo: '',
  userInfo: {},
  userReceiptInfo: {},
  regionData: []
}
const actions = {
  /**
   * 获取用户信息
   */
  [storeTypes.ACCOUNT_GET_USERINFO] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/userInfo/getUserInfo'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          commit(storeTypes.ACCOUNT_SET_USERINFO, data.data.userInfo)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  /**
   * 更新用户信息
   */
  [storeTypes.ACCOUNT_UPDATE_USERINFO] ({commit}, param) {
    var type = 'POST'
    var url = 'mobile/user/userInfo/updateUserInfo'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          commit(storeTypes.ACCOUNT_SET_USERINFO, data.data.userInfo)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  /**
   * 获取微信appId
   */
  [storeTypes.ACCOUNT_WX_APPID_REQUEST] ({commit}, params) {
    var type = 'post'
    var url = 'mobile/home/mobileHome/getSystemConstants'
    let param = {}
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          commit(storeTypes.ACCOUNT_WX_APPID_SET, data.data)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  /**
   * 获取微信openId和unionIds
   */
  [storeTypes.ACCOUNT_WX_INFO_REQUEST] ({commit}, params) {
    var type = 'post'
    var url = 'mobile/home/mobileRegister/getWXInfo'
    let param = {
      code: params.code,
      type: '0'
    }
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          commit(storeTypes.ACCOUNT_WX_INFO_SET, data.data)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  /**
   * 账号绑定微信号
   */
  [storeTypes.ACCOUNT_BIND_WX] ({commit}, params) {
    var type = 'post'
    var url = 'mobile/home/mobileRegister/bindWeiXin'
    let param = {
      account: params.account,
      password: params.password,
      unionId: params.unionId,
      openId: params.openId,
      accessToken: params.accessToken
    }
    return request(type, param, url)
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
  /**
   * 获取微信是否绑定
   */
  [storeTypes.ACCOUNT_WX_HASBIND_REQUEST] ({commit}, params) {
    var type = 'post'
    var url = 'mobile/home/mobileRegister/haveBindWeiXin'
    let param = {
      unionId: params.unionId,
      openId: params.openId,
      type: 0
    }
    return request(type, param, url)
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
  /**
   * 判断账号是否可用
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
  [storeTypes.ACCOUNT_CHECK_REGISTE_REQUEST] ({commit}, params) {
    let type = 'post'
    let url = 'mobile/home/mobileLogin/checkRegiste'
    let param = {
      account: params.account,
      password: params.password
    }
    return request(type, param, url)
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
  /**
   * 退出账号
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
  [storeTypes.ACCIYBT_EXIT] ({commit}, params) {
    let type = 'get'
    let url = 'mobile/user/userInfo/loginOut'
    let param = {}
    return request(type, param, url)
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

  /**
   * 获取短信验证码
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
  [storeTypes.ACCOUNT_TEL_VARLIDATECODE_REQUEST] ({commit}, params) {
    let type = 'get'
    let url = 'mobile/home/mobileRegister/sendPhoneValidateCode'
    let param = {
      type: params.type,
      telNumber: params.telNumber,
      imageValidateCode: params.imageValidateCode
    }
    return request(type, param, url)
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
  /**
   * 请求验证图片
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
  [storeTypes.ACCOUNT_VALIDATACODE_IMG_REQUEST] ({commit}, params) {
    let type = 'get'
    let url = 'mobile/home/mobileRegister/sendImageValidateCode'
    let param = {
      type: params.type
    }
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          commit(storeTypes.ACCOUNT_VALIDATACODE_IMG_SET, data.data.validateCodeImageUrl)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  /**
   * 注册请求
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
  [storeTypes.ACCOUNT_REGISTER_REQUEST] ({commit}, params) {
    let type = 'post'
    let url = 'mobile/home/mobileRegister/userRegister'
    return request(type, params, url)
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
  /**
   * 获取手机验证码
   */
  [storeTypes.ACCOUNT_GET_SMSVALIDATECODE] ({commit}, params) {
    var type = 'get'
    var url = 'mobile/home/mobileRegister/sendPhoneValidateCode'
    let param = {
      type: params.type,
      telNumber: params.telNumber,
      imageValidateCode: params.imageValidateCode
    }
    return request(type, param, url)
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
  /**
   * 修改密码
   */
  [storeTypes.ACCOUNT_CHANGE_PASSWORD] ({commit}, param) {
    var type = 'POST'
    var url = 'mobile/user/userInfo/updateUserPassWord'
    return request(type, param, url)
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
  [storeTypes.SET_NEW_PASSWORD] ({commit}, param) {
    var type = 'POST'
    var url = 'mobile/home/passwordAndQueryParam/resetUserPassword'
    return request(type, param, url)
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
  /**
   * 换绑手机号
   */
  [storeTypes.ACCOUNT_CHANGE_TELEPHONENUM] ({commit}, param) {
    var type = 'POST'
    var url = 'mobile/user/userInfo/updateUserPhoneNum'
    return request(type, param, url)
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
  /**
   * 重置密码
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
  [storeTypes.ACCOUNT_RESET_PASSWORD_REQUEST] ({commit}, params) {
    let type = 'post'
    let url = 'mobile/home/mobileRegister/checkSendPhoneValidateCode'
    return request(type, params, url)
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
  /**
   * 获取用户收货地址信息
   */
  [storeTypes.ACCOUNT_GET_RECEIPTINFO] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/deliveryInformation/getReceiverAddress'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          commit(storeTypes.ACCOUNT_SET_RECEIPTINFO, data.data)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  /**
   * 修改用户收货地址信息
   */
  [storeTypes.ACCOUNT_UPDATE_RECEIPTINFO] ({commit}, param) {
    var type = 'POST'
    var url = 'mobile/user/deliveryInformation/updateReceiverAddress'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          commit(storeTypes.ACCOUNT_SET_RECEIPTINFO, data.data)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  /**
   * 获取省市县数据
   */
  [storeTypes.ACCOUNT_GET_REGIONDATA] ({commit}, param) {
    var type = 'POST'
    var url = 'mobile/home/mobileRegister/getRegionByParentId'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          commit(storeTypes.ACCOUNT_SET_REGIONDATA, data.data.provinces)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  [storeTypes.IDCART_TEL_VALIDATE] ({commit}, param) {
    let type = 'GET'
    let url = 'mobile/home/mobileRegister/checkSendPhoneValidateCode'
    console.log(param)
    return request(type, param, url).then((data) => {
      return data
    }, (reason) => {
      return ({head: {code: 700, message: '请求失败'}})
    })
  },
  [storeTypes.UPDATE_USER_HAS_SEE_AGREEMENT] ({commit}, param) {
    let type = 'POST'
    let url = 'mobile/user/userInfo/updateUserHasSeeAgreement'
    param = {
      hasSeeNewAgreement: true
    }
    return request(type, param, url).then((data) => {
      if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
        return data;
      }
    }, (reason) => {
      return ({head: {code: 700, message: '请求失败'}})
    })
  },
  [storeTypes.ACCOUNT_HAS_BIND_WX] ({commit}, params) {
    let type = 'POST'
    let url = '/mobile/home/mobileRegister/bindWeiXin'
    return request(type, params, url).then((data) => {
      return data
    }, (reason) => {
      return ({head: {code: 700, message: '请求失败'}})
    })
  }
}
const mutations = {
  [storeTypes.ACCOUNT_SET_USERINFO] ({commit}, userInfo) {
    state.userInfo = userInfo
  },
  [storeTypes.ACCOUNT_SET_VALIDATEIMAGEURL] ({commit}, imageUrl) {
    state.validateCodeImageUrll = imageUrl
  },
  [storeTypes.ACCOUNT_SET_RECEIPTINFO] ({commit}, receiptInfo) {
    state.userReceiptInfo = receiptInfo
  },
  [storeTypes.ACCOUNT_SET_REGIONDATA] ({commit}, provinces) {
    state.regionData = provinces
  },
  [storeTypes.ACCOUNT_VALIDATACODE_IMG_SET] (state, code) {
    this.validateCodeImageUrl = code
  },
  [storeTypes.ACCOUNT_WX_APPID_SET] (state, wxAppId) {
    this.WXAppId = wxAppId
  },
  [storeTypes.ACCOUNT_WX_INFO_SET] (state, wxInfo) {
    this.WXInfo = wxInfo
  }
}
const getters = {
  userInfo (state) {
    if (console.mainPage !== undefined && (state.userInfo === undefined || state.userInfo === null)) {
      return console.mainPage.getCookie(AppConstant.cookie.userInfo)
    }
    return state.userInfo
  },
  userReceiptInfo (state) {
    return state.userReceiptInfo
  },
  regionData (state) {
    return state.regionData
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
