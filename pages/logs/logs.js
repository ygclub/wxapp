//logs.js
var app = getApp();
var img ="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503247087783&di=e2423e4f765bf38b3d4040862f064e65&imgtype=0&src=http%3A%2F%2Fp4.qqgexing.com%2Ftouxiang%2F20120810%2F1502%2F5024b21b74511.jpg";

Page({
  data: {
    imgSrc:img,
    login:false,
    user_nickname:"未登录",
    user_avatar:img,
    ver:false
  },
  onLoad: function () {
    var user = app.data.user;
    var that = this;
    console.log(user);
    if(user){
      this.setData({
        user_nickname: user.nickName,
        user_avatar: user.avatarUrl || img,
        login:true,
      });
    }else {
     //弹出登录
      wx.login({
        success: function (res) {
          var code = res.code;
          if(code)
          {
            wx.getUserInfo({
              success: function (res) {
                console.log(res);
                that.data.user = res.userInfo;
                var name = res.userInfo;
                console.log(name);
                that.setData({
                  user_nickname: name.nickName,
                  user_avatar: name.avatarUrl,
                })
                wx.request({
                  url: app.data.urlDomain + 'v1/regist',
                  method: "POST",
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  data: app.json2Form({
                    "uid": code,
                    "nickname": name.nickName
                  }),
                  success: function (res) {
                    console.log(res);
                  }
                })
              },
              fail: function (res) {
                console.log(res);
              }
            })
          }      
        }
    })

    }
  },
  loginIn(){
    console.log(1);
    var that = this;
    if (!this.data.login){
      wx.login({
        success: function (res) {
          console.log(res);
          if (res.code) {
            //发起网络请求
            wx.getUserInfo({
              success: function (res) {
                console.log(res);
                that.data.user = res.userInfo;
                that.setData({
                  user_nickname: res.userInfo.nickName,
                  user_avatar: res.userInfo.avatarUrl,
                })
              },
              fail: function (res) {
                console.log(res);
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }
  },
  loginOut(){
    this.setData({
      user_nickname: "未登录",
      user_avatar: img,
      login: false,
    })
  },
  toPage:function(e){
    console.log(parseInt(e.target.dataset.id));
    switch (parseInt(e.target.dataset.id)) {
      case 0:
        wx.navigateTo({
          url: '/pages/about/about'
        })
        break;
      case 1:
        wx.navigateTo({
          url: '/pages/lessonList/lession?type=1'
        })
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/lessonList/lession?type=2'
        })
        break;
      case 3:
        wx.navigateTo({
          url: '/pages/author/author',
        })
        break;
      default: break;
    } 
  },
  toAbout(){

  }
})
