/**
 * 用于对HTTP通讯，进行通讯拦截。
 */
// import Global from '../../global/global'
import AppConstant from '../../global/constants/AppConstant'

export default function (Vue, router) {
  Vue.http.interceptors.request.use(
    request => {
      request.url += `${/\?/g.test(request.url) ? '&' : '?'}t=${Date.now()}`
      return request
    },
    error => {
      return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    })

  Vue.http.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 401: {
            // 返回 401 清除token信息并跳转到登录页面
            // store.commit(types.LOGOUT);
            if (console.mainPage !== undefined && window.location.href.indexOf('/authLogin') === -1) {
              let index = window.location.href.indexOf('#')
              if (index !== -1) {
                let path = window.location.href.substr(index + 1)
                console.mainPage.setCookie(AppConstant.cookie.beforeLoginUrl, path)
              }

              // console.log('>>' + console.mainPage.route.fullPath)
            }
            router.replace({
              path: '/authLogin' // Global.data().pages.AuthLogin
            })
            break
          }
          case 502:
            break
        }
      }
      return Promise.reject(error).catch(e => {
        console.log(error)
        // if (e.response.status === 401) {
        //   let pathUrl = null
        //   if (window.location.href.indexOf(storeTypes.AUTHLOGIN) === -1) {
        //     pathUrl = storeTypes.LOGIN
        //   } else {
        //     pathUrl = storeTypes.AUTHLOGIN
        //   }
        //   router.replace({
        //     path: pathUrl
        //   })
        // }
        return ({head: {code: 700, message: ''}})
      })   // 返回接口返回的错误信息 error.response.data
    })
}
