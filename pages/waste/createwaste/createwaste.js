// pages/waste/createwaste/createwaste.js
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

  },

  submitwaste: function(event) {
    console.log(event)
    var waste = event.detail.value
    wx.showLoading({
      title: '加载中',
    })
    // var mission = event.detail.value;
    wx.getStorage({
      key: 'myDatabase',
      success: function (res) {
        waste.myDatabase = res.data;
        wx.request({
          url: 'http://118.24.134.10:80/cgi-bin/wastesubmit.cgi',
          data: waste,
          success: function (res) {
            // console.log(res)
            wx.hideLoading()
            if (res.data.result == 1) {
              wx.showToast({
                title: '提交成功',
              })
              wx.switchTab({
                url: '/pages/waste/waste',
              })
            }
            else {
              wx.showToast({
                title: '请不要输入相同名称的条目',
                icon: 'none'
              })
            }
          }
        })
      },
    })
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