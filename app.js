//app.js

App({
  data:{
      user:null
  },
  onLoad: function () {
    // 实例化API核心类
  },

  onLaunch: function () {
    var that = this;

    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (res) {
            that.data.user = res.userInfo
          }
        })
      }
    });
  }
})