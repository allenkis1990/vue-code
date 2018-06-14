<template>
  <!--发票配送-->
  <div class="contain hb-box">
    <div class="hb-box-bd">
      <div class="weui-panel hb-panel bor-b20 hb-panel-2" style="position:relative">
        <div class="weui-panel__hd">开票方式</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <div class="hb-btn-s mr20"
                   @click='chooseDeliverTypeAction(item)'
                   :class="{'current':item.deliverTypeValue == selectedDeliverType}"
                   v-for="(item,index) in deliverTypeItemsArray">{{item.deliverTypeName}}
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="weui-panel hb-panel">
        <div v-show='selectedDeliverType===1'>
          <div class="weui-cells bor-b20"
               @click="selectSelfPickerItemAction(item)"
               v-for="(item,index) in selfPickerAddressList">
            <div class="weui-cell flex">
              <div class="hb-form">
                <img class="img"
                     v-if='item.selfStorageId != selectedSelfPickerAddress.selfStorageId'
                     src="../../../../design/images/radio.png" alt=" " />
                <img class="img"
                     v-if='item.selfStorageId == selectedSelfPickerAddress.selfStorageId'
                     src="../../../../design/images/radio-checked.png" alt=" "/>
              </div>
              <div class="ml20">{{(index+1)+"、" + item.selfStorageName}}</div>
            </div>
            <div class="hb-info-cells">
              <div class="hb-info-cell">
                <div class="hb-info-cell__bd"><span>自取地点</span></div>
                <div class="hb-info-cell__ft">{{item.selfStoragePickupAddress}}</div>
              </div>
              <div class="hb-info-cell">
                <div class="hb-info-cell__bd"><span>领取时间</span></div>
                <div class="hb-info-cell__ft">{{item.selfStoragePickupDate}}</div>
              </div>
              <div class="hb-info-cell">
                <div class="hb-info-cell__bd"><span>备注</span></div>
                <div class="hb-info-cell__ft">{{item.comment}}</div>
              </div>
            </div>
          </div>
        </div>


        <!--邮寄-->
        <div class="weui-panel hb-panel" v-show='selectedDeliverType===2'>
          <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <div class="weui-label"><span class="star">*</span>姓名</div>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input"
                       v-model="userAddressInfo.receiverName"
                       type="text"
                       placeholder="请输入收件人姓名"/>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <div class="weui-label"><span class="star">*</span>手机号</div>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input"
                       v-model="userAddressInfo.mobileNo"
                       type="text"
                       placeholder="请输入收件人手机号"/>
              </div>
            </div>
            <div class="weui-cell weui-cell_access">
              <div class="weui-cell__hd">
                <div class="weui-label"><span class="star">*</span>收件地区</div>
              </div>
              <div class="weui-cell__bd"><!--<select name="select2" class="weui-select"></select>--><area-select :data-source="areaList"
                                                                                                                 :value-model="areaPickerModel"
                                                                                                                 @pickerConfirmAction="_pickerConfirmAction"
                                                                                                                 area-placeholder="请选择收件地区"></area-select></div>
            </div>
            <div class="weui-cell weui-cell-start">
              <div class="weui-cell__hd">
                <div class="weui-label"><span class="star">*</span>详细地址</div>
              </div>
              <div class="weui-cell__bd">
                <textarea class="weui-textarea"
                          v-model="userAddressInfo.addressDetails"
                          placeholder="请输入收件人详细地址"></textarea>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <div class="weui-label"><span class="star">*</span>邮政编码</div>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input"
                       type="text"
                       v-model="userAddressInfo.postCode"
                       placeholder="请输入收件人邮政编码"/>
              </div>
            </div>
          </div>
        </div>
        <!--/邮寄-->
      </div>
    </div>

    <div class="hb-tabbar">
      <div class="hb-btn hb-btn-3" @click='saveAction'>保 存</div>
    </div>

  </div>
</template>

<style lang="less">
  @import "../../../../design/styles/webstyle.less";
</style>

<script>
  import * as storeTypes from '@/store/types'
  import utils from '@/common/util/Utils'
  import constant from '@/global/constants/AppConstant'
  import areaSelect from '@/components/areaSelect'

  export default {
    components: {
      areaSelect
    },
    data () {
      return {
        // 选中的配送方式 1、自取 2、邮寄
        selectedDeliverType: -1,
        // 支持的方式
        supportDeliveryTypeArray: [],
        deliverTypeItemsArray: [],

        selectedSelfPickerAddress: {},
        userAddressInfo: {
          receiverName: '',
          mobileNo: '',
          postCode: '',
          addressDetails: '',
          areaValue: '',
          provinceId: '',
          cityId: '',
          districtId: ''
        },
        selfPickerAddressList: [],
        areaInfo: {},
        prePickerIndex: [],
        // 上一次保存的发票数据
        preInvoiceInfo: {},
        textAreaTop: 0,
        areaList: [],
        areaPickerModel: []
      }
    },
    computed: {},
    mounted () {
//      wx.getSystemInfo({
//        success: function (res) {
//          if (res.system.indexOf('iOS') >= 0) {
//            context.setData({
//              textAreaTop: -12
//            })
//          }
//        }
//      })
      var that = this
      var options = this.$route.query
      console.log(options, '传过来的参数')
      if (options.supportDeliveryType !== undefined && options.supportDeliveryType.length) {
        let supportDeliveryTypeArray = JSON.parse(options.supportDeliveryType)
        supportDeliveryTypeArray = this.refundArraySort(supportDeliveryTypeArray)
        this.supportDeliveryTypeArray = supportDeliveryTypeArray
//        设置开票方式数组为自取和邮寄
        this.getSenDdeliverTypeArray()
//        设置默认开票方式为自取
        this.getSelectedDeliverType()
      }
      if (options.invoiceInfo !== undefined && options.invoiceInfo.length) {
        let invoiceInfo = JSON.parse(options.invoiceInfo)
        if (invoiceInfo.deliverType !== undefined) {
          this.selectedDeliverType = invoiceInfo.deliverType
          this.preInvoiceInfo = invoiceInfo
        }
      }
      this.loadSelfPickAddressListData()
      this.setAreaInfo()
      setTimeout(function () {
        that.setUserAddressInfo()
      }, 500)
    },
    methods: {
      /**
       * 请求自取地点列表数据
       */
      loadSelfPickAddressListData () {
        let params = {
          type: 'INVOICE'
        }
        this.$vux.loading.show({
          text: '加载中'
        })

        var type = 'get'
        var url = constant.apiUrl.createOrderModule.orderSelfStorageList
        utils.getAjaxData(type, params, url).then(res => {
          this.$vux.loading.hide()
          if (res.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
            return this.toast(res.head.message)
          } else {
            this.selfPickerAddressList = res.data.selfStorageList
            if (this.preInvoiceInfo.deliverType !== undefined && this.preInvoiceInfo.deliverType === 1 && this.preInvoiceInfo.selfStorageId.length) {
              for (let index = 0; index < this.selfPickerAddressList.length; index++) {
                let item = this.selfPickerAddressList[index]
                if (item.selfStorageId === this.preInvoiceInfo.selfStorageId) {
                  this.selectedSelfPickerAddress = item
                }
              }
            }
          }
        }).catch(e => {
          console.log(e)
          this.$vux.loading.hide()
          return this.toast('请求失败')
        })
      },
      /**
       * 设置用户收货地址
       */
      setUserAddressInfo () {
        var that = this
        var getReceiveAddressInfoAction = this.$store.dispatch('getReceiveAddressInfo', this)
        getReceiveAddressInfoAction.then(function (data) {
          console.log(data,'收货地址！！！！')
          if (data) {
            that.userAddressInfo = data
            if (data.districtId) {
//              设置picker的model[xx,xx,xx]
              that.areaPickerModel = [data.provinceId, data.cityId, data.districtId]
            }
          }
        })
      },
      /**
       * 设置地区选择
       */
      setAreaInfo () {
        var that = this
        var getAreaInfoAction = this.$store.dispatch('getAreaInfo', this)
        getAreaInfoAction.then(function (data) {
//        console.log(data, 'getAreaInfo')
          if (data && data.provinces && data.provinces.length) {
            data.provinces.forEach(function (item) {
              that.areaList.push({
                name: item.provinceName,
                value: item.provinceCode,
                parent: 0
              })
              item.cities.forEach(function (subItem) {
                that.areaList.push({
                  name: subItem.cityName,
                  value: subItem.cityCode,
                  parent: item.provinceCode
                })
                subItem.districts.forEach(function (grandItem) {
                  that.areaList.push({
                    name: grandItem.districtName,
                    value: grandItem.districtCode,
                    parent: subItem.cityCode
                  })
                })
              })
            })
            console.log(that.areaList,'getAreaInfo')
          }
        })
      },
      /**
       * 保存事件
       */
      saveAction () {
//        直接获取到上一个页面的数据进行修改
        let context = this
        if (this.selectedDeliverType === 2) {
          if (this.checkInformation()) {
            let context = this
            let params = {}
            params = this.userAddressInfo
            this.$vux.loading.show({
              text: '加载中'
            })
            var type = 'post'
            var url = constant.apiUrl.createOrderModule.orderUpdateUserReceiverAddress
            utils.getAjaxData(type, params, url).then(res => {
              this.$vux.loading.hide()
              if (res.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
                return this.toast(res.head.message)
              } else {
                this.$store.state.orderModule.receiveAddressInfo = res.data
                this.$store.state.orderModule.invoiceInfo.deliverType = context.selectedDeliverType
                this.$store.state.orderModule.invoiceInfo.receiverAddressId = res.data.receiverId
                this.$store.state.orderModule.invoiceInfo.addressDetails = res.data.addressDetails
                this.$store.state.orderModule.showInvoiceSendText = '邮寄（' + context.userAddressInfo.addressDetails + ')'
                this.$router.back(-1)
//                返回创建订单页面
              }
            }).catch(e => {
              console.log(e)
              this.$vux.loading.hide()
              return this.toast('用户收货地址修改失败，请重新进行保存')
            })
          }
        } else if (this.selectedDeliverType === 1) {
          if (context.selectedSelfPickerAddress.selfStorageId === undefined) {
            context.toast('请选择自取地点！')
            return
          }
          this.$store.state.orderModule.invoiceInfo.deliverType = context.selectedDeliverType
          this.$store.state.orderModule.invoiceInfo.selfStorageId = context.selectedSelfPickerAddress.selfStorageId
          this.$store.state.orderModule.invoiceInfo.selfStorageName = context.selectedSelfPickerAddress.selfStorageName
          this.$store.state.orderModule.showInvoiceSendText = '自取（' + context.selectedSelfPickerAddress.selfStoragePickupAddress + ')'
          this.$router.back(-1)
//                返回创建订单页面
        }
      },
      _pickerConfirmAction (value) {
        this.userAddressInfo.provinceId = value[0]
        this.userAddressInfo.cityId = value[1]
        this.userAddressInfo.districtId = value[2]
//        this.areaPickerModel = value
        console.log(value)
      },
      checkInformation () {
        if (!this.userAddressInfo.receiverName.length) {
          this.toast('请填写收件人，不可为空！')
          return false
        }
        if (!this.userAddressInfo.mobileNo.length) {
          this.toast('请填写手机号，不可为空！')
          return false
        }
        if (this.userAddressInfo.mobileNo.length !== 11) {
          this.toast('手机号不正确，请核对后提交！')
          return false
        }
        if (!this.userAddressInfo.provinceId.length || !this.userAddressInfo.cityId.length || !this.userAddressInfo.districtId.length) {
          this.toast('请选择收件地区，不可为空！')
          return false
        }
        if (!this.userAddressInfo.addressDetails.length) {
          this.toast('请填写收货详细地址，不可为空！')
          return false
        }
        if (!this.userAddressInfo.postCode.length) {
          this.toast('请填写邮政编号，不可为空！')
          return false
        }
        if (!this.isPostalCodeAvailable(this.userAddressInfo.postCode)) {
          this.toast('邮政编号不正确，请核对后提交')
          return false
        }
        return true
      },
      getSenDdeliverTypeArray () {
        if (this.supportDeliveryTypeArray === undefined || !this.supportDeliveryTypeArray.length) {
          return
        }
        let deliverTypeItemsArray = []
        for (let index = 0; index < this.supportDeliveryTypeArray.length; index++) {
          let item = this.supportDeliveryTypeArray[index]
          switch (item) {
            case 1: {
              deliverTypeItemsArray.push({
                deliverTypeName: '自取',
                deliverTypeValue: 1
              })
              break
            }
            case 2: {
              deliverTypeItemsArray.push({
                deliverTypeName: '邮寄',
                deliverTypeValue: 2
              })
              break
            }
          }
          this.deliverTypeItemsArray = deliverTypeItemsArray
        }
      },
      getSelectedDeliverType () {
        if (this.deliverTypeItemsArray.length) {
          let deliverTypeItem = this.deliverTypeItemsArray[0]
          this.selectedDeliverType = deliverTypeItem.deliverTypeValue
        }
      },
      chooseDeliverTypeAction (item) {
        let deliverItem = item
        this.selectedDeliverType = deliverItem.deliverTypeValue
      },
      selectSelfPickerItemAction (item) {
        let selfPickerAddress = item
        this.selectedSelfPickerAddress = selfPickerAddress
      },
      isPostalCodeAvailable (str) {
        let myreg = /^[0-9]{6}$/
        if (myreg.test(str)) {
          return true
        } else {
          return false
        }
      },
      refundArraySort: function (array) {
        // 冒泡排序
        var len = array.length
        for (var i = 0; i < len; i++) {
          for (var j = 0; j < len - 1 - i; j++) {
            if (parseInt(array[j]) > parseInt(array[j + 1])) {
              var temp = array[j]
              array[j] = array[j + 1]
              array[j + 1] = temp
            }
          }
        }
        return array
      }
    },
    destroyed: function () {
    }
  }
</script>
