//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    username: "cuiyq",
    age: 50,
    weather: "bad",
    books: [
      '水浒传',
      '红楼梦', 
      '三国演义',
      '西游记'
    ]
  },
  onInnerTap: function(event) {
    console.log("我是内部事件");
  },
  onOuterTap: function(event) {
    console.log("我是外部事件")
  },
  onLoad: function () {
    console.log(wx.getStorageSync('myDatabase'));
  }
})
