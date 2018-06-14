const scriptId = '_login_script'
const callbackDefaultName = 'jsonCallback'

/**
 * 判断是否有对应的节点，如果有节点则删除这个节点
 */
function checkAndRemoveScript () {
  let script = document.getElementById(scriptId)
  if (script) {
    script.parentNode.removeChild(script)
  }
}

export default function (url, params, callback) {
  let script = document.createElement('script')
  params = params || {callback: callbackDefaultName}
  checkAndRemoveScript()
  let temp = []
  params.callback = params.jsonp || 'callbackDefaultName'
  Object.keys(params).forEach(item => {
    if (item === 'params') {
      params.params = params.params || {}
      if (params.params) {
        Object.keys(params.params).forEach(param => {
          temp.push(`${param}=${params.params[param]}`)
        })
      }
    } else {
      temp.push(`${item}=${params[item]}`)
    }
  })
  script.id = scriptId
  script.type = 'text/javascript'
  script.src = `${url}${url.indexOf('?') !== -1 ? '&' : '?'}${temp.join('&')}`
  script.onload = function () {
    console.log('script load success')
    window.clearInterval(window['cauth_login_ticket_timer_id'])
    callback && callback()
  }
  document.head.appendChild(script)
}

