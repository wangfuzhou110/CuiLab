//app.js
App({
  onLaunch: function () {
    //登录
    wx.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'http://118.24.134.10:80/cgi-bin/logUser.cgi',
            data: {
              code: res.code
            },
            success(res) {
              console.log(res.data.mySession);
              //保存自定义会话id到本地
              wx.setStorage({
                key: 'mySession',
                data: res.data.mySession
              });
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

    

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})