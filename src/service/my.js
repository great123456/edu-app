// 个人中心
import wxRequest from '@/config/wxRequest'
import { API_PATH } from '@/config/env'

// 用户信息
export const weixinlogin = (ajaxParams) => wxRequest(API_PATH + '/auth/login', ajaxParams, 'GET')

//学校列表
export const apiSchoolList = (ajaxParams) => wxRequest(API_PATH + '/order/school', ajaxParams, 'GET')

//专业列表
export const apiMajorList = (ajaxParams) => wxRequest(API_PATH + `/order/major/shchool/${ajaxParams.id}`, ajaxParams, 'GET')

//完善用户信息
export const apiUserSave = (ajaxParams) => wxRequest(API_PATH + '/auth/save-user', ajaxParams, 'POST')

//显示个人信息(包括实名认证的信息图片)
export const apiUserInfo = (ajaxParams) => wxRequest(API_PATH + '/auth/show', ajaxParams, 'GET')

//上传图片返回url
export const apiUploadImg = (ajaxParams) => wxRequest(API_PATH + '/upload/upload-mage', ajaxParams, 'POST')

//分期信息（选择专业后）
export const apiTuitionInfo = (ajaxParams) => wxRequest(API_PATH + `/order/tuition/major/${ajaxParams.id}`, ajaxParams, 'GET')

//选择课程并支付订单
export const apiCoursePay = (ajaxParams) => wxRequest(API_PATH + '/order/pay', ajaxParams, 'POST')

//我的订单
export const apiGetMyOrder = (ajaxParams) => wxRequest(API_PATH + `/order/my-order/size/${ajaxParams.size}`, ajaxParams, 'GET')

//分期支付（可多选）
export const apiCourseDetailPay = (ajaxParams) => wxRequest(API_PATH + '/order/pay-stages', ajaxParams, 'POST')

//实名认证（保存证件照地址）
export const apiUploadCard = (ajaxParams) => wxRequest(API_PATH + '/order/upload-pic', ajaxParams, 'POST')
