import Vue from 'vue'
import VueMapper from './VueMapper'
import App from './App'

const getUrlParam = (key) => {
  let reg = new RegExp('[?|&]' + key + '=([^&]+)')
  let match = location.search.match(reg)
  return match && match[1]
}
// const loader = getUrlParam('loader') || 'xhr'
const page = getUrlParam('page') || 1

/* eslint-disable no-new */

new Vue(Vue.util.extend({
  el: '#app-box',
  App
}, VueMapper[page]))
