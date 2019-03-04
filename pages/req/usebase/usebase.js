// pages/req/usebase/usebase.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bases: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onTapFind: function() {
    wx.navigateTo({
      url: 'findbase/findbase',
    })
  },

  onTapSelect: function(event) {
    var name = event.currentTarget.dataset.name;
    wx.setStorage({
      key: 'myDatabase',
      data: name
    });
    wx.switchTab({
      url: '/pages/index/index',
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
    var that = this;
    var mySession = wx.getStorageSync('mySession');
    wx.request({
      url: 'http://118.24.134.10:80/cgi-bin/showbase.cgi',
      data: {
        mySession: mySession
      },
      success(res) {
        var bases = res.data;
        console.log(res)
        that.setData({
          bases: bases
        });
      }
    })
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