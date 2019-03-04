// pages/req/usebase/findbase/verify/verify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    var that = this
    var name = options.name;
    that.setData({
      name: name
    });
  },

  baseSubmit: function(event) {
    var passwd = event.detail.value.passwd;
    var mySession = wx.getStorageSync('mySession');
    var basename = this.data.name;
    if (passwd && mySession) {
      wx.showLoading({
        title: '请稍候',
      })
      wx.request({
        url: 'http://118.24.134.10:80/cgi-bin/verify.cgi',
        data: {
          'basename': basename,
          'passwd': passwd,
          'mySession': mySession
        },
        success(res) {
          wx.hideLoading();
          if (res.data.result == 1) {
            wx.setStorage({
              key: 'myDatabase',
              data: basename
            })
            wx.showToast({
              title: '登录成功！',
              success() {
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }
            })
          }
          else if (res.data.result == 0) {
            wx.showToast({
              title: '密码错误，请重试',
              icon: 'none'
            })
          }
          else if (res.data.result == 2) {
            wx.showToast({
              title: '您已经在此实验室中了',
              icon: 'none'
            })
          }
          // console.log(res);
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})