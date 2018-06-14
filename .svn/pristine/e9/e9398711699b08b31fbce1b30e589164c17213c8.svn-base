<template>
  <div style="padding-bottom: 1px">
    <div class="weui-panel__bd">
      <div class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd">
          <img class="weui-media-box__thumb" src="../../../design/images/invoice-img.jpg">
        </div>
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title">纸质发票配送费</h4>
          <p class="weui-media-box__desc">发票类型：纸质普票</p>
        </div>
        <div class="price" style="color: #ed2424">￥
          <span class="num">{{subItem.originalPrice}}元</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

</script>
<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";

  .weui-panel__op_sub {
    text-align: right;
    padding: 0px 15px;
    background-color: white;
  }

  .hb-btn-s-sub-cell {
    width: 75px;
    height: 30px;
    line-height: 2.5;
    text-align: center;
    border: 1px solid #ddd;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;
    display: inline-block;
    color: #666;
    font-size: 13px;
    margin-top: 7px;
    margin-bottom: 7px;
  }
</style>
<script>
  export default {
    props: {
      subItem: {
        type: Object,
        require: false,
        default: function () {
          return {
            subOrderNo: '',
            subOrderStatus: 1,
            skuId: '',
            skuIdName: '',
            photoPath: '',
            trainingPeriod: 0,
            totalAmount: 0,
            swapOut: false,
            skuPropertyNameList: [
              {
                skuPropertyId: '',
                skuPropertyName: '科目',
                skuPropertyValueId: '',
                skuPropertyValueName: ''
              },
              {
                skuPropertyId: '',
                skuPropertyName: '专业',
                skuPropertyValueId: '',
                skuPropertyValueName: ''
              },
              {
                skuPropertyId: '',
                skuPropertyName: '继续教育年度',
                skuPropertyValueId: '',
                skuPropertyValueName: '2017'
              }
            ]
          }
        }
      }
    }
  }
</script>
