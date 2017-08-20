//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    hometab:[
      {
        image:"../../image/after-class-icon.png",
        title:"课后十分钟",
        toPage:"0"
      },
      {
        image: "../../image/coordinate-icon.png",
        title: "阳光地图",
        toPage: "1"
      },
      {
        image: "../../image/calculator-icon.png",
        title: "小伙伴AA", 
        toPage: "2"
      },
      {
        image: "../../image/schedule-icon.png",
        title: "课程表",
        toPage: "3"
      }
    ]
  },
  //事件处理函数
  toModule:function(e){
    console.log(e.target.dataset.tab);
    console.log(e);
    switch (parseInt(e.target.dataset.tab)) {
      case 0: 
        wx.navigateTo({
          url: '../../pages/afterClass/afterClass'
        })
       break;
      case 1:
        wx.navigateTo({
          url: '../../pages/coordinate/coordinate'
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../../pages/calculator/calculator'
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../../pages/schedule/schedule'
        })
        break;
      default :  break; 
} 
  },
  onLoad: function () {
    
  }
})