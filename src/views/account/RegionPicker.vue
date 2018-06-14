<template>
  <div>
    <div v-transfer-dom="isTransferDom">
      <popup
        v-model="showValue"
        class="vux-popup-picker"
        @on-hide="onPopupHide"
        @on-show="onPopupShow">
        <div class="vux-popup-picker-container">
          <div class="vux-popup-picker-header" @touchmove.prevent>
            <flexbox>
              <flexbox-item class="vux-popup-picker-header-menu vux-popup-picker-cancel" @click.native="cancel">取消
              </flexbox-item>
              <flexbox-item class="vux-popup-picker-header-menu vux-popup-picker-header-menu-right"
                            @click.native="confirm">确认
              </flexbox-item>
            </flexbox>
          </div>
          <picker
            :data="regionData"
            v-model="tempValue"
            @on-change="onPickerChange"
            :columns="3" ref="picker"
          ></picker>
        </div>
      </popup>
    </div>
  </div>
</template>
<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
  .vux-popup-picker-header {
    height: 44px;
    color: @popup-picker-header-text-color;
    background-color: @popup-picker-header-bg-color;
    font-size: @popup-picker-header-font-size;
    position: relative;
  &:after {
   .setBottomLine(#e5e5e5);
   }
  }
  .vux-popup-picker-header-menu {
    text-align: left;
    padding-left: 15px;
    line-height: 44px;
  }
  .vux-popup-picker-header-menu-right {
    text-align: right;
    padding-right: 15px;
  }
  .vux-popup-picker-cancel {
    color: @popup-picker-header-cancel-text-color;
  }
</style>
<script>
  import {Picker, Popup, Flexbox, FlexboxItem} from 'vux'
  import TransferDom from 'vux/src/directives/transfer-dom'
  import * as storeTypes from '../../store/types'
  export default{
    components: {
      Picker,
      Popup,
      Flexbox,
      FlexboxItem
    },
    directives: {
      TransferDom
    },
    data () {
      return {
        regionData: [],
        isTransferDom: true,
        showValue: false,
        tempValue: [],
        originData: []
      }
    },
    props: {

    },
    created () {
    },
    mounted () {
      let param = {}
      this.$store.dispatch(storeTypes.ACCOUNT_GET_REGIONDATA, param).then((data) => {
        if (data.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
          this.toast(data.head.message)
        } else {
          this.regionData = this.changeRegionData(this.$store.getters.regionData)
        }
      }).catch(e => {
        console.log('>>' + e)
      })
    },
    methods: {
      changeRegionData (regionArray) {
        let array = []
        for (let itemIndex in regionArray) {
          let item = regionArray[itemIndex]
          let object = {
            name: item.provinceName,
            value: item.provinceCode,
            provinceName: item.provinceName,
            parent: 0
          }
          array.push(object)
          for (let cityItemIndex in item.cities) {
            let cityItem = item.cities[cityItemIndex]
            let cityObject = {
              name: cityItem.cityName,
              value: cityItem.cityCode,
              cityName: cityItem.cityName,
              parent: item.provinceCode
            }
            array.push(cityObject)
            for (let districtItemIndex in cityItem.districts) {
              let districtItem = cityItem.districts[districtItemIndex]
              let districtObject = {
                name: districtItem.districtName,
                value: districtItem.districtCode,
                districtName: districtItem.districtName,
                parent: cityItem.cityCode
              }
              array.push(districtObject)
            }
          }
        }
        return array
      },
      show () {
        this.showValue = true
      },
      cancel () {
        this.showValue = false
        this.$emit('on-cancel')
      },
      confirm () {
        this.showValue = false
        console.log(this.tempValue)
        this.$emit('on-confirm', this.tempValue, this.$refs.picker.getNameValues(), this.regionData)
      },
      onPopupHide () {
        this.$emit('on-hidePicker')
      },
      onPopupShow () {

      },
      getNameValues () {

      },
      onPickerChange (value) {

      }
    },
    watch: {
      show (val) {
        this.showValue = val
      }
    }

  }
</script>
