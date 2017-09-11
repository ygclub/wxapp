//app.js

App({
  data:{
      user:null,
      urlDomain:"https://squirrelrao.com/"
  },
   json2Form:function(json) {
    var str = [];
    for(var p in json) {
  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
}
return str.join("&");
},
  onLoad: function () {
    // 实例化API核心类
  },
  onLaunch: function () {
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res);
        var code = res.code;
      
        if (code) {
          //发起网络请求
          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              that.data.user = res.userInfo;
              wx.request({
                url: that.data.urlDomain+ 'v1/regist',
                method:"POST",
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: that.json2Form({
                  "uid": code,
                  "nickname": res.userInfo.nickName
                }),
                success: function (res) {
                  console.log(res);
                }
              })
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