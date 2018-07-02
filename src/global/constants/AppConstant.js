/**
 * Created by 46607 on 2017/7/10.
 */

const cookie = {
  appId: 'appId',
  userId: 'usrid',
  unionId: 'unionId',
  openId: 'openId',
  accessToken: 'accessToken',
  nickname: 'nickname',
  refreshToken: 'refreshToken',
  account: 'account',
  password: 'password',
  userInfo: 'userInfo', // 当前登录的用户信息
  beforeLoginUrl: 'beforeLoginUrl',
  fjhbSooTgt: 'FJHB_SSO_TGT',
  sooLtJSessionid: 'SSO_LT_JSESSIONID',
  searchHistory: 'searchHistory',
  searchHistoryCourse: 'searchHistoryCourse',
  systemContext: 'systemContext', // 系统参数
  wxUserSex: 'wxUserSex',
  wxUserHeadImage: 'wxUserHeadImage'
}
const wx = {
  success: 'get_brand_wcpay_request:ok',
  cancel: 'get_brand_wcpay_request:cancel',
  fail: 'get_brand_wcpay_request:fail'
}
const sysContext = {
  wxRedirectURI: '', // 微信授权后的重定向地址
  casHost: '', // cas服务
  apiPlatformHost: '/' // 业务平台地址
}
const apiUrl = {
  casModule: {
    login: '/appOpenIdLogin',
    sso: 'mobile/sso/auth'
  },
  classListModule: {
    trainClass: 'mobile/home/mobileTrainning/getTrainigStudyList',
    self: 'mobile/home/mobileTrainning/getSelfPickerCourseList'
  },
  shoppingCartModule: {
    getShoppingartList: 'mobile/user/mobileShoppingCart/getShoppingCartList',
    getValidShoppingCartListV3: 'mobile/user/mobileShoppingCart/getValidShoppingCartListV3',
    shoppingChangeYear: 'mobile/user/mobileShoppingCart/updateShoppingCart',
    shoppingDelete: 'mobile/user/mobileShoppingCart/putOffShoppingCart',
    shoppingCartClearLoseEfficacy: 'mobile/user/mobileShoppingCart/clearLoseEfficacyItems',
    getInvalidShoppingCartListV3: 'mobile/user/mobileShoppingCart/getInValidShoppingCartListV3',
    enableShoppingCart: 'mobile/user/mobileShoppingCart/enableShoppingCart'
  },
  createOrderModule: {
    orderCreatPreCondition: 'mobile/user/userOrder/getPerfectOrderConfigBySkuId',
    orderSelfStorageList: 'mobile/user/deliveryInformation/getSelfStorageList',
    orderUpdateUserReceiverAddress: 'mobile/user/deliveryInformation/updateReceiverAddress',
    orderCreat: 'mobile/user/userOrder/create',
    orderPayOrderInfo: 'mobile/user/userOrder/getOrderPaidInfo',
    findPaymentAccountByCommoditySku: 'mobile/user/userOrder/findPaymentAccountByCommoditySku',
    getOrderDetail: 'mobile/user/userOrder/getOrderDetail'
  }
}
const localStorage = {
  unionId: 'HBSCJSWeiXin_unionId',
  openId: 'HBSCJSWeiXin_openId'
}
export default {
  cookie,
  wx,
  sysContext,
  apiUrl,
  localStorage
}
