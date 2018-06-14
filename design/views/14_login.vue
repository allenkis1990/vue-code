<template>
  <div class="contain">
    <div class="hb-form-cells">
      <div class="tit-box">
        <div class="h1">欢迎登录</div>
        <div class="fs30 c9 mt5">Welcome to login</div>
      </div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label">帐号</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请输入身份证号" class="weui-input" /></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label">密码</span></div>
          <div class="weui-cell__bd"><input type="password" placeholder="请输入密码" class="weui-input" /></div>
        </div>
      </div>
      <div class="btn-primary mt80">立即登录</div>
      <div class="form-other mt60">
        <div class="weui-check__label cb">注册新用户</div>
        <div class="tr a-forget">忘记密码?</div>
      </div>
      <div class="other-login"><span class="line"></span><span class="txt">微信授权登录</span><span class="line"></span></div>
      <div class="login-enter tc"><img class="img" src="../images/wx-icon.png" alt=" " /></div>
    </div>
    <img class="login-box-img" src="../images/login-pic.jpg" alt=" " />
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
