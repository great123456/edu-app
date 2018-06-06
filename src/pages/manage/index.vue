<!-- 个人信息 -->
<template>
  <div class="container">
    <image src="/static/image/no-data.png" mode="widthFix" class="manage-img"></image>
    <p>该功能正在努力开发中</p>
    <p>敬请期待</p>
  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
export default {
  mixins: [wxShare],
  data () {
    return {
      name: ''
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

  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-top:200rpx;
  text-align: center;
}
.manage-img{
  width:210rpx;
}
p{
  color: #CCCCCC;
  font-size: 28rpx;
  margin-top: 10rpx;
}
</style>
