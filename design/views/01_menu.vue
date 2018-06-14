<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-left">
        <a class="hb-ico  ico-close"></a>
      </div>
      <div class="header-tit">课程超市6.0</div>
      <div class="header-right">
        <a class="header-txt">登录/注册</a>
      </div>
    </div>
    <!--标题栏-->
    <!--tab-->
    <div class="hb-tab-tit">
      <div class="tab-tit-items current">
        <span class="items-name">培训班学习</span>
        <img class="current-img" src="../images/tab-current-bg.jpg" />
      </div>
      <div class="tab-tit-items">
        <span class="items-name">自主选课学习</span>
        <img class="current-img" src="../images/tab-current-bg.jpg" />
      </div>
    </div>
    <!--/tab-->

    <!--筛选-->
    <div class="screening-bar">
      <div class="screening-items selected">
        <div class="items-tit">2017年</div>
      </div>
      <div class="screening-items">
        <div class="items-tit">专业</div>
      </div>
      <div class="screening-items">
        <div class="items-tit">培训结果</div>
      </div>
    </div>
    <!--/筛选-->

    <!--班级列表-->
    <div class="hb-wrap-box">
      <div class="hb-panel">
        <div class="hb-panel-bd">
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
            <div class="price">
              <div class="now-price">￥<span class="num">30</span></div>
            </div>
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
            <div class="price">
              <div class="now-price">￥<span class="num">30</span></div>
            </div>
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
            <div class="price">
              <div class="now-price">￥<span class="num">30</span></div>
            </div>
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
            <div class="price">
              <div class="now-price">￥<span class="num">30</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/班级列表-->


    <!--侧边栏-->
    <div class="hb-popover">
      <div class="popover-arrow"></div>
      <div class="popover-bd">
        <!--已登录-->
        <!--<div class="user-img-box">-->
          <!--<img class="user-img" src="../images/user-img.jpg">-->
        <!--</div>-->
        <!--/已登录-->
        <!--未登录-->
        <div class="user-img-box">
          <img class="user-img" src="../images/default-user-img.jpg">
          <a class="weui-btn weui-btn_mini weui-btn_default hd-btn">登 录</a>
        </div>
        <!--/已登录-->
        <div class="hb-menu-box">
          <a class="menu-items current"><span class="hb-ico ico-found"></span>发现培训</a>
          <a class="menu-items"><span class="hb-ico ico-car"></span>购物车</a>
          <a class="menu-items"><span class="hb-ico ico-list"></span>报名清单</a>
          <a class="menu-items"><span class="hb-ico ico-class"></span>我的学习</a>
          <a class="menu-items"><span class="hb-ico ico-prove"></span>学习档案</a>
          <a class="menu-items"><span class="hb-ico ico-app"></span>APP学习</a>
          <a class="menu-items"><span class="hb-ico ico-exit"></span>退出登录</a>
        </div>
      </div>
    </div>
    <!--/侧边栏-->
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
