<template>


  <div class="screening-bar">
    <!--selected-->
    <div class="screening-items"
         v-show="!hideYear(item)"
         :class="{'selected':currentSkuTab===item.name}"
         v-for="(item,index) in skuData">
      <div class="items-tit" @click="clickSkuTab(item)">{{item.name}}:{{item.modelName}}</div>
      <!--点击筛选出现的弹窗-->
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
    </div>
  </div>


</template>

<style lang="less">

</style>

<script>
  import utils from '@/common/util/Utils'
  import constant from '@/global/constants/AppConstant'
  export default {
    props: {
      categoryType: {
        type: String
      }
    },
    data () {
      return {
        skuData: [],
        currentSkuTab: '',
        skuPropertySearchList: []
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
    mounted () {
      var that = this
      var type = 'get'
      var url = 'mobile/home/mobileTrainning/getSkuPropertyValuesByName'
      var findClassListUrl = ''
      var param = {
        categoryType: that.categoryType
      }
      utils.getAjaxData(type, param, url).then(function (res) {
        console.log(res.data, 1111111111111);
        that.skuData = res.data;
        that.skuPropertySearchList = [];
//        培训班有全部
        if (that.categoryType === 'TRAINING_CLASS_GOODS') {
          that.skuData.forEach(function (item) {
//            console.log(that)
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
          findClassListUrl = constant.apiUrl.classListModule.trainClass
          that.refreshClassList({pageNo: 1, pageSize: 10, skuPropertySearchList: that.skuPropertySearchList},findClassListUrl);
//          that.$emit('findClassList', {pageNo: 1, pageSize: 10, skuPropertySearchList: that.skuPropertySearchList},findClassListUrl)
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
          findClassListUrl = constant.apiUrl.classListModule.self
          that.refreshClassList({pageNo: 1, pageSize: 10, skuPropertySearchList: that.skuPropertySearchList},findClassListUrl);
//          that.$emit('findClassList', {pageNo: 1, pageSize: 10, skuPropertySearchList: that.skuPropertySearchList},findClassListUrl)
        }
      }).catch(function (e) {
        console.log(e)
      })
    },
    methods: {
//      自主选课选中专业课隐藏年度
      selfPickMajorDo: function (that,param) {
        var index = utils.findIndex(that.skuPropertySearchList, 'propertyIdCode', 'trainingYear')
        if (that.isMajorSubject) {
          if (index !== null) {
            param.skuPropertySearchList[index].value = ''
            param.skuPropertySearchList[index].valueCode = ''
          }
        } else {
          if (index !== null && !param.skuPropertySearchList[index].value) {
            var yearSkuIndex = utils.findIndex(that.skuData, 'name', '年度')
            param.skuPropertySearchList[index].value = that.skuData[yearSkuIndex].options[0] ? that.skuData[yearSkuIndex].options[0].skuPropertyValueId : ''
            param.skuPropertySearchList[index].valueCode = that.skuData[yearSkuIndex].options[0] ? that.skuData[yearSkuIndex].options[0].skuPropertyValueName : ''
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
        var that = this;
        var url = ''
        var param = {skuPropertySearchList: this.skuPropertySearchList, pageNo: 1, pageSize: 10}
        this.currentSkuTab = '';
        console.log(this.skuPropertySearchList, 'skuPropertySearchList')
        if (that.categoryType === 'TRAINING_CLASS_GOODS') {
          console.log('TRAINING_CLASS_GOODS')
          url = constant.apiUrl.classListModule.trainClass
          that.refreshClassList(param,url);
//          that.$emit('findClassList',param,url)
        } else {
          url = constant.apiUrl.classListModule.self
//          自主选课选中专业课隐藏年度
          this.selfPickMajorDo(that,param);
          that.refreshClassList(param,url);
//          that.$emit('findClassList',param,url)
        }
      },
      clickSkuItem: function (item, subItem) {
//        console.log(item)
//        console.log(subItem)
//        console.log(this.currentSkuTab)
        item.model = subItem.skuPropertyValueId;
        item.modelName = subItem.skuPropertyValueName;
        var skuPropertyId = item.skuPropertyId;
        var index = utils.findIndex(this.skuPropertySearchList, 'propertyId', skuPropertyId);
        if (index !== null) {
          this.skuPropertySearchList[index].value = subItem.skuPropertyValueId
          this.skuPropertySearchList[index].valueCode = subItem.skuPropertyValueName
        }
//        mobile/home/mobileTrainning/getTrainigStudyList
      }
    }
  }
</script>
