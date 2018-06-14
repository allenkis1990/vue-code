import * as storeTypes from './types'
import { AjaxPlugin } from 'vux'
import jsonp from '../common/util/jsonp'
import Global from '../global/global'
import Utils from '../common/util/Utils'
import AppConstant from '../global/constants/AppConstant'

window.loginCallback = function () {
  console.log(3333333333)
}

/**
 * 网络请求入口
 * @param method   请求方式
 * @param data     参数
 * @param url      地址
 */
export function request (method, params, url) {
  return requestEvent(method, params, AppConstant.sysContext.apiPlatformHost, url, 'json')
}

/**
 * 网络请求方法
 * @param method 请求方式
 * @param data   请求参数
 * @param host   域名
 * @param url    地址
 * @param paramkey  数据格式
 */
export function requestEvent (method, params, host, url, paramkey) {
  let jsonString = Utils.requestString(params)
  url = `${host}${url}`
  var requestUrl = url
  let methods = method.toString().toLocaleLowerCase()
  if (methods === 'get') {
    if (jsonString !== undefined) {
      requestUrl = url + '?requestString=' + encodeURI(jsonString)
    }
    jsonString = ''
  }
  return fetch(methods, requestUrl, paramkey, '', jsonString)
}

export function fetch (method, url, type, header, body) {
  console.log('------------->网络请求基本信息:"method">>>' + method + ';"url":' + url + ';"type">>>' + type + ';"header">>>' + header + ';"body">>>' + body)
  let requestTime = getCurrentTime()
  if (method === 'post') {
    return new Promise((resolve, reject) => {
      AjaxPlugin.$http({
        method: 'post',
        url: url,
        timeout: 10000,
        data: body
      }).then(function (response) {
        let finishRequest = getCurrentTime()
        getRequestTime(finishRequest - requestTime, url)
        if (response.status === 200) {
          resolve(response.data)
        } else if (response.status === 401) {
          reject(response)
          try {
            console.log('登出函数')
          } catch (err) {
            console.log(err)
          }
        } else {
          console.log('-----post-----> response:' + JSON.stringify(response))
          reject(response)
        }
      })
    }, (e) => {
      console.log('---post--response:' + JSON.stringify(e))
    })
  } else if (method === 'get') {
    return new Promise((resolve, reject) => {
      AjaxPlugin.$http({
        method: 'get',
        url: url
      }).then(function (response) {
        let finishRequest = getCurrentTime()
        getRequestTime(finishRequest - requestTime, url)
        if (response.status === 200) {
          resolve(response.data)
        } else if (response.status === 401) {
          reject(response)
          try {
            console.log('登出函数')
          } catch (err) {
            console.log(err)
          }
        } else {
          console.log('-----get-----> response:' + JSON.stringify(response))
          reject(response)
        }
      })
    }, (e) => {
      console.log('----get---response:' + JSON.stringify(e))
    })
  }
}

/**
 * cas登录请求
 * @param url
 * @returns {Promise}
 */
export function fetchLogin (url) {
  return new Promise((resolve, reject) => {
    console.log('************************', url)
    jsonp(url, {jsonp: 'loginCallback'}, function (data) {
      resolve(data)
    })
  }).catch(e => {
    console.log(e)
    Global.methods.hideLoading()
  })
}

/**
 * sso login jsonp 内容需要用到jquery库，然而vue项目没有引入jquery，所以重新hack一段jquery的代码来模拟sso js里面的代码
 * @param str
 * @returns {Object}
 * @constructor
 */
function JQ (str) {
  let el = document.getElementById(str.replace(/#/, ''))
  if (el) {
    el.length = 1
    el.remove = function () {
      el.parentNode.removeChild(el)
    }
  }
  return el || {}
}

/**
 * 模拟jquery的ajax请求，内部主要是请求jsonp
 * @param options
 * @returns {Promise}
 */
JQ.ajax = function (options) {
  console.log(options)
  return new Promise((resolve, reject) => {
    jsonp(options.url, {
      params: options.data,
      ssoCb: 'loginCallback',
      jsonp: options.jsonp || 'loginCallback'
    }, function (data) {
      resolve(data)
    })
  }).catch(e => {
    console.log(e)
    Global.methods.hideLoading()
  })
}

export function requestSmsUrl (url, params) {
  var requestParams = {
    head: {
      appVersion: '',
      osPlatform: 'iOS 10.2',
      requestTime: ''
    },
    data: null
  }
  requestParams.head.appVersion = '001'
  requestParams.head.osPlatform = 'iOS 10.2.'
  requestParams.head.requestTime = getNowFormatDate()
  requestParams.data = params
  var jsonString = JSON.stringify(requestParams)
  url = `${storeTypes.BASEURL}${url}`
  var requestUrl = url
  if (jsonString !== undefined) {
    requestUrl = url + '?requestString=' + jsonString
  }
  console.log('requestUrl:' + requestUrl)
  return requestUrl
}

window.$ = JQ

/**
 * 获取时间  格式化
 * @returns {string}
 */
function getNowFormatDate () {
  var date = new Date()
  var seperator1 = '-'
  var seperator2 = ':'
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
  return currentdate
}

/**
 * 获取当前时间
 * @returns {number}
 */
function getCurrentTime () {
  let date = new Date()
  return date.getTime()
}

/**
 *打印接口请求时间
 * @param time  时间
 * @param url   地址
 */
function getRequestTime (time, url) {
  console.log('---------->请求时间:' + time + '毫秒;请求接口：' + url)
}
