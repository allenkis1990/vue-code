<template>
  <div class="container">
    <div class="hb-header-box">
      <div class="header-left" @click="back()">
        <a class="hb-ico ico-return"></a>
      </div>
      <div class="header-tit">修改密码</div>
      <div class="header-right"></div>
    </div>
    <!--标题栏-->
    <div class="hb-form-cells pt100" style="padding-top: 0.9rem">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">当前密码</span></div>
          <div class="weui-cell__bd"><input type="password" placeholder="请输入当前密码" class="weui-input" v-model="oldPassword"/></div>
        </div>
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">新密码</span></div>
          <div class="weui-cell__bd"><input type="password" placeholder="6~18位由字母、数字或_组成" class="weui-input" v-model="newPassword"/></div>
        </div>
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">确认密码</span></div>
          <div class="weui-cell__bd"><input type="password" placeholder="请再次输入密码" class="weui-input" v-model="confirmPassword"/></div>
        </div>
      </div>
    </div>
    <div :class="buttonStyle" style="width:100%;position:absolute;left:0;bottom:0" @click="submit">确定修改</div>
  </div>
</template>
<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
  .btn-disabled {
    font-size: .36rem;
    line-height: 2.444;
    border-radius: .1rem;
    display: block;
    text-align: center;
    background-color:#bbb;
    color:#666;
  }
</style>
<script>
  require('../../../design/styles/webstyle.less')
  import * as storeType from '../../store/types'
  export default{
    components: {},
    data () {
      return {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    },
    computed: {
      buttonStyle () {
        if (this.oldPassword && this.newPassword && this.confirmPassword) {
          return ['btn-primary']
        } else {
          return ['btn-disabled']
        }
      }
    },
    methods: {
      checkAndToast () {
        if (!this.oldPassword) {
          this.toast('当前密码不能为空')
          return false
        }
        if (this.oldPassword.length < 6 || this.oldPassword.length > 18) {
          this.toast('请输入6-18位的当前密码')
        }
        if (!this.newPassword) {
          this.toast('新密码不能为空')
          return false
        }
        if (this.newPassword.length < 6 || this.newPassword.length > 18) {
          this.toast('请输入6-18位的新密码')
          return false
        }
        if (!this.confirmPassword) {
          this.toast('确认密码不能为空')
          return false
        }
        if (this.confirmPassword.length < 6 || this.confirmPassword.length > 18) {
          this.toast('请输入6-18位的确认密码')
          return false
        }
        if (this.newPassword !== this.confirmPassword) {
          this.toast('密码前后不一致，请核查！')
          return false
        }
        return true
      },
      submit () {
        if (this.checkAndToast()) {
          let params = {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword
          }
          this.$store.dispatch(storeType.ACCOUNT_CHANGE_PASSWORD, params).then((data) => {
            if (data.head.code !== storeType.NETWORK_RESULT_SUCCESS) {
              this.toast(data.head.message)
            } else {
              this.toast('修改成功!')
              setTimeout(() => {
                this.replace('/demo/mine')
              }, 1000)
            }
          }).catch(e => {
            console.log('>>' + e)
          })
        }
      }
    }
  }
</script>
