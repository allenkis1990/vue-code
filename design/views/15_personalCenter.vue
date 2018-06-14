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
    <div class="hb-user-img">
      <img class="user-img" src="../images/user-img.jpg" alt=" ">
      <div class="mt10">隔壁老王</div>
    </div>
    <div class="weui-cells hb-panel hb-personal-center">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd"><span class="hb-ico ico-info"></span></div>
        <div class="weui-cell__bd">
          <div class="bd-items fs30">个人信息</div>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd"><span class="hb-ico ico-add"></span></div>
        <div class="weui-cell__bd">
          <div class="bd-items fs30">收货地址</div>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd"><span class="hb-ico ico-password"></span></div>
        <div class="weui-cell__bd">
          <div class="bd-items fs30">修改密码</div>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd"><span class="hb-ico ico-phone"></span></div>
        <div class="weui-cell__bd">
          <div class="bd-items fs30">换绑手机</div>
        </div>
        <div class="weui-cell__ft"></div>
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
