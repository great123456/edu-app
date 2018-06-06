import Vue from 'vue'
// import store from './store/index'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  // store,
  ...App
})
app.$mount()

export default {
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，
    // 其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/index',                           // 首页
      'pages/center/center',                          //我的
      'pages/order/order',                            //订单列表
      'pages/order-detail/order-detail',              //订单详情
      'pages/course/course',                          //课程
      'pages/message/message',                        //个人信息
      'pages/approve/approve',                        //实名认证
      'pages/manage/manage',                          //八大员题库
      'pages/edit-message/edit-message'               //填写信息
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      position: 'bottom',
      color: '#AEAEBD',
      selectedColor: '#303135',
      backgroundColor: '#FFFFFF',
      borderStyle: '#E1E1E6',
      list: [{
        text: '首页',
        pagePath: 'pages/index/index',
        iconPath: '/static/image/index/home.png',
        selectedIconPath: '/static/image/index/home-select.png'
      },{
        text: '课程',
        pagePath: 'pages/course/course',
        iconPath: '/static/image/index/course.png',
        selectedIconPath: '/static/image/index/course-select.png'
      },{
        text: '我的',
        pagePath: 'pages/center/center',
        iconPath: '/static/image/index/me.png',
        selectedIconPath: '/static/image/index/me-select.png'
      }]
    }
  }
}
