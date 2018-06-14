<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-left">
        <a class="hb-ico ico-menu"></a>
      </div>
      <div class="header-tit">忘记密码</div>
      <div class="header-right">
        <a class="header-txt">登录/注册</a>
      </div>
    </div>
    <!--标题栏-->
    <div class="hb-form-cells mt150">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label">新密码</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请输入6~18位由字母、数字组成的密码" class="weui-input" /></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label">确认密码</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请再次输入密码" class="weui-input" /></div>
        </div>
      </div>
      <div class="btn-primary mt80">提交新密码</div>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
