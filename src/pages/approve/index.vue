<!-- 实名认证 -->
<template>
  <div class="container">
    <div class="approve-option" @click="chooseImage">
      <image src="/static/image/course/card-positive.png" mode="widthFix" class="approve-img"></image>
      <p class="approve-text">上传身份证正面(必选)</p>
      <image :src="imgurl" class="upload-img"></image>
    </div>
    <div class="approve-option" @click="selectImage">
      <image src="/static/image/course/card-negative.png" mode="widthFix" class="approve-img"></image>
      <p class="approve-text">上传身份证反面(必选)</p>
      <image :src="imgurl2" class="upload-img"></image>
    </div>
    <div class="approve-option" @click="selectPhoto">
      <image src="/static/image/course/identification.png" mode="widthFix" class="approve-img"></image>
      <p class="approve-text">上传证件照(必选)</p>
      <image :src="imgurl3" class="upload-img"></image>
    </div>
    <div class="approve-option" @click="selectCardImage">
      <image src="/static/image/course/graduate.png" mode="widthFix" class="approve-img"></image>
      <p class="approve-text">上传毕业证(选填)</p>
      <image :src="imgurl5" class="upload-img"></image>
    </div>
    <p class="order-btn" @click="editMessagePage">确认提交</p>
  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { apiUploadImg } from '@/service/my'
export default {
  mixins: [wxShare],
  data () {
    return {
     imgurl: '',
     imgurl2:'',
     imgurl3:'',
     imgurl5:''
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
    chooseImage(){
      const self = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          self.imgurl = res.tempFilePaths[0]
          wx.uploadFile({
            url: 'https://eduapi.hxgtech.com/api/upload/upload-mage',
            filePath: res.tempFilePaths[0],
            name: 'img',
            header: {
             'content-type': 'multipart/form-data',
              token: wx.getStorageSync('token')
            },
            formData: {
              img: res.tempFiles[0]
            },
            success: function(res){
              console.log('upload',res);
            }
          })
        }
      })
    },
    selectImage(){
      const self = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          self.imgurl2 = res.tempFilePaths[0]
          wx.uploadFile({
            url: 'https://eduapi.hxgtech.com/api/upload/upload-mage',
            filePath: res.tempFilePaths[0],
            name: 'img',
            header: {
             'content-type': 'multipart/form-data',
              token: wx.getStorageSync('token')
            },
            formData: {
              img: res.tempFiles[0]
            },
            success: function(res){
              console.log('upload2',res);
            }
          })
        }
      })
    },
    selectPhoto(){
        const self = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          self.imgurl3 = res.tempFilePaths[0]
          wx.uploadFile({
            url: 'https://eduapi.hxgtech.com/api/upload/upload-mage',
            filePath: res.tempFilePaths[0],
            name: 'img',
            header: {
             'content-type': 'multipart/form-data',
              token: wx.getStorageSync('token')
            },
            formData: {
              img: res.tempFiles[0]
            },
            success: function(res){
              console.log('upload3',res);
            }
          })
        }
      })
    },
    selectCardImage(){
      const self = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          self.imgurl5 = res.tempFilePaths[0]
          wx.uploadFile({
            url: 'https://eduapi.hxgtech.com/api/upload/upload-mage',
            filePath: res.tempFilePaths[0],
            name: 'img',
            header: {
             'content-type': 'multipart/form-data',
              token: wx.getStorageSync('token')
            },
            formData: {
              img: res.tempFiles[0]
            },
            success: function(res){
              console.log('upload5',res);
            }
          })
        }
      })
    },
    editMessagePage(){
      if(this.imgurl ==''||this.imgurl2 == ''||this.imgurl3 == ''){
        wx.showToast({
            title: '还有证件没上传',
            icon: 'none',
            duration: 2000
        })
        return
      }
      wx.setStorageSync('card', true)
      wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
      })
      wx.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding:0rpx 30rpx;
  padding-top: 1px;
  text-align: center;
  background: #ffffff;
  padding-bottom: 130rpx;
}
.approve-option{
  margin-top: 30rpx;
  height:350rpx;
  border:1px dashed #5ABFFF;
  border-radius: 20px;
  position: relative;
  .approve-img{
    width:260rpx;
    margin-top: 100rpx;
  }
  .approve-text{
    font-size: 32rpx;
    color:#5ABFFF;
    margin-top: 20rpx;
  }
  .upload-img{
    width:90%;
    height:95%;
    position:absolute;
    left:5%;
    top:2.5%;
  }
}
.order-btn{
  width:550rpx;
  height:90rpx;
  line-height: 90rpx;
  border-radius: 22px;
  background: #5ABFFF;
  text-align: center;
  font-size: 32rpx;
  margin: 60rpx auto;
  color:#ffffff !important;
}
</style>
