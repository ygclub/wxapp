//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 100,
    circular:true,
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
     var that = this;
     //request news
     wx.request({
       url: 'https://squirrelrao.com/v1/news',
       success:function(res){
        console.log(res.data);
        var newsArray = res.data.result.news
        var newRes = []
        for(var i = 0; i < newsArray.length; i++){
          var content = newsArray[i].content;
          var item = {url:"#",news:content};
          newRes.push(item);
       }
       that.setData({
         newList: newRes
       });
     }
       
     })

     //request banners
  }
})
