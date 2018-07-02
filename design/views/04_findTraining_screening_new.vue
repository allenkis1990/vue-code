<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-left">
        <a class="hb-ico ico-menu"></a>
      </div>
      <div class="header-tit">四川建设岗位培训与执业资格注册中心</div>
      <div class="header-right">
        <a class="header-txt">登录/注册</a>
      </div>
    </div>
    <!--标题栏-->
    <!--tab-->
    <div class="hb-tab-tit">
      <div class="tab-tit-items">
        <span class="items-name">培训班学习</span>
        <img class="current-img" src="../images/tab-current-bg.jpg" />
      </div>
      <div class="tab-tit-items current">
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
      <div class="screening-items open">
        <div class="items-tit">专业</div>
      </div>
      <div class="screening-items">
        <div class="items-tit">培训结果</div>
      </div>
    </div>
    <!--/筛选-->

    <!--筛选-->
    <div class="select-items-mask">
      <div class="cont-box">
        <div  class="select-items-cont">
          <div class="select-items-hd">
            <div class="filter-circle"></div>
            <span class="fs30">培训机构</span>
          </div>
          <div class="select-items-bd select-items-bd-1">
            <div class="select-item">四川建设岗位培训与执业资格注册中心</div>
            <div class="select-item">四川建设岗位培训与执业资格注册中心</div>
            <div class="select-item current">四川建设岗位培训与执业资格注册中心</div>
            <div class="select-item">四川建设岗位培训与执业资格注册中心</div>
          </div>
        </div>
        <div  class="select-items-cont select-items-cont-1">
          <div class="select-items-hd">
            <div class="filter-circle"></div>
            <span class="fs30">科目</span>
          </div>
          <div class="select-items-bd">
            <div class="select-item">全部</div>
            <div class="select-item">公需课</div>
            <div class="select-item current">专业课</div>
          </div>
        </div>
        <div  class="select-items-cont select-items-cont-2">
          <div class="select-items-hd">
            <div class="filter-circle"></div>
            <span class="fs30">年度</span>
          </div>
          <div class="select-items-bd">
            <div class="select-item">全部</div>
            <div class="select-item">2018</div>
            <div class="select-item current">2017</div>
            <div class="select-item">2016</div>
            <div class="select-item">2015</div>
          </div>
        </div>
      </div>
      <div class="btn-primary">确定</div>
    </div>
    <!--/筛选-->

  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
