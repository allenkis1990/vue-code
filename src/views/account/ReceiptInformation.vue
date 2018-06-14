<template>
  <div class="container">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-left" @click="back()">
        <a href="javascript:void(0);" class="hb-ico ico-return"></a>
      </div>
      <div class="header-tit">收货地址</div>
      <div class="header-right">
      </div>
    </div>
    <!--标题栏-->
    <div class="hb-box-bd">
      <div class="hb-warm-tips hb-warm-tips-1">
        <img class="ico-tips" src="../../../design//images/icon-tips.png" />
        <span class="tips-txt">请正确填写您的收件地址，以便下一次报名培训班级时作为发票/证书的邮寄地址，感谢您的配合！</span>
      </div>
      <div class="weui-panel hb-panel" v-if="mode === 'show'">
        <div class="weui-cells">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="tit-2">收件人</span></div>
            <div class="weui-cell__bd">{{recipient.receiverName}}</div>
          </div>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="tit-2">手机号</span></div>
            <div class="weui-cell__bd">{{recipient.mobileNo}}</div>
          </div>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="tit-2">收件地区</span></div>
            <div class="weui-cell__bd">{{recipient.provinceName + '-' + recipient.cityName + '-' + recipient.districtName}}</div>
          </div>
          <div class="weui-cell weui-cell_access weui-cell-start">
            <div class="weui-cell__hd"><span class="tit-2">详细地址</span></div>
            <div class="weui-cell__bd">{{recipient.addressDetails}}</div>
          </div>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="tit-2">邮政编码</span></div>
            <div class="weui-cell__bd">{{recipient.postCode}}</div>
          </div>
        </div>
      </div>

      <!--编辑-->
      <div class="weui-panel hb-panel" v-if="mode === 'edit'">
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd"><div class="tit-2">姓名</div></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入姓名" v-model="recipient.receiverName"/>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd"><div class="tit-2">手机号</div></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入手机号" v-model="recipient.mobileNo"/>
            </div>
          </div>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><div class="tit-2">收件地区</div></div>
            <div class="weui-cell__bd">
              <popup-picker class="gray-color poppicker-no-padding" placeholder="请选择所在地区" value-text-align='left' style='flex:1' :data='areaArray' :columns='3' v-model='areaValue' show-name></popup-picker>
            </div>
          </div>
          <div class="weui-cell weui-cell-start">
            <div class="weui-cell__hd"><div class="tit-2">详细地址</div></div>
            <div class="weui-cell__bd">
              <textarea class="weui-textarea textarea-ios" placeholder="请输入详细地址" v-model="recipient.addressDetails"></textarea>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd"><div class="tit-2">邮政编码</div></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入邮政编码" v-model="recipient.postCode"/>
            </div>
          </div>
        </div>
      </div>
      <!--/编辑-->
    </div>
    <div class="hb-tabbar">
      <div class="btn-primary" style="width:100%;position:absolute;left:0;bottom:0" @click="toggleMode" v-show="mode === 'show'">编辑收货地址</div>
      <div :class="buttonStyle" style="width:100%;position:absolute;left:0;bottom:0" @click="submit" v-show="mode === 'edit'">保存</div>
    </div>
  </div>
</template>
<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../../../design/styles/webstyle.less')
  import { PopupPicker } from 'vux';
  import * as storeTypes from '../../store/types';
  export default{
    components: {PopupPicker},
    data () {
      return {
        mode: 'show',
        recipient: this.$store.getters.userReceiptInfo || {},
        areaArray: [],
        areaValue: []
      }
    },
    computed: {
      buttonStyle () {
        if (!this.recipient.receiverName || !this.recipient.mobileNo || !this.recipient.addressDetails || !this.recipient.postCode || !this.areaValue[0]) {
          return ['btn-disabled']
        } else {
          return ['btn-primary']
        }
      }
    },
    created () {
      this.requestAreaInfo()
    },
    mounted () {
      if (this.isEmpty(this.recipient)) {
        this.mode = 'edit'
      }
    },
    methods: {
      toggleMode () {
        if (this.mode === 'edit') {
          this.mode = 'show'
        } else {
          this.mode = 'edit'
          this.recipient = this.$store.getters.userReceiptInfo
          if (this.recipient.provinceId) {
            this.areaValue = [this.recipient.provinceId, this.recipient.cityId, this.recipient.districtId];
          }
        }
      },
      isEmpty (obj) {
        let flag = true
        for (let key in obj) {
          if (obj[key]) {
            flag = false
          }
        }
        return flag
      },
      requestAreaInfo: function() {
        this.$store.dispatch(storeTypes.GLOBAL_GET_AREA_INFO).then(data => {
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            let areaInfo = data.data.provinces;
            this.changeAreaInfoToAreaArray(areaInfo);
          } else {
            console.log(JSON.stringify(data));
          }
        });
      },
      changeAreaInfoToAreaArray: function(areaInfo) {
        for (let i = 0; i < areaInfo.length; i++) {
          let province = areaInfo[i];
          let tempProvince = {
            name: province.provinceName,
            value: province.provinceCode,
            parent: 0
          };
          this.areaArray.push(tempProvince);
          for (let j = 0; j < province.cities.length; j++) {
            let city = province.cities[j];
            let tempCity = {
              name: city.cityName,
              value: city.cityCode,
              parent: province.provinceCode
            };
            this.areaArray.push(tempCity);
            for (let k = 0; k < city.districts.length; k++) {
              let district = city.districts[k];
              let tempDistrict = {
                name: district.districtName,
                value: district.districtCode,
                parent: city.cityCode
              };
              this.areaArray.push(tempDistrict);
            }
          }
        }
      },
      isPoneAvailable(str) {
        if (!str.length || str.length !== 11) {
          return false
        }
        return true
      },
      isPostalCodeAvailable(str) {
        let myreg = /^[0-9]{6}$/;
        if (myreg.test(str)) {
          return true;
        } else {
          return false;
        }
      },
      checkAndToast () {
        if (!this.recipient.receiverName) {
          this.toast('姓名未填写，请核对后提交')
          return false;
        }
        if (!this.isPoneAvailable(this.recipient.mobileNo)) {
          this.toast('手机号不正确，请核对后提交')
          return false;
        }
        if (!this.areaValue[0]) {
          this.toast('收件地区未填写，请核对后提交')
          return false;
        }
        if (!this.recipient.addressDetails.length) {
          this.toast('详细地址未填写，请核对后提交')
          return false;
        }
        if (!this.isPostalCodeAvailable(this.recipient.postCode)) {
          this.toast('邮政编码不正确，请核对后提交')
          return false;
        }
        return true;
      },
      addAddressCode() {
        if (this.areaValue[0]) {
          this.recipient.provinceId = this.areaValue[0];
          this.recipient.cityId = this.areaValue[1];
          this.recipient.districtId = this.areaValue[2];
        }
      },
      submit () {
        if (this.checkAndToast()) {
          this.addAddressCode();
          this.$store
          .dispatch(storeTypes.ACCOUNT_UPDATE_RECEIPTINFO, this.recipient)
          .then(data => {
            if (data.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
              this.toast(data.head.message);
            } else {
              this.toast('修改成功!');
              this.recipient = data.data
              this.toggleMode()
            }
          })
          .catch(e => {
            console.log('>>' + e);
          });
        }
      }
    }
  }
</script>
