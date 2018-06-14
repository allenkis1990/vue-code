<template>
  <!--退款记录-->
  <div class="contain">
    <!--成功-->
    <div class="hb-timeline-box bor-b20">
      <div class="hb-timeline">
        <div class="timeline-items">
          <span class="hb-ico ico-succ"></span>
          <div class="items-bd">
            <div class="items-info">退款成功</div>
            <div class="sub-info">2017-12-12  09:23</div>
          </div>
        </div>
        <div class="timeline-items">
          <span class="hb-ico ico-audit"></span>
          <div class="items-bd">
            <div class="items-info">退款审核通过</div>
            <div class="sub-info">2017-12-12  09:23</div>
          </div>
        </div>
        <div class="timeline-items">
          <span class="hb-ico ico-submit"></span>
          <div class="items-bd">
            <div class="items-info">退款提交申请</div>
            <div class="sub-info">2017-12-12  09:23</div>
            <div class="sub-info">订单号：235436546547657</div>
          </div>
        </div>
      </div>
    </div>
    <!--/成功-->
    <!--拒绝-->
    <div class="hb-timeline-box bor-b20">
      <div class="hb-timeline">
        <div class="timeline-items">
          <span class="hb-ico ico-fail"></span>
          <div class="items-bd">
            <div class="items-info">退款申请被拒绝</div>
            <div class="sub-info">2017-12-12  09:23</div>
            <div class="sub-info ci">原因：好烦好烦好大风和改善的分好烦好烦好大风和改善的分</div>
          </div>
        </div>
        <div class="timeline-items">
          <span class="hb-ico ico-submit"></span>
          <div class="items-bd">
            <div class="items-info">退款提交申请</div>
            <div class="sub-info">2017-12-12  09:23</div>
            <div class="sub-info">订单号：235436546547657</div>
          </div>
        </div>
      </div>
    </div>
    <!--/拒绝-->
    <!--处理中-->
    <div class="hb-timeline-box bor-b20">
      <div class="hb-timeline">
        <div class="timeline-items">
          <span class="hb-ico ico-ing"></span>
          <div class="items-bd">
            <div class="items-info">退款处理中</div>
          </div>
        </div>
        <div class="timeline-items">
          <span class="hb-ico ico-audit"></span>
          <div class="items-bd">
            <div class="items-info">退款审核通过</div>
            <div class="sub-info">2017-12-12  09:23</div>
          </div>
        </div>
        <div class="timeline-items">
          <span class="hb-ico ico-submit"></span>
          <div class="items-bd">
            <div class="items-info">退款提交申请</div>
            <div class="sub-info">2017-12-12  09:23</div>
            <div class="sub-info">订单号：235436546547657</div>
          </div>
        </div>
      </div>
    </div>
    <!--/处理中-->
    <!--审核通过退款失败-->
    <div class="hb-timeline-box bor-b20">
      <div class="hb-timeline">
        <div class="timeline-items">
          <span class="hb-ico ico-fail"></span>
          <div class="items-bd">
            <div class="items-info">退款失败</div>
            <div class="sub-info">2017-12-12  09:23</div>
            <div class="sub-info ci">原因：好烦好烦好大风和改善的分好烦好烦好大风和改善的分</div>
          </div>
        </div>
        <div class="timeline-items">
          <span class="hb-ico ico-audit"></span>
          <div class="items-bd">
            <div class="items-info">退款审核通过</div>
            <div class="sub-info">2017-12-12  09:23</div>
          </div>
        </div>
        <div class="timeline-items">
          <span class="hb-ico ico-submit"></span>
          <div class="items-bd">
            <div class="items-info">退款提交申请</div>
            <div class="sub-info">2017-12-12  09:23</div>
            <div class="sub-info">订单号：235436546547657</div>
          </div>
        </div>
      </div>
    </div>
    <!--/审核通过退款失败-->
    <div class="weui-panel hb-panel">
      <div class="weui-panel__hd">退款信息</div>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd"><div><div  class="tit">退款单号</div>543437835424245456</div></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd"><div><div  class="tit">退款金额</div>￥434.67</div></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd"><div><div  class="tit">退款方式</div>线下退款</div></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd"><div><div  class="tit">退款原因</div>报错班级</div></div>
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
