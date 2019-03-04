// pages/waste/waste.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wastes:[],
    ifChange: false,
    changedValue: null,
    changedSwitch: null,
    nameToChange: null,
    ifchecked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  confirm: function(event) {
    console.log(event);
    var that = this;
    if(that.data.changedSwitch==null && that.data.changedValue==null){
      wx.showToast({
        title: '您没有作出任何修改',
        icon: 'none'
      })
    }
    else{
      wx.showLoading({
        title: '请稍候',
      })
      wx.getStorage({
        key: 'myDatabase',
        success: function (res) {
          wx.request({
            url: 'http://118.24.134.10:80/cgi-bin/wastechange.cgi',
            data: {
              myDatabase: res.data,
              name: that.data.nameToChange,
              myleft: that.data.changedValue,
              urgent: that.data.changedSwitch
            },
            success: function (res) {
              that.setData({
                ifChange: false,
                changedValue: null,
                changedSwitch: null,
                nameToChange: null,
                inputValue: '',
              })
              
              that.onShow()
              wx.hideLoading()
              wx.showToast({
                title: '修改成功',
              })
            }
          })
        },
      })
    }
  },

  setSwitch: function(event) {
    // console.log(event)
    this.setData({
      changedSwitch: event.detail.value,
    })
  },

  setValue: function(event) {
    this.setData({
      changedValue: event.detail.value,
    })
  },

  cancel: function() {
    this.setData({
      ifChange: false,
      changedValue: null,
      changedSwitch: null,
      nameToChange: null,
    })
  },

  onTapChange: function(event) {
    this.setData({
      nameToChange: event.currentTarget.dataset.name,
      ifChange: true,
    });
    var wastes = this.data.wastes;
    // console.log(wastes.length)
    for (var i=0; i<wastes.length; i++) {
      // console.log(wastes[i].urgent)
      if (wastes[i].name == event.currentTarget.dataset.name){
        // console.log(wastes[i])

        if (wastes[i].urgent == 1){
          this.setData({
            ifchecked: true
          })
        }
        else{
          this.setData({
            ifchecked: false
          })
        }
      }
    }
  },

  onTapCreate: function(event) {
    wx.navigateTo({
      url: 'createwaste/createwaste',
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
    // console.log(myDatabase + '===========');
    wx.getStorage({
      key: 'myDatabase',
      success: function (res) {
        console.log(res);
        var name = res.data;
        wx.request({
          url: 'http://118.24.134.10:80/cgi-bin/getwastes.cgi',
          data: { myDatabase: name },
          success: function (res) {
            var webdata = res.data
            that.setData({
              wastes: webdata
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