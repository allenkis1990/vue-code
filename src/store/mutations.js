import * as storeTypes from './types'

export default {
  [storeTypes.GLOBAL_CHANGENAV] (state, index) {
    if (index < state.tabIndex) {
      state.animationsName = 'routerLeft'
    } else {
      state.animationsName = 'router'
    }
    state.tabIndex = index
  },
  [storeTypes.GLOBAL_SET_CURRENTUSER] (state, info) {
    state.rootInfo.userInfo = info
  },
  [storeTypes.GLOBAL_UPDATE_LOADING] (state, payload) {
    state.isLoading = payload.isLoading
  },
  [storeTypes.GLOBAL_SET_TITLE] (state, title) {
    state.appInfo.title = title
  },
  [storeTypes.GLOBAL_SET_DRAWER] (state, hasDrawer) {
    state.drawerVisibility = hasDrawer
  },
  [storeTypes.GLOBAL_ADD_LOADING] (state, text) {
    state.loadInfo.isLoading = true
    state.loadInfo.text = text
  },
  [storeTypes.GLOBAL_REMOVE_LOADING] (state) {
    state.loadInfo.isLoading = false
    state.loadInfo.text = undefined
  },
  [storeTypes.GLOBAR_LOGIN_SET] (state, hasLogin) {
    state.hasLogin = hasLogin
  },
  [storeTypes.GLOBAR_SET_SERVE_CONTEXT] (state, serverContextInfo) {
    state.serverContextInfo = serverContextInfo
  }
}
