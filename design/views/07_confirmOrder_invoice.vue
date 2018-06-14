<template>
  <!--发票-->
  <div class="contain hb-box">
    <div class="hb-box-bd">
      <div class="weui-panel hb-panel bor-b20">
        <div class="weui-panel__hd">开票方式</div>
        <div class="weui-cells">
          <div class="weui-cell pbr0">
            <div class="weui-cell__bd">
              <div class="hb-btn-s w1 current">普通发票</div>
              <div class="hb-btn-s w1">普通电子发票</div>
              <div class="hb-btn-s w1">增值税专用发票</div>
              <div class="hb-btn-s w1">非税务票(纸质)</div>
            </div>
          </div>
          <div class="p20 fs26 c9">纸质发票开出以后，我们将会以快递的形式将发票寄送到您制定的地址<span class="ci">（快递费到付）</span></div>
          <!--<div class="p20 fs26 c9">电子发票即增值税普通发票的电子版本，可支持报销入账，其法律效力、基本用途及使用规定和纸质发票相同。</div>-->
          <!--<div class="p20 fs26 c9">我公司依法开具发票，请您按照税法规定使用发票。</div>-->
          <!--<div class="p20 fs26 c9">非税务票是财政投放的票据，行政事业单位收取行政事业性收费开具的票据，是正式票据，可以作为报销凭证。</div>-->
        </div>
      </div>
      <div class="weui-panel hb-panel bor-b20">
        <div class="weui-panel__hd">发票抬头</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd flex">
              <div class="hb-form">
                <img class="img" src="../images/radio.png" alt=" " />
                <!--<img class="img" src="../images/radio-checked.png" alt=" " />-->
              </div>
              <div class="ml20">个人</div>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd flex">
              <div class="hb-form">
                <!--<img class="img" src="../images/radio.png" alt=" " />-->
                <img class="img" src="../images/radio-checked.png" alt=" " />
              </div>
              <div class="ml20">单位</div>
            </div>
          </div>
        </div>
      </div>

      <!--个人-->
      <div class="weui-panel hb-panel bor-b20">
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd"><div class="weui-label"><span class="star">*</span>个人姓名</div></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入" />
            </div>
          </div>
        </div>
      </div>
      <!--/个人-->
      <!--单位-->
      <div class="weui-panel hb-panel">
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd"><div class="weui-label"><span class="star">*</span>单位全称</div></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入" />
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd"><div class="weui-label"><span class="star">*</span>纳税人识别号</div></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入" />
            </div>
          </div>
        </div>
        <div class="c9 fs26 p20">按照国税总局公告，自2017年7月1日起，企业索取的增值税发票需填写纳税人识别号，不符合规定的发票，不得作为合法的税收凭证。</div>
      </div>
      <!--/单位-->
      <!--增票资质-->
      <div class="weui-panel hb-panel">
        <div class="weui-panel__hd">增票资质</div>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd"><div class="weui-label"><span class="star">*</span>单位全称</div></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入" />
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd"><div class="weui-label"><span class="star">*</span>纳税人识别号</div></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入" />
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd"><div class="weui-label"><span class="star">*</span>注册地址</div></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入" />
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd"><div class="weui-label"><span class="star">*</span>注册电话</div></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入" />
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd"><div class="weui-label"><span class="star">*</span>开户银行</div></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入" />
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd"><div class="weui-label"><span class="star">*</span>银行账号</div></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入" />
            </div>
          </div>
        </div>
      </div>
      <!--/增票资质-->
    </div>

    <div class="hb-tabbar">
      <div class="hb-btn hb-btn-3">保 存</div>
    </div>
  </div>

</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
