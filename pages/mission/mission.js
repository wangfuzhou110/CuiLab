// pages/mission/mission.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    missions: []
  },

  onTapDelete: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.name
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认任务已经完成吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            title: '请稍候',
          })
          wx.getStorage({
            key: 'myDatabase',
            success: function(res) {
              var myDatabase = res.data;
              console.log(id, myDatabase)
              wx.request({
                url: 'http://118.24.134.10:80/cgi-bin/missiondelete.cgi',
                data: {
                  id: id,
                  myDatabase: myDatabase
                },
                success: function () {
                  wx.hideLoading()
                  wx.showToast({
                    title: '任务已完成',
                  })
                  that.onShow()
                }
              })
            },
          })
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  onTapCreate: function() {
    wx.navigateTo({
      url: 'makemission/makemission',
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
    // var myDatabase = wx.getStorageSync('myDatabase');
    var that = this;
    // console.log(myDatabase + '===========');
    wx.getStorage({
      key: 'myDatabase',
      success: function(res) {
        console.log(res);
        var name = res.data;
        wx.request({
          url: 'http://118.24.134.10:80/cgi-bin/getmissions.cgi',
          data: {myDatabase: name},
          success: function (res) {
            that.setData({
              missions: res.data
            })
          }
        })
      },
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