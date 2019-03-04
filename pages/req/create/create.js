// pages/req/create/create.js
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getStorage({
      key: 'mySession',
      success(res) {
        console.log(res.data + '我是你爸爸')
      }
    });
  },

  baseSubmit: function (event) {
    // wx.navigateTo({
    //   url: '',
    // })
    var passwd = event.detail.value.passwd;
    var basename = event.detail.value.basename;
    var mySession = wx.getStorageSync('mySession');
    if (passwd && basename && mySession){
      wx.showLoading({
        title: '请稍候',
      })
      wx.request({
        url: 'http://118.24.134.10:80/cgi-bin/createLab.cgi',
        data: {
          'basename': basename,
          'passwd': passwd,
          'mySession': mySession
        },
        success(res) {
          wx.hideLoading();
          if(res.data.result==1){
            wx.showToast({
              title: '创建成功！',
              success(){
                wx.navigateBack({});
              }
            })
            
          }
          else if (res.data.result==0){
            wx.showToast({
              title: '已存在该数据库，请勿重复创建',
              icon: 'none'
            })
          }
          console.log(res);
          
        }
      })
    }
    else{
      wx.showToast({
        title: '请输入有效的用户名/密码',
        duration: 1500,
        icon: 'none'
      });
      // wx.hideToast()
    }
    
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