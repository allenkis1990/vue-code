<template>


  <div class="screening-bar screening-bar-2">
    <div class="screening-info" v-if="skuData.length > 0">
      <div class="info"><span class="b"> 科目：</span>{{skuData[0].modelName}}</div>
      <div class="info" v-if="!yearHided"><span class="b"> 年度：</span>{{skuData[1].modelName}}</div>
    </div>
    <a class="filter-btn" @click="toggleStatus">
      <img class="filter" src="../../../../design/images/filter.png" />
      <span>筛选</span>
    </a>
    <div class="select-items-mask" v-show="status">
      <div class="cont-box">
        <div  class="select-items-cont">
          <div class="select-items-hd">
            <div class="filter-circle"></div>
            <span class="fs30">培训机构</span>
          </div>
          <div class="select-items-bd select-items-bd-1">
            <div :class="['select-item', currentOrgan.unitId === organ.unitId ? 'current' : '']" v-for="organ in trainingOrgans" :key="organ.unitId" @click="organChange(organ)">{{organ.unitName}}</div>
          </div>
        </div>
        <div  :class="['select-items-cont', index === 0 ? 'select-items-cont-1' : 'select-items-cont-2']" v-for="(item, index) in yearHided ? yearHidedData: skuData" :key="index">
          <div class="select-items-hd">
            <div class="filter-circle"></div>
            <span class="fs30">{{item.name}}</span>
          </div>
          <div class="select-items-bd">
            <div @click="clickSkuItem(item,subItem)"
               :class="['select-item', item.model === subItem.skuPropertyValueId ? 'current': '']" v-for="(subItem) in item.options" :key="subItem.skuPropertyValueId">{{subItem.skuPropertyValueName}}</div>
          </div>
        </div>
      </div>
      <div class="btn-primary" @click="confirm">确定</div>
    </div>
    <!--selected-->
    <!-- <div class="screening-items"
         v-show="!hideYear(item)"
         :class="{'selected':currentSkuTab===item.name}"
         v-for="(item,index) in skuData">
      <div class="items-tit" @click="clickSkuTab(item)">{{item.name}}:{{item.modelName}}</div>
      <div class="select-items-box" v-if="currentSkuTab===item.name">
        <div class="mask"></div>
        <div class="box-bd">
          <div class="select-item"
               @click="clickSkuItem(item,subItem)"
               :class="{'current':item.model===subItem.skuPropertyValueId}"
               v-for="(subItem,subIndex) in item.options">{{subItem.skuPropertyValueName}}</div>
        </div>
        <div class="btn-primary" @click="confirm">确定</div>
      </div>
    </div> -->
  </div>


</template>

<style lang="less">
  .cont-box::-webkit-scrollbar {display:none}
</style>

<script>
  import utils from '@/common/util/Utils'
  import constant from '@/global/constants/AppConstant'
  import * as storeTypes from '../../../store/types'
  export default {
    props: {
      categoryType: {
        type: String
      },
      currentOrgan: {
        type: Object
      }
    },
    data () {
      return {
        yearHided: false,
        yearHidedData: [],
        first: true,
        status: false,
        skuData: [],
        currentSkuTab: '',
        // currentOrgan: {},
        skuPropertySearchList: [],
        trainingOrgans: this.$store.state.accountModule.trainingOrgans
      }
    },
    computed: {
      isMajorSubject: function () {
        var isMajorSubject = this.skuPropertySearchList.some(function (eachItem, index, arr) {
          return eachItem.valueCode === '专业课'
        })
        return isMajorSubject
      }
    },
    beforeMount () {
      this.getAllOrgan()
      this.getSkuValue()
    },
    methods: {
      toggleStatus () {
        this.status = !this.status
      },
      getAllOrgan () {
        if (!this.trainingOrgans || this.trainingOrgans.length === 0) {
          this.$store.dispatch(storeTypes.GET_ALL_ORGAN).then((data) => {
            if (data.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
              this.toast(data.head.message)
              return
            } else {
              this.trainingOrgans = data.data
            }
          })
        }
      },
      organChange (organ) {
        if (this.currentOrgan.unitId === organ.unitId) {
          return
        }
        this.$emit('on-currentOrganChange', organ)
        this.setHeaderDomain(organ.domain)
        this.getSkuValue()
      },
      getSkuValue () {
        this.showLoading()
        var that = this
        var type = 'get'
        var url = 'mobile/home/mobileTrainning/getSkuPropertyValuesByName'
        var findClassListUrl = ''
        var param = {
          categoryType: that.categoryType
        }
        utils.getAjaxData(type, param, url).then(function (res) {
          that.hideLoading()
          that.skuData = res.data;
          that.skuPropertySearchList = [];
  //        培训班有全部
          if (that.categoryType === 'TRAINING_CLASS_GOODS') {
            that.skuData.forEach(function (item) {
  //            动态加进来的要$set
  //            培训班初始化选中的是全部
              that.$set(item,'model','');
              that.$set(item,'modelName','全部');
              item.options.unshift({skuPropertyValueName: '全部', skuPropertyValueId: ''})
              that.skuPropertySearchList.push({
                propertyId: item.skuPropertyId,
                propertyIdCode: item.code,
                value: '',
                valueCode: ''
              });
            })
            if (that.first) {
              findClassListUrl = constant.apiUrl.classListModule.trainClass
              that.refreshClassList({pageNo: 1, pageSize: 10, skuPropertySearchList: that.skuPropertySearchList},findClassListUrl);
              that.first = false
            }
          } else {
  //          自主选课初始化选中的是数组第一个
            that.skuData.forEach(function (item) {
  //            动态加进来的要$set
              that.$set(item,'model',item.options[0] ? item.options[0].skuPropertyValueId : '');
              that.$set(item,'modelName',item.options[0] ? item.options[0].skuPropertyValueName : '');
              that.skuPropertySearchList.push({
                propertyId: item.skuPropertyId,
                propertyIdCode: item.code,
                value: item.options[0] ? item.options[0].skuPropertyValueId : '',
                valueCode: item.options[0] ? item.options[0].skuPropertyValueName : ''
              });
            })
            if (that.first) {
              findClassListUrl = constant.apiUrl.classListModule.self
              that.refreshClassList({pageNo: 1, pageSize: 10, skuPropertySearchList: that.skuPropertySearchList},findClassListUrl)
              that.first = false
            }
          }
        }).catch(function (e) {
          console.log(e)
        })
      },
//      自主选课选中专业课隐藏年度
      selfPickMajorDo: function (that,param) {
        var index = utils.findIndex(that.skuPropertySearchList, 'propertyIdCode', 'trainingYear')
        if (that.isMajorSubject) {
          if (index !== null) {
            param.skuPropertySearchList[index].value = ''
            param.skuPropertySearchList[index].valueCode = ''
          }
          if (!that.yearHided) {
            that.yearHided = true
            that.yearHidedData = [that.skuData[0]]
          }
        } else {
          if (index !== null && !param.skuPropertySearchList[index].value) {
            var yearSkuIndex = utils.findIndex(that.skuData, 'name', '年度')
            param.skuPropertySearchList[index].value = that.skuData[yearSkuIndex].options[0] ? that.skuData[yearSkuIndex].options[0].skuPropertyValueId : ''
            param.skuPropertySearchList[index].valueCode = that.skuData[yearSkuIndex].options[0] ? that.skuData[yearSkuIndex].options[0].skuPropertyValueName : ''
          }
          if (that.yearHided) {
            that.yearHided = false
          }
        }
      },
      hideYear: function (item) {
        var that = this
        var hideYear = false
        if (this.isMajorSubject && that.categoryType === 'COURSE_SUPERMARKET_GOODS' && item.name === '年度') {
          hideYear = true
        }
        return hideYear
      },
      refreshClassList: function (params,url) {
        this.$emit('findClassList', params,url)
      },
      clickSkuTab: function (item) {
        this.currentSkuTab = item.name;
      },
      confirm: function () {
        this.toggleStatus()
        var url = ''
        var param = {skuPropertySearchList: this.skuPropertySearchList, pageNo: 1, pageSize: 10}
        this.currentSkuTab = '';
        if (this.categoryType === 'TRAINING_CLASS_GOODS') {
          url = constant.apiUrl.classListModule.trainClass
          this.refreshClassList(param,url);
          this.$emit('findClassList',param,url)
        } else {
          url = constant.apiUrl.classListModule.self
//          自主选课选中专业课隐藏年度
          this.selfPickMajorDo(this,param);
          this.refreshClassList(param,url);
          this.$emit('findClassList',param,url)
        }
      },
      clickSkuItem: function (item, subItem) {
        item.model = subItem.skuPropertyValueId;
        item.modelName = subItem.skuPropertyValueName;
        var skuPropertyId = item.skuPropertyId;
        var index = utils.findIndex(this.skuPropertySearchList, 'propertyId', skuPropertyId);
        if (index !== null) {
          this.skuPropertySearchList[index].value = subItem.skuPropertyValueId
          this.skuPropertySearchList[index].valueCode = subItem.skuPropertyValueName
        }
        if (this.categoryType !== 'TRAINING_CLASS_GOODS') {
          let param = {skuPropertySearchList: this.skuPropertySearchList, pageNo: 1, pageSize: 10}
          this.selfPickMajorDo(this, param);
        }
      }
    }
  }
</script>
