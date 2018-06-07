<!-- 个人信息 -->
<template>
  <div class="container">
    <div class="message-container">
       <p class="message-title">完善个人信息</p>
       <div class="message-option">
         <span>姓名</span>
         <input type="text" v-model="name" placeholder="请输入姓名"/>
       </div>
       <div class="message-option">
         <span>电话</span>
         <input type="text" v-model="phone" placeholder="请输入电话"/>
       </div>
       <div class="message-option">
         <span>身份证号</span>
         <input type="text" v-model="card" placeholder="请输入身份证号"/>
       </div>
       <div class="message-option">
         <span>地址</span>
         <input type="text" v-model="address" placeholder="请输入地址"/>
       </div>
       <p class="order-btn" @click="saveUserMessage">完成</p>
    </div>
  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { apiUserSave,apiUserInfo } from '@/service/my'
export default {
  mixins: [wxShare],
  data () {
    return {
      name: '',
      phone: '',
      card: '',
      address: ''
    }
  },
  components: {

  },
  mounted() {

  },
  onShow(){
    this.getUserMessage()
  },
  created(){

  },
  methods: {
   getUserMessage(){
     apiUserInfo()
     .then((res)=>{
       if(res.code == 200){
         this.name = res.data.name
         this.phone = res.data.phone
         this.card = res.data.id_card_no
         this.address = res.data.address
       }
     })
   },
   saveUserMessage(){
    console.log('card',this.card)
     if(this.name == '' || this.address == '' || this.card == '' || this.phone==''){
       wx.showToast({
          title: '请填写完个人信息再保存',
          icon: 'none',
          duration: 2000
         })
        return
     }
     apiUserSave({
       name: this.name,
       address: this.address,
       id_card_no: this.card,
       phone: this.phone
     })
     .then((res)=>{
       if(res.code == 200){
         wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
         })
         wx.switchTab({
            url: '/pages/center/center'
         })
       }else{
         wx.showToast({
          title: res.errmsg,
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
  padding-top: 30rpx;
}
.message-container{
  background: #ffffff;
  border-radius: 10rpx;
  padding:20rpx;
  p{
    color:#666666;
    height:100rpx;
    line-height: 100rpx;
    font-size: 36rpx;
  }
}
.message-option{
  height:100rpx;
  line-height: 100rpx;
  color:#999999;
  font-size: 32rpx;
  span{
    display: inline-block;
    width:200rpx;
  }
  input{
    display: inline-block;
    font-size: 32rpx;
    line-height: 100rpx;
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
  margin: 120rpx auto;
  color:#ffffff !important;
}
</style>
