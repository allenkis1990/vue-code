<!-- <template>
  <div class="container">
    <div class="hb-header-box">
      <div class="header-left">
        <a href="javascript:void(0);" class="hb-ico ico-return"></a>
      </div>
      <div class="header-tit">订单详情</div>
      <div class="header-right">
        <a href="javascript:void(0);" class="hb-ico ico-center" v-if="false"></a>
      </div>
    </div>
    <div class="hb-wrap-box">
      <div class="hb-timeline-box">
        <ul class="hb-timeline">
          <li>
            <span class="hb-ico ico-succ"></span>
            <div class="items-bd">
              <p class="items-info">交易成功</p>
              <p class="sub-info">2017-12-12  09:23</p>
            </div>
          </li>
          <li>
            <span class="hb-ico ico-send"></span>
            <div class="items-bd">
              <p class="items-info">已发货</p>
              <p class="sub-info">2017-12-12  09:23</p>
            </div>
          </li>
          <li>
            <span class="hb-ico ico-paid"></span>
            <div class="items-bd">
              <p class="items-info">已付款</p>
              <p class="sub-info">2017-12-12  09:23</p>
            </div>
          </li>
          <li>
            <span class="hb-ico ico-submit"></span>
            <div class="items-bd">
              <p class="items-info">退款提交申请</p>
              <p class="sub-info">2017-12-12  09:23</p>
              <p class="sub-info">订单号：235436546547657</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template> -->
<template>
  <div class="container">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-left">
        <a href="javascript:void(0);" class="hb-ico ico-return"></a>
      </div>
      <div class="header-tit">空数据</div>
    </div>
    <!--标题栏-->

    <!--空数据-->
    <div class="hb-wrap-box">
      <div class="no-data-box">
        <img class="no-data-img" src="../../../design/images/no-data-img.png" alt=" ">
        <p class="no-data-txt">暂时还没有数据~</p>
      </div>
    </div>
    <!--/空数据-->
  </div>
</template>
<script>
  export default {
    created () {
      console.log('Category created')
    }
  }
</script>
