<template>
  <!--报名清单-未支付-->
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-left">
        <a class="hb-ico ico-menu"></a>
      </div>
      <div class="header-tit">报名清单</div>
      <div class="header-right">
        <a class="hb-ico ico-center"></a>
      </div>
    </div>
    <!--标题栏-->
    <!--tab-->
    <div class="hb-tab-tit">
      <div class="tab-tit-items current">
        <span class="items-name">未支付</span>
        <img class="current-img" src="../images/tab-current-bg.jpg" />
      </div>
      <div class="tab-tit-items">
        <span class="items-name">已支付</span>
        <img class="current-img" src="../images/tab-current-bg.jpg" />
      </div>
      <div class="tab-tit-items">
        <span class="items-name">交易关闭</span>
        <img class="current-img" src="../images/tab-current-bg.jpg" />
      </div>
    </div>
    <!--/tab-->

    <div class="hb-wrap-box hb-wrap-box-2">
      <div class="weui-panel hb-panel bor-b20">
        <div class="weui-panel hb-panel">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
              <div class="to c6 fs28"><span class="label-company">机构</span>四川建设岗位培训与执业资格注册中心</div>
            </div>
            <div class="weui-cell__ft"></div>
          </div>
        </div>
        <!--<div class="order-info-box">-->
          <!--<div>2016-12-12 09:23</div>-->
          <!--<div class="tr-2">订单号：358956235412358</div>-->
        <!--</div>-->
        <div class="hb-media-box hb-media-box-1">
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
        <div class="order-info-box">
          <div>订单状态：<span class="ci">支付中</span></div>
          <div>总价<span class="ml10 ci fs32">¥ 30</span> </div>
        </div>
        <div class="weui-panel__op bor-t">
          <div class="hb-btn-s">取消订单</div>
          <div class="hb-btn-s current">立即支付</div>
        </div>
      </div>
      <div class="weui-panel hb-panel bor-b20">
        <div class="weui-panel hb-panel">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
              <div class="to c6 fs28"><span class="label-company">机构</span>四川建设岗位培训与执业资格注册中心</div>
            </div>
            <div class="weui-cell__ft"></div>
          </div>
        </div>
        <!--<div class="order-info-box">-->
          <!--<div>2016-12-12 09:23</div>-->
          <!--<div class="tr-2">订单号：358956235412358</div>-->
        <!--</div>-->
        <div class="hb-media-box hb-media-box-1">
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
        <div class="hb-media-box hb-media-box-1">
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
        <div class="order-info-box">
          <div>订单状态：<span class="ci">未支付</span></div>
          <div>总价<span class="ml10 ci fs32">¥ 30</span> </div>
        </div>
        <div class="weui-panel__op bor-t">
          <div class="hb-btn-s">取消订单</div>
          <div class="hb-btn-s current">立即支付</div>
        </div>
      </div>
    </div>

    <!--返回顶部-->
    <div class="layer-box">
      <div class="a-items">
        <img class="img" src="../images/icon-top.png" alt=" " />
      </div>
    </div>
    <!--/返回顶部-->
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
