<template>
  <div class="container weui-tab">
    <div class="weui-tab__panel">
      <div class="weui-panel hb-panel">
        <div class="weui-panel__hd">配送方式</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <!-- V1.0.0修复版本隐藏 -->
              <!-- <div @click="chooseDeliverType(2)" :class="getDeliverTypeStyle(2)">自 取</div> -->
              <div @click="chooseDeliverType(1)" :class="getDeliverTypeStyle(1)">邮 寄</div>
            </div>
          </div>
        </div>
      </div>
      <!-- V1.0.0修复版本隐藏 -->
      <!--自取-->
      <!-- <div class="tab-bd mt10" v-if="pageState.deliverType == 2">
        <div class="hb-wrap-box" v-if="selfPickAddressList.length === 0">
          <div class="no-data-box">
            <img class="no-data-img" src="../../../../design/images/no-data-img.png" alt=" ">
            <p class="no-data-txt">暂无自取地址~</p>
          </div>
        </div>
        <div class="weui-panel hb-panel" v-for="(item,index) in selfPickAddressList" :key="item.selfStorageId">
          <div class="weui-cells weui-cells_radio">
            <label class="weui-cell weui-check__label">
              <div class="weui-cell__bd">
                <input type="radio" class="hb-radio weui-check" v-model="currentSelfStorageIndex" :value="index">
                <span class="form-checked"></span>
                {{item.selfStorageName}}
              </div>
            </label>
            <div class="hb-info-cells">
              <div class="hb-info-cell">
                <div class="hb-info-cell__bd">
                  <p>自取地点</p>
                </div>
                <div class="hb-info-cell__ft">{{item.selfStoragePickupAddress}}</div>
              </div>
              <div class="hb-info-cell">
                <div class="hb-info-cell__bd">
                  <p>领取时间</p>
                </div>
                <div class="hb-info-cell__ft">{{item.selfStoragePickupDate}}</div>
              </div>
              <div class="hb-info-cell">
                <div class="hb-info-cell__bd">
                  <p>备注</p>
                </div>
                <div class="hb-info-cell__ft">{{item.comment}}</div>
              </div>
            </div>
          </div>
        </div>

      </div> -->
      <!--/自取-->

      <div class="tab-bd mt10" v-if="pageState.deliverType == 1">
        <div class="weui-panel hb-panel">
          <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
              <div class="weui-cell__hd"><label class="weui-label"><i class="star">*</i>收件人</label></div>
              <div class="weui-cell__bd">
                <input class="weui-input" type="text" placeholder="请填写收件人姓名" v-model="userAddressInfo.receiverName">
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd"><label class="weui-label"><i class="star">*</i>手机号</label></div>
              <div class="weui-cell__bd">
                <input class="weui-input" type="text" placeholder="请填写收件人手机号" v-model="userAddressInfo.mobileNo">
              </div>
            </div>
            <popup-picker class="hb-area-box" placeholder="请选择收件地区" value-text-align="left" :title="areaTitle()" style="flex:1" :data="areaArray" :columns="3" v-model="areaValue" show-name></popup-picker>
            <div class="weui-cell weui-cell-start">
              <div class="weui-cell__hd"><label class="weui-label"><i class="star">*</i>详细地址</label></div>
              <div class="weui-cell__bd">
                <textarea class="weui-textarea" placeholder="请填写收件详细地址" v-model="userAddressInfo.addressDetails" rows="3"></textarea>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd"><label class="weui-label"><i class="star">*</i>邮政编码</label></div>
              <div class="weui-cell__bd">
                <input class="weui-input" type="text" placeholder="请填写邮政编码" v-model="userAddressInfo.postCode">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-tabbar hb-tabbar">
      <div @click="saveCerDeliverInfo()" class="hb-btn">保 存</div>
    </div>
  </div>
</template>

<style lang="less">
.container .hb-area-box{
    &:before{
      left: 0;
    }
    .weui-cell__hd{
      width:105px;
    }
    .vux-cell-value {
      color: #333
    }
  }
</style>
<script>
import * as storeTypes from '../../../store/types'
import { Group, PopupPicker } from 'vux'
export default {
  components: {
    Group,
    PopupPicker
  },
  data () {
    return {
      cerInfo: this.$store.state.orderModule.completeCerInfo,
      pageState: {
        deliverType: 1
      },
      selfPickAddressList: [],
      userAddressInfo: {
        id: '',
        receiverName: '',
        mobileNo: '',
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        districtId: '',
        districtName: '',
        addressDetails: '',
        postCode: ''
      },
      currentSelfStorageIndex: -1,
      areaValue: [],
      areaArray: []
    }
  },
  computed: {},
  methods: {
    // 页面抽离函数
    changeAreaInfoToAreaArray: function (areaInfo) {
      for (var i = 0; i < areaInfo.length; i++) {
        var province = areaInfo[i]
        var tempProvince = { name: province.provinceName, value: province.provinceCode, parent: 0 }
        this.areaArray.push(tempProvince)
        for (var j = 0; j < province.cities.length; j++) {
          var city = province.cities[j]
          var tempCity = { name: city.cityName, value: city.cityCode, parent: province.provinceCode }
          this.areaArray.push(tempCity)
          for (var k = 0; k < city.districts.length; k++) {
            var district = city.districts[k]
            var tempDistrict = { name: district.districtName, value: district.districtCode, parent: city.cityCode }
            this.areaArray.push(tempDistrict)
          }
        }
      }
    },
    checkInformation () {
      if (!this.userAddressInfo.receiverName.length) {
        this.toast('收件人未填写，请核对后提交')
        return false
      }
      if (this.userAddressInfo.mobileNo.length !== 11) {
        this.toast('手机号不正确，请核对后提交')
        return false
      }
      if (!this.userAddressInfo.provinceId.length || !this.userAddressInfo.cityId.length || !this.userAddressInfo.districtId.length) {
        this.toast('收件地区未填写，请核对后提交')
        return false
      }
      if (!this.userAddressInfo.addressDetails.length) {
        this.toast('收货详细地址未填写，请核对后提交')
        return false
      }
      if (!this.isPostalCodeAvailable(this.userAddressInfo.postCode)) {
        this.toast('邮政编号不正确，请核对后提交')
        return false
      }
      return true
    },
    isPostalCodeAvailable (str) {
      let myreg = /^[0-9]{6}$/
      if (myreg.test(str)) {
        return true
      } else {
        return false
      }
    },
    // 页面样式控制
    areaTitle: function () {
      return '<i class="star">*</i>收件地区                        '
    },
    getDeliverTypeStyle: function (current) {
      if (this.pageState.deliverType === current) {
        return ['hb-btn-s', 'current']
      } else {
        return ['hb-btn-s']
      }
    },
    // 页面事件
    chooseDeliverType: function (deliverType) {
      this.pageState.deliverType = deliverType
      if (this.pageState.deliverType === 1) {
        this.currentSelfStorageIndex = -1
      }
    },
    saveCerDeliverInfo: function () {
      // 1 邮寄  2 自取
      if (this.pageState.deliverType === 1) {
        // 赋值
        this.cerInfo.deliverType = this.pageState.deliverType
        this.cerInfo.receiverAddressId = this.userAddressInfo.id
        this.cerInfo.addressDetails = this.userAddressInfo.addressDetails
        if (this.areaValue.length !== 3) {
          this.toast('收件地区未填写，请核对后提交')
          return false
        }
        this.userAddressInfo.provinceId = this.areaValue[0]
        this.userAddressInfo.cityId = this.areaValue[1]
        this.userAddressInfo.districtId = this.areaValue[2]
        // 验证
        if (this.checkInformation()) {
          // 证书配送信息存入store
          this.$store.dispatch(storeTypes.ORDER_SET_COMPLETE_TEMP_CER_INFO, this.cerInfo)
          // 更新用户地址 然后返回
          this.$store.dispatch(storeTypes.ACCOUNT_UPDATE_RECEIPTINFO, this.userAddressInfo).then((data) => {
            if (data.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
              this.toast(data.head.message)
            } else {
              this.cerInfo.receiverAddressId = data.data.id
              this.$store.dispatch(storeTypes.ORDER_SET_COMPLETE_TEMP_CER_INFO, this.cerInfo)
              this.back()
            }
          }).catch(e => {
            console.log('>>' + e)
          })
        }
      } else if (this.pageState.deliverType === 2) {
        // 验证
        // 提交自取 存入store
        this.cerInfo.deliverType = this.pageState.deliverType
        this.cerInfo.selfStorageId = this.selfPickAddressList[this.currentSelfStorageIndex].selfStorageId
        this.cerInfo.selfStorageName = this.selfPickAddressList[this.currentSelfStorageIndex].selfStorageName
        this.$store.dispatch(storeTypes.ORDER_SET_COMPLETE_TEMP_CER_INFO, this.cerInfo)
        this.back()
      }
    },
    // 初始化事件
    requestSelfPickAddress: function () {
      this.showLoading('加载中...')
      this.$store.dispatch(storeTypes.ORDER_GET_SELF_PICK_ADDRESS, {type: 0}).then(data => {
        this.hideLoading()
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          this.selfPickAddressList = data.data.selfStorageList
          for (var i = 0; i < this.selfPickAddressList.length; i++) {
            var item = this.selfPickAddressList[i]
            if (item.selfStorageId === this.cerInfo.selfStorageId) {
              this.currentSelfStorageIndex = i
              break
            }
          }
        } else {
          console.log(JSON.stringify(data))
        }
      }).then(e => {
        this.hideLoading()
      })
    },
    requestAreaInfo: function () {
      this.$store.dispatch(storeTypes.GLOBAL_GET_AREA_INFO).then(data => {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          var areaInfo = data.data.provinces
          this.changeAreaInfoToAreaArray(areaInfo)
        } else {
          console.log(JSON.stringify(data))
        }
      })
    },
    requestUserAddress: function () {
      this.$store.dispatch(storeTypes.ACCOUNT_GET_RECEIPTINFO, {}).then(data => {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          this.userAddressInfo = data.data
          this.areaValue.push(this.userAddressInfo.provinceId)
          this.areaValue.push(this.userAddressInfo.cityId)
          this.areaValue.push(this.userAddressInfo.districtId)
        } else {
          console.log(JSON.stringify(data))
        }
      }).then(e => {
        this.hideLoading()
      })
    },
    initDeliver: function () {
      // 1 邮寄 2 自取
      if (this.cerInfo.deliverType === 1) {
        this.pageState.deliverType = 1
      } else if (this.cerInfo.deliverType === 2) {
        this.pageState.deliverType = 2
      }
    }
  },
  mounted () {
    // 获取自取地址信息
    this.requestSelfPickAddress()
    // 获取用户地址
    this.requestUserAddress()
    // 获取地区信息
    this.requestAreaInfo()
    this.initDeliver()
  }
}
</script>
