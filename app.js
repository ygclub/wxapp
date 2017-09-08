//app.js

App({
  data:{
      user:null,
      urlDomain:"https://squirrelrao.com/"
  },
  onLoad: function () {
    // 实例化API核心类
  },
  onLaunch: function () {
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res);
        if (res.code) {
          //发起网络请求
          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              that.data.user = res.userInfo
            },
            fail:function(res){
              console.log(res);
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
})