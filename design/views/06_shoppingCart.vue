<template>
  <div class="contain hb-box">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-left">
        <a class="hb-ico ico-menu"></a>
      </div>
      <div class="header-tit">课程超市6.0</div>
      <div class="header-right">
        <a class="hb-ico ico-center"></a>
      </div>
    </div>
    <!--标题栏-->
    <div class="hb-box-bd hb-box-bd-1">
      <!--班级列表-->
      <div class="hb-wrap-box hb-wrap-box-4">
        <div class="hb-panel">
          <div class="hb-panel-bd pb30">
            <div class="hb-media-box">
              <div class="hb-form mr20">
                <!--<img class="img" src="../images/radio.png" alt=" " />-->
                <img class="img" src="../images/radio-checked.png" alt=" " />
              </div>
              <div class="hb-media-box-hd">
                <img class="hb-media-box-thumb" src="../images/course-img.jpg" />
              </div>
              <div class="hb-media-box-bd">
                <div class="hb-media-box-title">这里是一个培训班名称这里是一个培训班名称</div>
                <div class="hb-media-box-desc">科目：专业课 <span class="ml30 year-select">年度：2017年</span></div>
                <div class="hb-media-box-desc">学习形式：培训班学习</div>
                <div class="hb-media-box-desc">学时：30</div>
              </div>
              <div class="price">￥<span class="num">39.99</span></div>
            </div>
            <div class="hb-media-box">
              <div class="hb-form mr20">
                <!--<img class="img" src="../images/radio.png" alt=" " />-->
                <img class="img" src="../images/radio-checked.png" alt=" " />
              </div>
              <div class="hb-media-box-hd">
                <img class="hb-media-box-thumb" src="../images/course-img.jpg" />
              </div>
              <div class="hb-media-box-bd">
                <div class="hb-media-box-title">这里是一个培训班名称这里是一个培训班名称</div>
                <div class="hb-media-box-desc">科目：专业课 <span class="ml30 year-select">年度：2017年</span></div>
                <div class="hb-media-box-desc">学习形式：培训班学习</div>
                <div class="hb-media-box-desc">学时：30</div>
              </div>
              <div class="price">￥<span class="num">39.99</span></div>
            </div>
            <div class="hb-media-box">
              <div class="hb-form mr20">
                <img class="img" src="../images/radio.png" alt=" " />
                <!--<img class="img" src="../images/radio-checked.png" alt=" " />-->
              </div>
              <div class="hb-media-box-hd">
                <img class="hb-media-box-thumb" src="../images/course-img.jpg" />
              </div>
              <div class="hb-media-box-bd">
                <div class="hb-media-box-title">这里是一个培训班名称这里是一个培训班名称</div>
                <div class="hb-media-box-desc">科目：公需课 <span class="ml30">年度：2017年</span></div>
                <div class="hb-media-box-desc">学习形式：培训班学习</div>
                <div class="hb-media-box-desc">学时：30</div>
              </div>
              <div class="price">￥<span class="num">39.99</span></div>
            </div>
            <div class="hb-media-box failure-items">
              <div class="failure-label">失效</div>
              <div class="hb-media-box-hd">
                <img class="hb-media-box-thumb" src="../images/course-img.jpg" />
              </div>
              <div class="hb-media-box-bd">
                <div class="hb-media-box-title">这里是一个培训班名称这里是一个培训班名称</div>
                <div class="hb-media-box-desc">科目：公需课 <span class="ml30">年度：2017年</span></div>
                <div class="hb-media-box-desc">学习形式：培训班学习</div>
                <div class="hb-media-box-desc">学时：30</div>
              </div>
              <div class="price">￥<span class="num">39.99</span></div>
            </div>
            <div class="btn-default btn-s mt30">清空失效培训内容</div>
          </div>
        </div>
      </div>
      <!--/班级列表-->
    </div>

    <div class="hb-tabbar">
      <div class="left-box flex">
        <div class="hb-form mr20">
          <img class="img" src="../images/radio.png" alt=" " />
          <!--<img class="img" src="../images/radio-checked.png" alt=" " />-->
        </div>
        <span class="fs28">全选</span>
        <span class="fs28 ml30">删除</span>
      </div>
      <div class="fs28 c6 mr20">合计：<span class="ci">¥88.00</span></div>
      <div class="hb-btn">结算</div>
      <!--不可操作-->
      <!--<div class="hb-btn disabled">结算</div>-->
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
