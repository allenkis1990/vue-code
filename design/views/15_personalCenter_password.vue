<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-left">
        <a class="hb-ico ico-menu"></a>
      </div>
      <div class="header-tit">个人中心</div>
      <div class="header-right"></div>
    </div>
    <!--标题栏-->
    <div class="hb-form-cells pt100">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">当前密码</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请输入当前密码" class="weui-input" /></div>
        </div>
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">新密码</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="6~18位由字母、数字或_组成" class="weui-input" /></div>
        </div>
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">确认密码</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请再次输入密码" class="weui-input" /></div>
        </div>
      </div>
      <div class="btn-primary mt80">保 存</div>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
