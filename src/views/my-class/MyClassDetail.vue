<template>
  <div class="container weui-tab">
    <div class="weui-tab__panel bg-w">
      <!--班级图片-->
      <div class="hb-class-detail-img">
        <img :src='iamgeUrl()' alt=" ">
        <div class="label">{{yearObject.skuPropertyValueName}}<span class="year">年</span></div>
      </div>
      <!--/班级图片-->
      <!--tab-->
      <tab class="vux-tab hb-tab">
        <tab-item class="vux-tab-item" bar-active-color="#0c7cdb" :line-width="2" selected
                  @click.native="tabSwitchEvent(0)">
          培训信息
        </tab-item>
        <tab-item class="vux-tab-item" @click.native="tabSwitchEvent(1)">
          课程目录
        </tab-item>
      </tab>
      <!--培训信息-->
      <div class="hb-tab-bd" v-if="tabCurrentIndex===0">
        <div class="info-tit">考核要求</div>
        <div class="info-bd"><span>课程学习进度={{classAssessInfo.assessTrainingComplete}}% ，</span>
          <span
            v-if="classAssessInfo.assessPassScore!=-1">考试成绩>={{classAssessInfo.assessPassScore === null ? 0 : classAssessInfo.assessPassScore}}分</span>
        </div>
        <!-- <div class="info-tit">选课要求</div>
        <div class="info-bd">
          本年度继续教育学习中 选课学时数须 >={{classAssessInfo.trainHours}} 学时
        </div> -->
        <div class="info-tit">班级培训信息</div>
        <div class="info-bd">
          <p>年度：{{skuPropertyValue('继续教育年度')}}年</p>
          <p>类别：{{skuPropertyValue('科目')}}</p>
          <p>学时：{{classAssessInfo.trainingYearCredit}}</p>
          <p>培训起止时间：  {{classInfo.trainingStartTime}}  至  {{classInfo.trainingEndTime}}</p>
        </div>
      </div>
      <!--课程目录-->
      <div class="hb-tab-bd" v-if="tabCurrentIndex===1">
        <div class="class-directory-box">
          <div class="line"></div>
          <ul class="class-directory"  v-for="item in courseList">
          <ul class="sub-items">
              <li>
                <span class="dot"></span>
                <span class="label">{{item.period}}学时</span>
                {{item.courseName}}
              </li>
            </ul>
          </ul>
          <!-- <ul class="class-directory" @click="showRequireCourseListState()">
            <div class="items-tit">
              <span class="dot"></span>
              <span class="label">必修包</span>
            </div>
            <ul class="sub-items" v-if="requireCourseState">
              <li v-for="item in $store.getters.requiredCourseList">
                <span class="dot"></span>
                <span class="label">{{item.period}}学时</span>
                {{item.courseName}}
              </li>
            </ul>
          </ul> -->
         <!--  <ul class="class-directory" v-if="reRender">
            <li v-for="(item,index) in optionCourseList">
              <div class="items-tit" @click="showOptionClassDetailAction(item)">
                <span class="dot"></span>
                <span class="label">选修包</span>
                {{item.electiveWrapName}}
              </div>
              <ul class="sub-items">
                <li v-for="subItem in item.courseList" v-if="item.isShowDetail">
                  <span class="dot"></span>
                  <span class="label">{{subItem.period}}学时</span>
                  {{subItem.courseName}}
                </li>
              </ul>
            </li>
          </ul>
 -->        </div>
      </div>
    </div>

    <div class="weui-tabbar hb-tabbar" @click="goAppStudyEvent">
      <a href="javascript:;" class="hb-btn">请前往小程序学习，支持计时学习、练习、考试</a>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
  @import "../../../design/styles/webstyle.less";
</style>
<script>
  import { Tab, TabItem } from 'vux'
  import * as storeTypes from '../../store/types'

  export default {
    components: {
      TabItem,
      Tab
    },
    component: {Tab, TabItem},
    data () {
      return {
        yearObject: {
          skuPropertyId: '',
          skuPropertyName: '',
          skuPropertyValueId: '',
          skuPropertyValueName: ''
        },
        tabCurrentIndex: 0,
        // yhx
        courseList: [],
        optionCourseList: [],
        reRender: true,
        trainingClassId: '',
        hasRequireCourse: false,
        requireCourseState: true
      }
    },
    computed: {
      classInfo () {
        return this.$store.state.classModule.classDetail
      },
      classAssessInfo () {
        let classDetail = this.$store.state.classModule.classDetail
        if (classDetail.assessInformation === null || classDetail.assessInformation === undefined) {
          return ''
        }
        return classDetail.assessInformation
      },
//      classWrapAssessment () {
//        let classWrapAssessment = this.$store.state.classModule.classWrapAssessment
//        if (classWrapAssessment === null || classWrapAssessment === undefined) {
//          return ''
//        }
//        return classWrapAssessment
//      },
      selectedCourseWrapList () {
        let courseWrapList = this.$store.state.classModule.selectedCourseWrapList
        if (courseWrapList.length === undefined || courseWrapList.length === null) {
          return []
        }
        return courseWrapList
      },
      imageUrl () {
        console.log(this.$store.state.classModule.classDetail);
        if (this.$store.state.classModule.classDetail.photoPath === undefined) {
          return require('../../../design/images/course-img.jpg')
        }
        return this.$store.state.classModule.classDetail.photoPath
      }
    },
    created () {
      this.yearObject = this.$route.query.yearObject
      this.trainingClassId = this.$route.query.trainingClassId
      this.initRequestData()
    },
    methods: {
      // =====================================网络请求======================================
      /**
       * 网络请求 初始化
       */
      initRequestData () {
        this.requestClassInfo()
//        this.requestAssessmentInfo()
        // this.requestSeletedCourseWrapList()
        this.requestCourseList()
      },
      /**
       * 获取班级详情
       */
      requestClassInfo () {
        let params = {
          trainingClassId: this.trainingClassId
        }
        this.showLoading('加载中')
        this.$store.dispatch(storeTypes.CLASS_INFO_REQUEST, params).then(data => {
          this.hideLoading()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            return
          }
          console.log(data)
        }).catch(e => {
          this.hideLoading()
          console.log('error>>>>>' + e)
        })
      },
      /**
       * 获取班级考核要求信息
       */
      requestAssessmentInfo () {
        let params = {
          trainingClassId: this.trainingClassId
        }
        this.showLoading('加载中')
        this.$store.dispatch(storeTypes.CLASS_ASSESSMENT_INFO_REQUEST, params).then(data => {
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            return
          }
          console.log(data)
        }).catch(e => {
          console.log('error>>>>>' + e)
        })
      },
      /**
       * 获取课程列表
       */
      requestCourseList () {
        let params = {
          trainingClassId: this.trainingClassId
        }
        this.showLoading('加载中')
        this.$store.dispatch(storeTypes.CLASS_COURSE_LIST_REQUEST, params).then(data => {
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.courseList = data.data.courseList
            return
          }
          console.log(data)
        }).catch(e => {
          console.log('error>>>>>' + e)
        })
      },
      /**
       * 获取选修课课程包列表
       */
      requestSeletedCourseWrapList () {
        let params = {
          trainingClassId: this.trainingClassId
        }
        this.showLoading('加载中')
        this.$store.dispatch(storeTypes.CLASS_SELECTED_COURSEWRAP_LIST_REQUEST, params).then(data => {
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.optionCourseList = data.data.electiveWrapList
            return
          }
          console.log(data)
        }).catch(e => {
          console.log('error>>>>>' + e)
        })
      },
      /**
       * 获取选修课课程列表
       * @param item
       */
      requestOptionCouseList (item) {
        let params = {
          trainingClassId: this.trainingClassId,
          electiveWrapId: item.electiveWrapId,
          pageNo: 1,
          pageSize: 100
        }
        this.showLoading('加载中')
        this.$store.dispatch(storeTypes.CLASS_SELECTED_COURSE_LIST_REQUEST, params).then(data => {
          this.hideLoading()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            item.courseList = data.data.courseList
            this.reRender = false
            this.reRender = true
            item.isShowDetail = true
          }
          console.log(data)
        }).catch(e => {
          this.hideLoading()
          console.log('error>>>>>' + e)
        })
      },
      // =====================================点击事件======================================
      tabSwitchEvent (index) {
        this.tabCurrentIndex = index
      },
      goAppStudyEvent () {
        this.toast('请前往小程序学习')
      },
      // =====================================其他======================================
      iamgeUrl () {
        console.log(this.$store.state.classModule.classDetail)
        if (this.$store.state.classModule.classDetail.trainingClassImg === undefined) {
          return require('../../../design/images/course-img.jpg')
        }
        return this.$store.state.classModule.classDetail.trainingClassImg
      },
      skuPropertyValue (property) {
        let skuPropertyObeject = this.skuPropertyObeject(property)
        if (skuPropertyObeject !== undefined && skuPropertyObeject !== null) {
          return skuPropertyObeject.skuPropertyValueName
        }
        return ''
      },
      skuPropertyValueCopy (property) {
        let skuPropertyObeject = this.skuPropertyObeject(property)
        if (skuPropertyObeject !== undefined && skuPropertyObeject !== null && skuPropertyObeject.skuPropertyValueName !== undefined && skuPropertyObeject.skuPropertyValueName !== '') {
          return ' / ' + skuPropertyObeject.skuPropertyValueName
        }
        return ''
      },
      skuPropertyObeject (property) {
        let skuPropertyNameList = this.$store.state.classModule.classDetail.skuPropertyNameList
        if (skuPropertyNameList === undefined || skuPropertyNameList === null) {
          return ''
        }
        for (let i = 0; i < skuPropertyNameList.length; i++) {
          if (skuPropertyNameList[i].skuPropertyName === property) {
            return skuPropertyNameList[i]
          }
        }
        return ''
      },
      showRequiredCourseList () {
        this.hasRequireCourse = !this.hasRequireCourse
      },
      showOptionClassDetailAction (item) {
        this.reRender = false
        this.reRender = true
        if (item.courseList === undefined) {
          item.isShowDetail = false
          // 发起网络请求获取课程的信息，取得后将信息填充至item的courseList
          this.requestOptionCouseList(item)
        } else {
          item.isShowDetail = !item.isShowDetail
        }
      },
      showRequireCourseListState () {
        this.requireCourseState = !this.requireCourseState
      }
    }
  }
</script>
