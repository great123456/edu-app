<!-- 填写信息 -->
<template>
  <div class="container">
    <div class="edit-container">
      <p class="edit-title">报考信息</p>
      <div class="pay-option">
        <div v-for="(item,index) in typeList" :key="index" :class="{active: typeIndex == index}" @click="selectTypeIndex(index)">{{item}}</div>
      </div>
      <div class="pay-select">
        <picker bindchange="bindPickerChange" :range="schoolList" @change="bindPickerChange" range-key="name">
          <view class="picker">
            {{preSchool}}
          </view>
        </picker>
      </div>
      <div class="pay-select">
        <picker bindchange="bindPickerChange" :range="professionList" @change="bindprofessionChange" range-key="major">
          <view class="picker">
            {{profession}}
          </view>
        </picker>
      </div>
      <p class="edit-title">个人信息</p>
      <div class="edit-option">
        <div class="edit-put">
          <input type="text" v-model="name" placeholder="请输入姓名">
        </div>
      </div>
      <div class="edit-option">
        <div class="edit-put">
          <input type="text" v-model="phone" placeholder="请输入手机号码">
        </div>
      </div>
      <div class="edit-option">
        <div class="edit-put" style="width:430rpx;">
          <input type="text" v-model="card" placeholder="请输入身份证号码">
        </div>
        <span class="approve-btn" @click="approvePage">{{approveText}}</span>
      </div>
      <p class="edit-title" v-show="payOptionList.length>0">支付信息</p>
      <div class="pay-option" v-show="payOptionList.length>0">
        <div v-for="(item,index) in payOptionList" :key="index" :class="{active: payIndex == index}" @click="selectPayIndex(index)">{{item.text}}</div>
      </div>
    </div>
    <p class="order-btn" @click="orderPay">确认支付</p>
  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { formatTimeString } from '@/config/utils'
import { apiSchoolList,apiMajorList,apiTuitionInfo,apiCoursePay } from '@/service/my'
export default {
  mixins: [wxShare],
  data () {
    return {
     name: '',
     phone: '',
     card: '',
     typeIndex: 0,
     typeList: ['提升专科','提升本科'],
     payIndex: 0,
     payOptionList: [],
     customItem: '',
     schoolList: [],
     preSchool: '请选择学校',
     preSchoolId: '',
     profession: '请选择专业',
     professionId: '',
     professionList: [],
     stages: 1,
     code: '',
     isApprove: false,
     approveText: '实名认证'
    }
  },
  components: {

  },
  mounted() {

  },
  onShow(){
    if(wx.getStorageSync('card')){
       this.isApprove = true
       this.approveText = '已认证'
    }
    if(wx.getStorageSync('my-name')){
      this.name = wx.getStorageSync('my-name')
      this.phone = wx.getStorageSync('my-phone')
      this.card = wx.getStorageSync('my-card')
    }
    //this.getCode()
    this.getSchoolList()
  },
  created(){

  },
  methods: {
    getCode(){
      const self = this
       wx.login({
         success: function(res) {
           console.log('code',res);
           self.code = res.code
         }
       })
    },
    selectTypeIndex(index){
      this.typeIndex = index
    },
    selectPayIndex(index){
      this.payIndex = index
      if(index == 0){
        this.stages = 1
      }
      if(index == 1){
        this.stages = 3
      }
      if(index == 2){
        this.stages = 6
      }
      if(index == 3){
        this.stages = 12
      }
    },
    bindPickerChange: function(e) {
      let index = Number(e.mp.detail.value)
      this.preSchool = this.schoolList[index].name
      this.preSchoolId = this.schoolList[index].id
      this.getMajorList(this.schoolList[index].id)
    },
    bindprofessionChange(e){
      let index = Number(e.mp.detail.value)
      this.profession = this.professionList[index].major
      this.professionId = this.professionList[index].id
      this.getTuitionList(this.professionId)
    },
    getSchoolList(){                                  //学校列表
      apiSchoolList()
      .then((res)=>{
        this.schoolList = res.data
      })
    },
    getMajorList(id){                                 //专业列表
      apiMajorList({
        id: id
      })
      .then((res)=>{
        if(res.code == 200){
          console.log('major',res);
          this.professionList = res.data
        }
      })
    },
    getTuitionList(id){                               //获取分期信息
      apiTuitionInfo({
        id: id
      })
      .then((res)=>{
        if(res.code == 200){
          console.log('tuition',res);
          this.payOptionList = []
          for(let value in res.data){
            this.payOptionList.push({
              'value': res.data[value]
            })
          }
          console.log('payOptionList',this.payOptionList);
          this.payOptionList[0].text = '全款￥'+this.payOptionList[0].value
          this.payOptionList[1].text = '3期x'+this.payOptionList[1].value
          this.payOptionList[2].text = '6期x'+this.payOptionList[2].value
          this.payOptionList[3].text = '12期x'+this.payOptionList[3].value
        }
      })
    },
    orderPay(){
      if(!this.isApprove){
        wx.showToast({
          title: '请先完成实名认证',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if(this.preSchoolId == '' || this.professionId == '' || this.name == '' || this.phone== ''|| this.card ==''){
        wx.showToast({
          title: '请填写完所有信息再提交',
          icon: 'none',
          duration: 2000
        })
        return
      }
      wx.setStorageSync('my-name', this.name)
      wx.setStorageSync('my-phone', this.phone)
      wx.setStorageSync('my-card', this.card)
      apiCoursePay({
        type: this.typeIndex+1,
        school_id: this.preSchoolId,
        major_id: this.professionId,
        name: this.name,
        phone: this.phone,
        id_card_no: this.card,
        stages: this.stages
      })
      .then((res)=>{
        if(res.code == 200){
          console.log('pay',res);
          wx.requestPayment({
             'timeStamp': res.data.timeStamp+ '',
             'nonceStr': res.data.nonceStr,
             'package': res.data.package,
             'signType': 'MD5',
             'paySign': res.data.paySign,
             'success':function(res){
               wx.switchTab({
                 url: '/pages/index/index'
               })
             },
             'fail':function(err){
               console.log('err',err)
             }
          })
        }else{
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    approvePage(){
      wx.navigateTo({
        url: '/pages/approve/approve'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding:0rpx 30rpx;
  box-sizing: border-box;
  padding-bottom: 100rpx;
  background: #ffffff;
}
.edit-container{
  width:100%;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0rpx 20rpx;
  padding-bottom: 30rpx;
}
.pay-select{
  margin-top: 30rpx;
  border: 1px solid #b5b6b7;
  border-radius: 22px;
  height:70rpx;
  line-height: 70rpx;
  text-indent: 30rpx;
}
.edit-title{
  color: #666666;
  margin-bottom: 10rpx;
  font-size: 32rpx;
  margin-top: 30rpx;
}
.edit-option{
  margin-top: 20rpx;
  .edit-title{
    color: #999999;
    font-size: 25rpx;
  }
  .approve-btn{
    display: inline-block;
    width:180rpx;
    height:70rpx;
    line-height: 70rpx;
    color:#ffffff;
    margin-left: 20rpx;
    text-align: center;
    font-size: 25rpx;
    background: #5ABFFF;
    border-radius: 20px;
    float:right;
    transform:translateY(-100%);
  }
  .edit-put{
    height:70rpx;
    line-height: 70rpx;
    border: 1px solid #b5b6b7;
    border-radius: 22px;
    margin-top: 10rpx;
    padding-left: 20rpx;
    input{
      margin-top: 10rpx;
    }
  }
}
.order-btn{
  width:550rpx;
  height:90rpx;
  line-height: 90rpx;
  border-radius: 22px;
  background: #5ABFFF;
  font-size: 32rpx;
  margin-top: 60rpx;
  color:#ffffff !important;
  box-sizing: border-box;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.pay-option{
  margin-top: 10rpx;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  div{
    width:300rpx;
    height:80rpx;
    line-height: 80rpx;
    color: #04A1E9;
    border: 1px solid #04A1E9;
    border-radius: 35px;
    text-align: center;
    margin-top: 20rpx;
  }
  .active{
    background: #5ABFFF;
    color:#ffffff;
  }
}
</style>
