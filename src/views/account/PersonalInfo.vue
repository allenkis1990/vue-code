<template>
  <div class="contain">
      <!--标题栏-->
      <div class="hb-header-box">
        <div class="header-left" @click="back()">
          <a href="javascript:void(0);" class="hb-ico ico-return"></a>
        </div>
        <div class="header-tit">个人信息</div>
      </div>
      <!--标题栏-->
      <div class="hb-box-bd hb-box-bd-1">
        <div class="weui-panel hb-panel">
          <div class="weui-cells">
            <div class="weui-cell weui-cell_access">
              <div class="weui-cell__hd"><span class="tit-2">身份证号</span></div>
              <div class="weui-cell__bd">{{userInfo.identityCardNo}}</div>
            </div>
            <div class="weui-cell weui-cell_access">
              <div class="weui-cell__hd"><span class="tit-2">姓名</span></div>
              <div class="weui-cell__bd"><div class="arrow"></div>
              <input type="text" class="weui-input" value="隔壁老王" v-model="userInfo.userName" placeholder="请填写姓名"/>
              </div>
            </div>

            <div class="weui-cell weui-cell_access">
              <div class="weui-cell__hd"><span class="tit-2">手机号</span></div>
              <div class="weui-cell__bd"><div class="arrow"></div>
              <input type="text" class="weui-input" value="隔壁老王" v-model="userInfo.phoneNumber" placeholder="请填写手机号"/>
              </div>
            </div>
            <div class="weui-cell weui-cell_access sex">
              <div class="weui-cell__hd"><span class="tit-2">性别</span></div>
              <div class="weui-cell__bd"><div class="arrow"></div>
                <popup-picker class="gray-color" confirm-text="确定" placeholder="请选择性别" value-text-align="left" :data="sexList" :columns="1" v-model="sex" show-name></popup-picker>
              </div>
            </div>
            <div class="weui-cell weui-cell_access">
              <div class="weui-cell__hd"><span class="tit-2">单位名称</span></div>
              <div class="weui-cell__bd"><div class="arrow"></div>
              <input type="text" class="weui-input" value="隔壁老王" v-model="userInfo.unitName" placeholder="请填写单位名称"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-primary mt80" style="width:100%;position:absolute;left:0;bottom:0" @click="submit">确定修改</div>
    </div>
</template>
<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
  .sex {
    .vux-cell-box:not(:first-child):before {
      width: 0!important;
    }
  }
  .gray-color {
    .weui-cell {
      padding: 0!important;
    }
    .vux-popup-picker-placeholder  {
      color: #666!important;
    }
    .vux-popup-picker-value {
      color: #333333!important;
    }
  }
</style>
<script>
  require('../../../design/styles/webstyle.less')
  import * as storeTypes from '../../store/types'
  import { PopupPicker } from 'vux'
  export default{
    components: { PopupPicker },
    mounted () {
      for (let key in this.$store.getters.userInfo) {
        this.userInfo[key] = this.$store.getters.userInfo[key]
      }
    },
    data () {
      return {
        userInfo: this.$store.getters.userInfo,
        sexList: [{
          name: '男',
          value: '1'
        }, {
          name: '女',
          value: '2'
        }],
        sex: this.$store.getters.userInfo.sex ? (this.$store.getters.userInfo.sex === 1 || this.$store.getters.userInfo.sex === 2) ? [this.$store.getters.userInfo.sex + ''] : [] : []
      }
    },
    methods: {
      checkAndToast () {
        let regu = /^[ ]+$/
        if (regu.test(this.userInfo.userName) || this.userInfo.userName.length <= 0) {
          this.toast('请填写姓名')
          return false
        }
        if (regu.test(this.userInfo.phoneNumber) || this.userInfo.phoneNumber.length <= 0) {
          this.toast('请填写手机号')
          return false
        }
        if (!this.sex[0]) {
          this.toast('请选择性别')
          return false
        }
        if (regu.test(this.userInfo.unitName) || this.userInfo.unitName.length <= 0) {
          this.toast('请填写单位名称')
          return false
        }
        if (this.userInfo.phoneNumber.length !== 11) {
          this.toast('请填写格式正确的11位手机号')
          return false
        }
        return true
      },
      submit () {
        if (this.checkAndToast()) {
          let params = {}
          params.userInfo = Object.assign({}, this.userInfo, {sex: parseInt(this.sex[0])})
          this.showLoading('修改中...')
          this.$store.dispatch(storeTypes.ACCOUNT_UPDATE_USERINFO, params).then(retObj => {
            this.hideLoading()
            if (retObj.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
              this.toast('信息修改成功！')
            } else {
              this.toast(retObj.head.message)
            }
          })
        }
      }
    }
  }
</script>
