//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数

  onLoad: function () {
    var that = this

  },

  toCreat:function(){
    wx.navigateTo({
      url: '/pages/creatClass/creatClass'
    })
  }
})
