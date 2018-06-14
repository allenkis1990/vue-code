<template>
  <div class="container bg-w">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-left">
        <a href="javascript:void(0);" class="hb-ico ico-return" @click="() => {this.back()}"></a>
      </div>
      <div class="header-tit">找回密码</div>
      <div class="header-right">
        <a href="javascript:void(0);" class="header-txt" @click="() => {this.replace('/loginByPassword')}">登录</a>
      </div>
    </div>
    <!--标题栏-->
    <div class="hb-wrap-box">
      <div class="weui-msg">
        <div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>
        <div class="weui-msg__text-area">
          <h2 class="weui-msg__title">恭喜！获得新密码</h2>
          <p class="weui-msg__desc">新密码：<span class="cr">000000</span></p>
        </div>
        <div class="weui-msg__opr-area">
          <p class="weui-btn-area">
            <a href="javascript:;" class="weui-btn weui-btn_primary" @click="() => {this.replace('/loginByPassword')}">前往登录</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
  @import "../../../design/styles/webstyle.less";
</style>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
