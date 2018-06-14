function SetTitle (Vue) {
  let setWechatTitle = function (metaData, img) {
    if (window.document.title === metaData.title || !metaData.title) {
      return
    }
    document.title = metaData.title
    let mobile = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(mobile)) {
      let iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      // 替换成站标favicon路径或者任意存在的较小的图片即可
      iframe.setAttribute('src', img || '/favicon.ico')
      let iframeCallback = function () {
        setTimeout(function () {
          iframe.removeEventListener('load', iframeCallback)
          document.body.removeChild(iframe)
        }, 0)
      }
      iframe.addEventListener('load', iframeCallback)
      document.body.appendChild(iframe)
    }
  }
  Vue.directive('wechat-title', function (el, binding) {
    setWechatTitle(binding.value, el.getAttribute('img-set') || null)
  })
}

export default SetTitle

