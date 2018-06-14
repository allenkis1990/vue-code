<template>
  <!-- 课程超市班级课程目录 -->
  <div class="course-catalog">
        <div class="class-directory-box">
          <div class="line"></div>
          <div class="class-directory">
            <div class="directory-li" v-for="(chapter, index) in chapterList" :key="chapter.chapterId">
              <div class="items-tit" @click="toggleExpand(index)">
                <span class="dot"></span><span class="ml20">{{chapter.chapterName}}</span>
              </div>
              <div class="sub-items" v-show="chapter.expand" >
                <div class="sub-items-bd" v-for="(item, $index) in chapter.coursewareList" :key="item.coursewareId">
                  <div class="bd">
                    <span class="dot"></span><span class="ml20">{{($index + 1) + '、' + item.coursewareName}}</span>
                  </div>
                  <div class="time">{{transformTime(item.coursewareLength)}}</div>
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
      chapterList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      toggleExpand (index) {
        this.$emit('onToggleExpand', index, 2)
      },
      transformTime (time) {
        let result = ''
        let minute = parseInt(time / 60)
        let second = parseInt(time % 60)
        if (minute === 0) {
          result += '00:'
        } else if (minute > 0 && minute < 10) {
          result += ('0' + minute + ':')
        } else {
          result += (minute + ':')
        }
        if (second === 0) {
          result += '00'
        } else if (second > 0 && second < 10) {
          result += ('0' + second)
        } else {
          result += second
        }
        return result
      }
    }
  }
</script>
