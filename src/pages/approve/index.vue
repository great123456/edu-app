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
import { apiUploadImg,apiUploadCard } from '@/service/my'
export default {
  mixins: [wxShare],
  data () {
    return {
     imgurl: '',
     imgurl2:'',
     imgurl3:'',
     imgurl5:'',
     card_face: '',
     card_back: '',
     cert_pic: '',
     graduation_pic: ''
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
              self.card_face = JSON.parse(res.data).data.url
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
              self.card_back = JSON.parse(res.data).data.url
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
              self.cert_pic = JSON.parse(res.data).data.url
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
              self.graduation_pic = JSON.parse(res.data).data.url
              console.log('graduation_pic',self.graduation_pic)
            }
          })
        }
      })
    },
    editMessagePage(){
      if(this.card_face ==''||this.card_back == ''||this.cert_pic == ''){
        wx.showToast({
            title: '还有证件没上传',
            icon: 'none',
            duration: 2000
        })
        return
      }
      apiUploadCard({
        id_card_face: this.card_face,
        id_card_back: this.card_back,
        cert_pic: this.cert_pic,
        graduation_pic: this.graduation_pic
      })
      .then((res)=>{
        console.log('card-res',res)
        if(res.code == 200){
          wx.setStorageSync('card', true)
          wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
          })
          wx.navigateBack({
            delta: 1
          })
        }else{
          wx.showToast({
              title: '实名认证失败',
              icon: 'none',
              duration: 2000
          })
        }
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
