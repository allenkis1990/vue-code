<template>
  <!--z注册页-->
  <div class="contain">
    <div class="hb-form-cells">
      <div class="tit-box-1">
        <div class="h1">欢迎注册</div>
        <div class="fs30 c9 mt5">Welcome to register</div>
      </div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">帐号</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请输入身份证号" class="weui-input" /></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">姓名</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请输入真实姓名" class="weui-input" /></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">手机号</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请输入11位手机号" class="weui-input" /></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">密码</span></div>
          <div class="weui-cell__bd"><input type="password" placeholder="请输入6~18位由字母、数字组成的密码" class="weui-input" /></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">确认密码</span></div>
          <div class="weui-cell__bd"><input type="password" placeholder="请再次输入密码" class="weui-input" /></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">单位名称</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请填写单位名称" class="weui-input" /></div>
        </div>
      </div>
      <div class="btn-primary mt80">立即注册</div>
      <div class="form-other mt60">
        <div class="weui-check__label cb tc">直接登录</div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
