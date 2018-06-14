<template>
  <div class="container">
    <div class="container" v-if="needCompleteOrderList.length > 0">
      <div class="js_dialog" id="iosDialog1" style="opacity: 1;">
        <div class="weui-mask"></div>
        <div class="weui-dialog weui-dialog-1">
          <div class="dialog-pic"><img src="../../../design/images/distribution-img.png" alt=""></div>
          <div class="weui-dialog__bd">亲，您存在
            <span class="cr"> {{needCompleteOrderList.length}}个 </span>订单需要完善配送信息，以便发票/证书的配送！</div>
          <div class="weui-dialog__ft">
            <div @click="gotoCompleteOrder()" class="weui-dialog__btn weui-dialog__btn_primary">前往完善</div>
          </div>
        </div>
      </div>
    </div>
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-left" @click="drawerVisibilityEvent">
        <a href="javascript:void(0);" class="hb-ico ico-menu"></a>
      </div>
      <div class="header-tit">培训证明</div>
      <div class="header-right">
        <a href="javascript:void(0);" class="hb-ico" v-if="false"></a>
      </div>
    </div>
    <!--标题栏-->

    <!--培训证明-->
    <scroller class="hb-wrap-box" :height="scrollerHeight" lock-x scrollbar-y use-pulldown @on-pulldown-loading="refreshData" v-model="scroller" ref="scroller1">
      <div>
        <div class="hb-wrap-box" v-if="cerlistData.length === 0">
          <div class="no-data-box">
            <img class="no-data-img" src="../../../design/images/no-data-img.png" alt=" ">
            <p class="no-data-txt">暂时还没有数据~</p>
          </div>
        </div>
        <div class="weui-panel weui-panel_access hb-panel">
          <div class="weui-panel__bd" v-for="(item,index) in cerlistData" :key="index" @click="goDetail(item)">
            <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
              <div class="weui-media-box__hd">
                <img class="weui-media-box__thumb" src="../../../design/images/prove-img.jpg">
              </div>
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title">{{item.certificateName}}</h4>
                <p class="weui-media-box__desc">年度：{{item.year}}年 | 学时：{{item.credit}}</p>
                <p class="weui-media-box__desc">类别：{{item.trainingType}}</p>
                <!-- <p class="weui-media-box__desc"></p> -->
              </div>
            </a>
          </div>
        </div>
      </div>
      <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 40px; line-height: 40px; top: -60px; text-align: center;">
        <span v-show="scroller.pulldownStatus === 'default'"></span>
        <span class="pulldown-arrow" v-show="scroller.pulldownStatus === 'down' || scroller.pulldownStatus==='up'" :class="{'rotate': scroller.pulldownStatus === 'up'}" style="font-size: 16px;font-weight: bold;">↓</span>
        <div v-show="scroller.pulldownStatus === 'loading'">
          <p class="inloading">
            <inline-loading></inline-loading>
            <span class="il-text">
              刷新中...
            </span>
          </p>
        </div>
      </div>
    </scroller>
    <!--/班级列表-->
  </div>
</template>

<style lang="less">
@import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
@import "../../../design/styles/webstyle.less";
</style>
<script>
import { Scroller, Spinner, LoadMore, InlineLoading } from 'vux'
import * as storeTypes from '../../store/types'

export default {
  components: {
    Scroller,
    Spinner,
    LoadMore,
    InlineLoading
  },
  data() {
    return {
      needCompleteOrderList: [],
      scrollerHeight: '',
      scroller: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      },
      tabItem: {
        height: 40,
        width: 80,
        barWidth: 20
      },
      noMore: false
    }
  },
  computed: {
    cerlistData: function() {
      return this.$store.getters.certificateList
    }
  },
  mounted() {
    let that = this
    this.$store.dispatch(storeTypes.ORDER_GET_NEED_COMPLETE_ORDER_LIST).then(data => {
      if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
        if (data.data.orderList.length > 0) {
          for (var i = 0; i < data.data.orderList.length; i++) {
            that.needCompleteOrderList.push(data.data.orderList[i].orderNumber)
          }
        }
      } else {
        this.toast(data.head.message)
      }
    })
    this.scrollerHeight = ((window.outerHeight || window.innerHeight) - 45) + 'px'
    this.refreshData()
  },
  methods: {
    gotoCompleteOrder() {
      this.$store.commit(storeTypes.COMPLETE_ORDER_NEED_INVOICE, false)
      this.push({ path: '/completeOrder', query: { path: '/demo/cerList', orderList: this.needCompleteOrderList } })
    },
    /**
     * 是否显示菜单 点击事件
     */
    drawerVisibilityEvent() {
      this.$store.commit(storeTypes.GLOBAL_SET_DRAWER, true)
    },
    /**
     * 上拉刷新
     */
    refreshData() {
      this.showLoading('加载中.....')
      this.$store.dispatch(storeTypes.CER_REQUEST_CER_LIST, '{}').then(data => {
        this.hideLoading()
        if (this.$refs.scroller1 !== undefined) {
          this.$refs.scroller1.donePulldown()
        }
        if (data.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
          this.toast(data.head.message)
        }
      }).catch(e => {
        this.hideLoading()
        this.$refs.scroller1.donePulldown()
        console.log('>>' + e)
      })
    },
    /**
     * confirm展示
     */
    showConfirm(item, idNumArr) {
      let that = this;
      idNumArr = idNumArr || [];
      this.$vux.confirm.show({
        title: '提示',
        content: `亲爱的学员，请再次确认您的个人信息无误。</br>一旦获取培训合格证明即无法修改！</br>姓名：${item.userName}</br>身份证号：${item.idNum}`,
        cancelText: '信息有误',
        confirmText: '正确，看证明',
        onShow() {
          console.log('plugin show')
        },
        onHide() {
          console.log('plugin hide')
        },
        onCancel() {
          that.toast('请通过“四川建设人才在线教育平台”微信服务号</br>发送关键字“修改个人信息”，联系客服为您修改信息');
        },
        onConfirm() {
          idNumArr.push(item.idNum);
          window.localStorage.setItem('hbSeeCerPeople', JSON.stringify(idNumArr));
          that.checkCerState(item.certificateId)
        }
      })
    },
    goDetail(item) {
      let idNumArr = window.localStorage.getItem('hbSeeCerPeople');
      if (idNumArr) {
        idNumArr = JSON.parse(idNumArr);
        if (this.isContains(idNumArr, item.idNum)) {
          this.checkCerState(item.certificateId)
        } else {
          this.showConfirm(item, idNumArr);
        }
      } else {
        this.showConfirm(item, idNumArr);
      }
    },
    // 是否允许查看证明
    checkCerState(certificateId) {
      this.$store.dispatch(storeTypes.CAN_PRINT_CER, {
        certificateId: certificateId
      }).then((data) => {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          this.push({
            path: '/certificateDetail', query: {
              certificateId: certificateId
            }
          })
        } else if (data.head.code === 301) {  // 学员通过考试，考试证明编号尚未导入平台
          this.$vux.alert.show({
            title: '提示',
            content: '恭喜您考试合格，本次培训信息须经过四川省住房和城乡建设厅培训考核办公室审核，通过审核即可下载培训证明，请于5个工作日后登录查看！',
            onShow() { },
            onHide() { }
          })
        } else if (data.head.code === 302) {  // 学员通过考试，考试证明编号已经导入，但是有重复班级
          let that = this;
          this.$vux.alert.show({
            title: '提示',
            content: '您的本次培训信息已通过四川省住房和城乡建设厅培训考核办公室审核。<span style="color:red">经查，您在其他机构还有一条培训信息，请尽快处理。</span></br>如有疑问请联系四川住房和城乡建设厅培训考核办公室，电话：028-85439023',
            onShow() { },
            onHide() {
              that.push({
                path: '/certificateDetail', query: {
                  certificateId: certificateId
                }
              })
            }
          })
        } else {
          this.toast(data.head.message);
        }
      })
    },
    isContains: function(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
          return true;
        }
      }
      return false;
    }
  }
}
</script>
