//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    //贡献者数组
    userData: [
      {
        name: "蕾蕾豆",
        image: "/def-img/doudou_icon.png",
      },
      {
        name: "张韧",
        image: "/def-img/ren_icon.png",
      },
      {
        name: "小陶",
        image: "/def-img/xiaotao_icon.png",
      },
      {
        name: "90",
        image: "/def-img/90_icon.png",
      },
      {
        name: "平平",
        image: "/def-img/squirrelrao_icon.png",
      }
    ],
    //版本记录数组
    versionData: [
      {
        code: "1.0.1",
        time: "2017年9月15日",
        content: "阳光小程序1.0正式发布，包括：课程表、阳光地图、小伙伴AA、课后十分钟(还在建设中)"
      }
    ]
  },


  onLoad: function () {

  }
})
