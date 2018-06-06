<!-- 首页 -->
<template>
  <div class="container">
     <div class="banner" @click="messagePage">
      <image :src="imgUrl" mode="widthFix"></image>
     </div>

     <div class="list" style="margin-top:30rpx">
       <p class="list-title">名校推荐</p>
       <ul>
         <li @click="messagePage">
            <image src="/static/image/index/yangzhou.png" mode="widthFix"></image>
            <p>扬州大学</p>
         </li>
         <li @click="messagePage">
           <image src="/static/image/index/jiangsu.png" mode="widthFix"></image>
           <p>江苏大学</p>
         </li>
         <li @click="messagePage">
           <image src="/static/image/index/nanjing.png" mode="widthFix"></image>
           <p>南京工业大学</p>
         </li>
       </ul>
     </div>

     <div class="category">
       <p>热门专业</p>
       <ul>
         <li v-for="(item,index) in categoryList" :key="index">{{item}}</li>
       </ul>
     </div>

  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { weixinlogin } from '@/service/my'
export default {
  mixins: [wxShare],
  data () {
    return {
     userInfo: {},
     imgUrl: '/static/image/index/banner.png',
     categoryList: ['商务管理','工商管理','财务管理','金融学','行政管理','会计与审计','药学','人力资源管理']
    }
  },
  components: {

  },
  mounted() {

  },
  onShow(){
     wx.login({
       success: function(res) {
         console.log('code-res',res)
         wx.setStorageSync('code', res.code)
         weixinlogin({
           code: res.code
         })
         .then((res)=>{
           console.log('res',res)
            wx.setStorageSync('token', res.data.token)
         })
       }
     })
  },
  created(){
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              // console.log('res',res)
              this.userInfo = res.userInfo
              wx.setStorageSync('userInfo', res.userInfo)
            }
          })
        }
      })
    },
    messagePage(){
      wx.navigateTo({
         url: '/pages/edit-message/edit-message'
       })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-top: 30rpx;
  padding-bottom: 100rpx;
  background: #ffffff;
}
.banner{
  width:100%;
  image{
    width:100%;
  }
}
.list{
  padding:0rpx 30rpx;
  box-sizing: border-box;
  background: #ffffff;
  .list-title{
    color:#666666;
    margin-bottom: 30rpx;
  }
  ul{
    display: flex;
    justify-content: space-between;
    li{
      flex: 1;
      text-align: center;
      image{
        width:90%;
      }
      p{
        margin-top:10rpx;
      }
    }
  }
}
.category{
  background: #ffffff;
  border-radius: 10rpx;
  margin-top: 40rpx;
  padding:30rpx;
  p{
    color:#666666;
  }
  ul{
    width:100%;
    display: flex;
    justify-content:flex-start;
    flex-wrap: wrap;
    li{
      height:50rpx;
      padding:0rpx 20rpx;
      border-radius: 100rpx;
      background: #EFF8FF;
      color: #5ABFFF;
      text-align: center;
      margin-top: 30rpx;
      margin-right: 20rpx;
      line-height: 50rpx;
    }
  }
}

</style>
