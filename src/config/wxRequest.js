
export default async(url, params, method) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method || 'GET',
      data: params,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token') || ''
      },
      success: (response) => {
        resolve(response.data)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}
