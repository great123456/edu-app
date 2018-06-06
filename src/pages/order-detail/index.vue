<!-- 订单详情 -->
<template>
  <div class="container">
    <div class="order-container">
      <div class="order-option" v-for="(item,index) in orderList.details" :key="index" @click="orderPay(item.id)">
        <p class="option-education">{{orderList.school.name}}<span>{{orderList.type == '1'?'专科':'本科'}}</span></p>
        <p class="course">{{orderList.major.major}}</p>
        <p class="order-price">第{{item.period}}期￥{{item.fee}}</p>
        <p class="order-date">{{item.should_paid_at}}</p>
      </div>
    </div>
    <p style="margin-top:30rpx;color:#b5b6b7" v-show="orderList.details.length == 0">已全部还清</p>
  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { apiGetMyOrder,apiCoursePay,apiCourseDetailPay } from '@/service/my'
export default {
  mixins: [wxShare],
  data () {
    return {
     orderList: {
       details: []
     },
     index: 0
    }
  },
  components: {

  },
  mounted() {

  },
  onShow(){
    this.index = this.$mp.query.index
    this.getOrderList(this.index)
  },
  created(){

  },
  methods: {
    getOrderList(index){
      apiGetMyOrder({
        size: 10
      })
      .then((res)=>{
        if(res.code == 200){
          this.orderList = res.data.data[index]
          console.log('orderList',this.orderList);
        }
      })
    },
    orderPay(ids){
      apiCourseDetailPay({
       ids: ids
      })
      .then((res)=>{
        if(res.code == 200){
          console.log('order-pay',res);
          wx.requestPayment({
             'timeStamp': res.data.timeStamp+ '',
             'nonceStr': res.data.nonceStr,
             'package': res.data.package,
             'signType': 'MD5',
             'paySign': res.data.paySign,
             'success':function(res){
               wx.redirectTo({
                 url: '/pages/order/order'
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
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-top: 1px;
  padding-bottom: 100rpx;
  text-align: center;
  background: #ffffff;
}
.banner{
  width:100%;
  background: #F3FBFF;
  height:400rpx;
  text-align: center;
  padding-top: 40rpx;
  box-sizing: border-box;
  .banner-content{
    width:180rpx;
    height:180rpx;
    border-radius: 100%;
    border:1px solid #04A1E9;
    display: inline-block;
    .banner-price{
      font-size: 36rpx;
      color:#04A1E9;
      margin-top: 60rpx;
    }
    .banner-num{
      font-size: 23rpx;
      color:#cccccc;
      margin-top: 10rpx;
    }
  }
}
.education{
  font-size: 44rpx;
  color: #333333;
  margin: 20rpx auto;
  position: relative;
  width:220rpx;
  margin-bottom: 0px;
  span{
    display: inline-block;
    width:65rpx;
    height:40rpx;
    border-radius: 15px;
    border: 1px solid #04A1E9;
    color:#04A1E9;
    font-size: 20rpx;
    margin-left: 16rpx;
    line-height: 40rpx;
    position: absolute;
    top:10rpx;
    right:0px;
    transform: translateX(100%);
  }
}
.course{
  color: #666666;
  font-size: 23rpx;
  margin-top: 5rpx;
}
.order-container{
  padding:0rpx 30rpx;
  background: #ffffff;
}
.order-option{
  background: #F5F5F5;
  border-radius: 10px;
  margin-top: 30rpx;
  padding:30rpx 20rpx;
  text-align: left;
  position: relative;
  .option-education{
    font-size: 40rpx;
    color: #333333;
    position: relative;
    margin-bottom: 0px;
    span{
      display: inline-block;
      width:65rpx;
      height:40rpx;
      border-radius: 15px;
      border: 1px solid #04A1E9;
      color:#04A1E9;
      font-size: 20rpx;
      margin-left: 6rpx;
      line-height: 40rpx;
      transform: translateY(-5rpx);
      text-align: center;
    }
  }
  .order-price{
    position: absolute;
    right:20rpx;
    top:25rpx;
    color: #04A1E9;
    font-size: 36rpx;
  }
  .order-date{
    font-size: 24rpx;
    color: #CCCCCC;
    position: absolute;
    right:20rpx;
    bottom:20rpx;
  }
}
</style>
