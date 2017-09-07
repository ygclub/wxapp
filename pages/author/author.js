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
        name: "Test",
        image: "../../def-img/xboy.png",
      },
      {
        name: "toudadadadasdadadadadad",
        image: "../../def-img/xboy.png",
      },
      {
        name: "toudadadadasdadadadadad",
        image: "../../def-img/xboy.png",
      },
      {
        name: "toudadadadasdadadadadad",
        image: "../../def-img/xboy.png",
      },
      {
        name: "toudadadadasdadadadadad",
        image: "../../def-img/xboy.png",
      },
      {
        name: "toudadadadasdadadadadad",
        image: "../../def-img/xboy.png",
      }
    ],
    //版本记录数组
    versionData: [
      {
        code: "V1.0.1",
        time: "2017年2月13日",
        content: "1.登录页面优化 2.付款人bugx修复 3.增加条目z以后修改人员"
      },
      {
        code: "V1.0.2",
        time: "2017年3月13日",
        content: "1.登录页面优化 2.付款人bugx修复 3.增加条目z以后修改人员"
      },
      {
        code: "V1.0.3",
        time: "2017年4月2日",
        content: "1.登录页面优化 2.付款人bugx修复 3.增加条目z以后修改人员"
      }
    ]
  },


  onLoad: function () {

  }
})
