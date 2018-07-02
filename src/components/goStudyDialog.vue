<template>
  <div class="js_dialog"
       v-if="showGoStudyDialog"
       id="iosDialog1"
       style="opacity: 1;">
    <div class="weui-mask"></div>
    <div class="weui-dialog weui-dialog-1">
      <div class="weui-dialog__bd weui-dialog__bd-1">
        <div class="tl fs28">
          <p class="b fs32">进入我的学习有以下方式：</p>
          <p class="mt10"><span class="b">方式一：</span>公众号菜单 <span class="cb">"我的学习"</span> 进入小程序；</p>
          <p class="mt10"><span class="b">方式二：</span>当前网站主页左侧菜单 <span class="cb">"我的学习"</span> 进入小程序；</p>
          <p class="mt10"><span class="b">方式三：</span>进入微信 → 发现 → 小程序，搜索 <span class="cb">"福建华博课程超市+"</span> ；</p>
          <p class="mt10"><span class="b">方式四：</span>请 <span class="cb">保存</span> 小程序二维码，扫码，进入学习。</p>
        </div>
        <img class="xcq-img-1 mt20" src="../../design/images/xcx.jpg" />
        <!--<a class="btn-primary btn-m mt20">保存二维码</a>-->
        <a class="btn-close" @click="$emit('hide')"><img src="../../design/images/icon-close.png" /></a>
      </div>
    </div>
  </div>
</template>

<style lang="less">
</style>
<script>
  export default {
    data: function () {
      return {
        showGoStudyDialog: false
      }
    },
    props: {
      show: {
        type: Boolean
      }
    },
    methods: {
    },
    mounted: function () {
    },
    watch: {
      show: function (nv) {
        console.log(nv)
        if (nv !== undefined) {
          this.showGoStudyDialog = nv
        }
      }
    }
  }
</script>
