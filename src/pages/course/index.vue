<!-- 课程 -->
<template>
  <div class="container">
    <div class="course-banner" @click="managePage">
      <image src="/static/image/course/test.png" mode="widthFix" class="course-img"></image>
    </div>
    <div class="course-banner"  @click="managePage">
      <image src="/static/image/course/teacher.png" mode="widthFix" class="course-img"></image>
    </div>
    <div class="course-banner"  @click="editMessagePage">
      <image src="/static/image/course/education.png" mode="widthFix" class="course-img"></image>
    </div>
  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
export default {
  mixins: [wxShare],
  data () {
    return {

    }
  },
  components: {

  },
  mounted() {

  },
  onShow(){

  },
  created(){

  },
  methods: {
    managePage(){
      wx.navigateTo({
        url: '/pages/manage/manage'
      })
    },
    editMessagePage(){
      wx.navigateTo({
        url: '/pages/edit-message/edit-message'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding:0rpx 30rpx;
  padding-top: 1px;
}
.course-banner{
  width:100%;
  margin-top: 20rpx;
  .course-img{
    width:100%;
  }
}
</style>
