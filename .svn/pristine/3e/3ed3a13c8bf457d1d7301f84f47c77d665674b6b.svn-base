<template>
  <div class='container'>
    <!--标题栏-->
    <div class='hb-header-box'>
      <div class='header-left'>
        <a href='javascript:void(0);' class='header-txt' @click='cancelAction'>取消</a>
      </div>
      <div class='header-tit'>个人信息</div>
      <div class='header-right'>
        <a href='javascript:void(0);' class='header-txt' @click='saveAction'>保存</a>
      </div>
    </div>
    <!--标题栏-->
    <div class='hb-wrap-box'>
      <div class='hb-warm-tips hb-warm-tips-1'>
        <i class='weui-icon-warn'></i>
        <span class='tips-txt'>请正确填写您的收件地址，以便下一次报名培训班级时作为发票/证书的邮寄地址，感谢您的配合！</span>
      </div>
      <div class='weui-panel hb-panel mt0'>
        <div class='weui-cells weui-cells_form'>
          <div class='weui-cell'>
            <div class='weui-cell__hd'><label class='weui-label weui-label-1'>收件人</label></div>
            <div class='weui-cell__bd'><input type='text' placeholder='请输入收件人' class='weui-input' v-model='receiptInfo.receiverName'></div>
          </div>
          <div class='weui-cell'>
            <div class='weui-cell__hd'><label class='weui-label weui-label-1'>手机号</label></div>
            <div class='weui-cell__bd'><input type='text' placeholder='请输入手机号' class='weui-input' v-model='receiptInfo.mobileNo'></div>
          </div>
          <div class='weui-cell weui-cell_select weui-cell_select-after height-40'>
            <div class='weui-cell__hd'><label class='weui-label weui-label-1'>收件地区</label></div>
            <div class='weui-cell__bd no-arrow'>
              <popup-picker class="gray-color poppicker-no-padding" placeholder="请选择所在地区" value-text-align='left' style='flex:1' :data='areaArray' :columns='3' v-model='areaValue' show-name></popup-picker>
            </div>
            <!--<div class='weui-cell__bd'>-->
            <!--<select name='select2' class='weui-select'>-->
            <!--<option value='1'>中国</option>-->
            <!--<option value='2'>美国</option>-->
            <!--<option value='3'>英国</option>-->
            <!--</select></div>-->
          </div>
          <div class='weui-cell weui-cell-start'>
            <div class='weui-cell__hd'><label class='weui-label weui-label-1'>详细地址</label></div>
            <div class='weui-cell__bd'><textarea placeholder='请输入收件详细地址' rows='3' class='weui-textarea' v-model='receiptInfo.addressDetails'></textarea></div>
          </div>
          <div class='weui-cell'>
            <div class='weui-cell__hd'><label class='weui-label weui-label-1' v-model='receiptInfo.postalCode'>邮政编码</label></div>
            <div class='weui-cell__bd'><input type='text' placeholder='请输入邮政编码' class='weui-input' v-model='receiptInfo.postCode'></div>
          </div>
        </div>
      </div>
    </div>
    <!--<div class='picker-box' v-if='isChooseRegion'>-->
    <!--<picker :data='regionData' :columns=3 v-model='currenRegionValue' @on-change='change' ref='picker1'></picker>-->
    <!--</div>-->
    <!--<toast v-model='showPositionValue' type='text' :time='800' is-show-mask text='Hello World' :position='middle'>{{message}}</toast>-->
  </div>
</template>
<style lang='less'>
@import '~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less';

.picker-box {
  width: 100%;
  height: 150px;
  position: absolute;
  bottom: 0px;
}

.height-40 {
  line-height: 40px;
}
.poppicker-no-padding {
  .weui-cell {
    padding-left: 0px!important
  }
}
</style>
<script>
require('../../../design/styles/webstyle.less');
import { Group, Cell, Toast, Picker, PopupPicker } from 'vux';
import * as storeTypes from '../../store/types';
import RegionPicker from './RegionPicker.vue';
export default {
  components: { Group, Cell, Toast, Picker, RegionPicker, PopupPicker },
  data() {
    return {
      receiptInfo: {
        id: '',
        receiverName: '',
        mobileNo: '',
        provinceId: '',
        cityId: '',
        districtId: '',
        addressDetails: '',
        postCode: ''
      },
      massage: '',
      areaValue: [],
      areaArray: []
    };
  },
  mounted() {
    let storeUserReceiptInfo = this.$store.getters.userReceiptInfo;
    for (let key in storeUserReceiptInfo) {
      this.receiptInfo[key] = storeUserReceiptInfo[key];
    }
    if (storeUserReceiptInfo.provinceId) {
      this.areaValue = [storeUserReceiptInfo.provinceId, storeUserReceiptInfo.cityId, storeUserReceiptInfo.districtId];
    }
    this.requestAreaInfo();
  },
  computed: {},
  methods: {
    requestAreaInfo: function() {
      this.$store.dispatch(storeTypes.GLOBAL_GET_AREA_INFO).then(data => {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          var areaInfo = data.data.provinces;
          this.changeAreaInfoToAreaArray(areaInfo);
        } else {
          console.log(JSON.stringify(data));
        }
      });
    },
    // 页面抽离函数
    changeAreaInfoToAreaArray: function(areaInfo) {
      for (var i = 0; i < areaInfo.length; i++) {
        var province = areaInfo[i];
        var tempProvince = {
          name: province.provinceName,
          value: province.provinceCode,
          parent: 0
        };
        this.areaArray.push(tempProvince);
        for (var j = 0; j < province.cities.length; j++) {
          var city = province.cities[j];
          var tempCity = {
            name: city.cityName,
            value: city.cityCode,
            parent: province.provinceCode
          };
          this.areaArray.push(tempCity);
          for (var k = 0; k < city.districts.length; k++) {
            var district = city.districts[k];
            var tempDistrict = {
              name: district.districtName,
              value: district.districtCode,
              parent: city.cityCode
            };
            this.areaArray.push(tempDistrict);
          }
        }
      }
    },
    getReceiptProvinceText() {
      if (
        this.receiptInfo.provinceName !== undefined &&
        this.receiptInfo.cityName !== undefined &&
        this.receiptInfo.provinceName.trim() !== '' &&
        this.receiptInfo.cityName.trim() !== ''
      ) {
        return (
          this.receiptInfo.provinceName +
          '\t' +
          this.receiptInfo.cityName +
          '\t' +
          this.receiptInfo.districtName
        );
      } else {
        return '请选择地区';
      }
    },
    /**
     * 检查手机号
     */
    isPoneAvailable(str) {
      if (!str.length || str.length !== 11) {
        return false
      }
      return true
    },
    /**
     * 检查邮政编号
     */
    isPostalCodeAvailable(str) {
      let myreg = /^[0-9]{6}$/;
      if (myreg.test(str)) {
        return true;
      } else {
        return false;
      }
    },
    checkInformation() {
      if (!this.receiptInfo.receiverName) {
        this.toast('收件人未填写，请核对后提交')
        return false;
      }
      if (!this.isPoneAvailable(this.receiptInfo.mobileNo)) {
        this.toast('手机号不正确，请核对后提交')
        return false;
      }
      if (!this.areaValue[0]) {
        this.toast('收货地址未填写，请核对后提交')
        return false;
      }
      if (!this.receiptInfo.addressDetails.length) {
        this.toast('收货详细地址未填写，请核对后提交')
        return false;
      }
      if (!this.isPostalCodeAvailable(this.receiptInfo.postCode)) {
        this.toast('邮政编号不正确，请核对后提交')
        return false;
      }
      return true;
    },
    hasFilledInformation() {
      if (
        this.receiptInfo.receiverName.length &&
        this.receiptInfo.mobileNo.length &&
        this.getReceiptProvinceText &&
        this.receiptInfo.addressDetails.length &&
        this.receiptInfo.postCode.length
      ) {
        return true;
      } else {
        return false;
      }
    },
    haveChangedInfomation() {
      let oldInfo = this.$store.getters.userReceiptInfo;
      if (oldInfo.receiverName === undefined) {
        if (
          this.receiptInfo.receiverName.length ||
          this.receiptInfo.mobileNo.length ||
          this.getReceiptProvinceText ||
          this.receiptInfo.addressDetails.length ||
          this.receiptInfo.postCode.length
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (
          this.receiptInfo.receiverName !== oldInfo.receiverName ||
          this.receiptInfo.mobileNo !== oldInfo.mobileNo ||
          this.receiptInfo.provinceId !== oldInfo.provinceId ||
          this.receiptInfo.cityId !== oldInfo.cityId ||
          this.receiptInfo.districtId !== oldInfo.districtId ||
          this.receiptInfo.addressDetails !== oldInfo.addressDetails ||
          this.receiptInfo.postCode !== oldInfo.postCode
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    addAddressCode() {
      if (this.areaValue[0]) {
        this.receiptInfo.provinceId = this.areaValue[0];
        this.receiptInfo.cityId = this.areaValue[1];
        this.receiptInfo.districtId = this.areaValue[2];
      }
    },
    saveAction() {
      let self = this;
      if (this.checkInformation()) {
        this.addAddressCode();
        this.$store
          .dispatch(storeTypes.ACCOUNT_UPDATE_RECEIPTINFO, this.receiptInfo)
          .then(data => {
            if (data.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
              this.toast(data.head.message);
            } else {
              this.toast('修改成功!');
              setTimeout(function() {
                self.back();
              }, 1000);
            }
          })
          .catch(e => {
            console.log('>>' + e);
          });
      }
    },
    cancelAction() {
      if (this.haveChangedInfomation()) {
        this.showConfirm();
      } else {
        this.back();
      }
    },
    /**
     * 显示取消提示
     */
    showConfirm() {
      let self = this;
      this.$vux.confirm.show({
        title: '提示',
        content: '确认要放弃此次编辑？',
        onShow() {
          console.log('plugin show');
        },
        onHide() {
          console.log('plugin hide');
        },
        onCancel() {
          console.log('plugin cancel');
        },
        onConfirm() {
          console.log('plugin confirm');
          self.back();
        }
      });
    },
    getSaveButtonStyle() {
      if (this.hasFilledInformation()) {
        return { color: '#fff' };
      } else {
        return { color: '#666' };
      }
    }
  }
};
</script>
