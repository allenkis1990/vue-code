<template>
<!-- 平台班级课程目录 -->
 <div class="course-catalog">
        <div class="class-directory-box">
          <div class="line"></div>
          <div class="class-directory">
            <div class="directory-li" v-for="(course, index) in courseList" :key="course.courseWrapId">
              <div class="items-tit" @click="toggleExpand(index)">
                <span class="dot"></span><span class="label">{{course.type == 1 ? '必修包' : '选修包'}}</span>{{course.courseWrapName}}
              </div>
              <div class="sub-items" v-show="course.expand">
                <div class="sub-items-bd" v-for="item in course.children" :key="item.courseId">
                  <div class="bd">
                    <span class="dot"></span><span class="label">{{item.period}}学时</span>{{item.courseName}}
                  </div>
                  <!-- <div class="ft"><img class="img" src="../images/icon-play.png" /></div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
  export default {
    props: {
      courseList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      toggleExpand (index) {
        this.$emit('onToggleExpand', index, 1)
      }
    }
  }
</script>
