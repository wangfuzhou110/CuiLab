// pages/calendar/rili/mo/mo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  bindinput: function (event) {
    // console.log(event)
    this.setData({
      username: event.detail.value
    })
  },

  bindselect: function (event) {
    if (event.detail.ischeck == false) {
      // console.log(this.data.selectedList.indexOf(this.data.nowdate))
      if (this.data.selectedList.indexOf(this.data.nowdate) > -1) {
        var that = this
        wx.request({
          url: 'http://118.24.134.10:80/cgi-bin/getmoname.cgi',
          data: {
            calendar: 'jian',
            nowdate: that.data.nowdate
          },
          success: function (res) {
            wx.showModal({
              title: '警告',
              content: res.data.username + '预约了',
            })
          }
        })
      }
      else {
        var that = this
        wx.showModal({
          title: '提示',
          content: '您确定要预约' + that.data.nowdate + '吗',
          success: function (res) {
            if (res.confirm) {
              if (that.data.username) {
                wx.request({
                  url: 'http://118.24.134.10:80/cgi-bin/appointdate.cgi',
                  data: {
                    calendar: 'jian',
                    nowdate: that.data.nowdate,
                    username: that.data.username
                  },
                  success: function (res) {
                    that.onShow()
                    wx.showToast({
                      title: '预约成功！',
                    })
                  }
                })
              }
              else {
                wx.showToast({
                  title: '请您先输入预约者姓名',
                  icon: 'none'
                })
              }
            }

          }
        })
      }
    }
  },

  bindgetdate: function (event) {
    // console.log(event)
    this.setData({
      nowdate: event.detail.year.toString() + '-' + event.detail.month.substr(1) + '-' + event.detail.date.toString()
    })
    // console.log(this.data.nowdate)
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
    // console.log('进来了')
    var that = this
    wx.request({
      url: 'http://118.24.134.10:80/cgi-bin/findmo.cgi',
      data: { calendar: 'jian' },
      success: function (res) {
        that.setData({
          selected: res.data.dict,
          selectedList: res.data.list
        })
        console.log(that.data)
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