<template>
  <!--结算-->
  <div class="contain hb-box">
    <div class="hb-box-bd">
      <div class="hb-warm-tips">
        <img class="ico-tips" src="../images/icon-tips.png" />
        <span class="tips-txt">下单后，请在24小时内完成支付。超出24小时再支付可能导致购买失败，需重新下单购买。</span>
      </div>
      <div class="weui-cells hb-panel bor-b20">
        <div class="weui-cell hb-order-status">
          <div class="weui-cell__hd">
            <span class="hb-ico pay-wait"></span>
          </div>
          <div class="weui-cell__bd">
            <div class="fs30">订单状态：<span class="ci">待支付</span></div>
          </div>
        </div>
      </div>
      <div class="weui-panel hb-panel bor-b20">
        <div class="weui-panel__hd">订单信息</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd"><div><span class="tit">订单号</span>543437835424245456</div></div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd"><div><span class="tit">下单时间</span>2017-12-12<span class="ml10">19:23:23</span></div></div>
          </div>
        </div>
      </div>
      <div class="weui-panel hb-panel bor-b20">
        <div class="weui-panel__hd">培训内容</div>
        <div class="weui-panel__bd">
          <div class="hb-media-box">
            <div class="hb-media-box-hd">
              <img class="hb-media-box-thumb" src="../images/course-img.jpg" />
            </div>
            <div class="hb-media-box-bd">
              <div class="hb-media-box-title">这里是一个培训班名称这里是一个培训班名称</div>
              <div class="hb-media-box-desc">年度：2017年</div>
              <div class="hb-media-box-desc">科目：专业课</div>
              <div class="hb-media-box-desc">学时：30</div>
            </div>
            <div class="price">￥<span class="num">39.99</span></div>
          </div>
          <div class="hb-media-box">
            <div class="hb-media-box-hd">
              <img class="hb-media-box-thumb" src="../images/course-img.jpg" />
            </div>
            <div class="hb-media-box-bd">
              <div class="hb-media-box-title">这里是一个培训班名称这里是一个培训班名称</div>
              <div class="hb-media-box-desc">年度：2017年</div>
              <div class="hb-media-box-desc">科目：专业课</div>
              <div class="hb-media-box-desc">学时：30</div>
            </div>
            <div class="price">￥<span class="num">39.99</span></div>
          </div>
        </div>
        <div class="weui-cells">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd"></div>
            <div class="weui-cell__ft weui-cell__ft-1">查看更多</div>
          </div>
        </div>
        <div class="weui-cells">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd"></div>
            <div class="weui-cell__ft weui-cell__ft-2">收起</div>
          </div>
        </div>
      </div>
      <div class="weui-panel hb-panel bor-b20">
        <div class="bor-t sum-bar tr">本订单需支付<span class="ci ml10">￥60</span></div>
      </div>
      <div class="weui-panel hb-panel">
        <div class="weui-panel__hd">支付方式</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd"><img class="hb-pay-img" src="../images/icon-pay-wx.jpg" /></div>
          </div>
        </div>
      </div>
    </div>

    <div class="hb-tabbar">
      <div class="hb-btn hb-btn-3">确认支付</div>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
