// pages/mission/makemission/makemission.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickDate: '2019-01-01'
  },

  bindDateChange: function(event){
    // console.log()
    this.setData({
      pickDate: event.detail.value
    })
  },

  missionSubmit: function(event){
    // console.log(event);
    // console.log(event)
    var mission = event.detail.value
      wx.showLoading({
        title: '加载中',
      })
      // var mission = event.detail.value;
      wx.getStorage({
        key: 'myDatabase',
        success: function (res) {
          mission.myDatabase = res.data;
          wx.request({
            url: 'http://118.24.134.10:80/cgi-bin/missionsubmit.cgi',
            data: mission,
            success: function (res) {
              // console.log(res)
              wx.hideLoading()
              if (res.data.result == 1) {
                wx.showToast({
                  title: '任务已发布',
                })
                wx.switchTab({
                  url: '/pages/mission/mission',
                })
              }
              else {
                wx.showToast({
                  title: '发布失败',
                  icon: 'none'
                })
              }
            }
          })
        },
      })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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