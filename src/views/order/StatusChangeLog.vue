<template>
    <div class="container">
      <!--标题栏-->
      <div class="hb-header-box">
        <div class="header-left">
          <a href="javascript:void(0);" class="hb-ico ico-return" @click="back()"></a>
        </div>
        <div class="header-tit">订单详情</div>
        <div class="header-right">
          <a href="javascript:void(0);" class="hb-ico ico-center" v-if="false"></a>
        </div>
      </div>
      <!--标题栏-->
      <scroller lock-x>
        <div class="hb-timeline-box hb-timeline-box-1">
          <div class="hb-timeline">
            <div class="timeline-items" v-for="(item, index) in statusLogList" :key="index">
                <span :class="getStatusStyle(item)"></span>
                <div class="items-bd">
                  <p class="items-info">{{getStatusText(item)}}</p>
                  <p class="sub-info">{{item.operateTime}}</p>
                  <p class="sub-info" v-if="item.status == 0">订单号: {{orderNo}}</p>
                </div>
            </div>
          </div>
        </div>
      </scroller>
    </div>
</template>
<script>
// import * as storeTypes from '../../store/types'
import { Scroller } from 'vux'
export default {
  components: { Scroller },
  data () {
    return {
      orderNo: '',
      // statusLogList: this.$route.params.statusLogList
      statusLogList: []
    }
  },
  computed: {},
  methods: {
    getStatusStyle: function (item) {
      var str = []
      // 0 订单提交成功 1 已付款 2 已发货 3 交易成功
      // 1-下单 3-支付成功 5-发货完成 6-交易成功 7-交易关闭
      switch (item.status) {
        case 0: {
          str = ['hb-ico', 'ico-submit']
          break
        }
        case 1: {
          str = ['hb-ico', 'ico-submit']
          break
        }
        case 3: {
          str = ['hb-ico', 'ico-paid']
          break
        }
        case 5: {
          str = ['hb-ico', 'ico-send']
          break
        }
        case 6: {
          str = ['hb-ico', 'ico-success']
          break
        }
        case 7: {
          str = ['hb-ico', 'ico-submit']
          break
        }
        default:
          break
      }
      return str
    },
    getStatusText: function (item) {
      var str = ''
      switch (item.status) {
        case 0: {
          str = '订单提交成功'
          break
        }
        case 1: {
          str = '下单成功'
          break
        }
        case 3: {
          str = '已付款'
          break
        }
        case 5: {
          str = '已发货'
          break
        }
        case 6: {
          str = '交易成功'
          break
        }
        case 7: {
          str = '交易关闭'
          break
        }
        default:
          break
      }
      return str
    }
  },
  created () {
  },
  mounted () {
    this.orderNo = this.$route.query.orderNo
    this.statusLogList = this.$route.query.statusLogList.sort((a, b) => { return b.status - a.status })
  }
}
</script>
