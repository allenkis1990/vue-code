<template>
  <div class="contain">
    <div class="js_dialog" id="iosDialog1" style="opacity: 1;">
      <div class="weui-mask"></div>
      <div class="weui-dialog weui-dialog-1">
        <div class="weui-dialog__bd weui-dialog__bd-1">
          <img class="xcq-img" src="../images/qrcode.png" />
          <p class="mt20">长按识别二维码</p>
          <a class="btn-primary btn-m mt40">保存二维码</a>
          <a class="btn-close"><img src="../images/icon-close.png" /></a>
        </div>
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
