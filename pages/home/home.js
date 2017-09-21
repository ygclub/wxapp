//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    defUrl: getApp().data.urlDomain,
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 100,
    circular:true,
    hometab:[
      {
        image: "/image/calculator-icon.png",
        title: "小伙伴AA",
        toPage: "2"
      },
      {
        image: "/image/coordinate-icon.png",
        title: "阳光地图",
        toPage: "1"
      },
      {
        image: "/image/schedule-icon.png",
        title: "课程表",
        toPage: "3"
      }, {
        image: "/image/after-class-icon.png",
        title: "课后十分钟",
        toPage: "0"
      }
    ]
  },

  //banner 点击跳转
  bannerDirectTo:function(e){

    var link = e.target.dataset.link;
    if(link == "home"){
      return;
    }
    wx.navigateTo({
      url: link
    })
  },

  //事件处理函数
  toModule:function(e){
    switch (parseInt(e.target.dataset.tab)) {
      case 0: 
        wx.navigateTo({
          url: '/pages/afterClass/afterClass'
        })
       break;
      case 1:
        wx.navigateTo({
          url: '/pages/coordinate/coordinate'
        })
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/calculator/calculator'
        })
        break;
      case 3:
        wx.navigateTo({
          url: '/pages/schedule/schedule'
        })
        break;
      default :  break; 
} 
  },
  //分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '阳光小程序',
      path: '/pages/home/home',
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
        console.log(res);
      }
    }
  },
  onLoad: function () {
     var that = this;
    //request swiper
    wx.request({
      url: getApp().data.urlDomain +'v1/banner',
      success:function(res){
        
        var swiperData = res.data.result.banner;
       
        var swiperArr = [];
        for(var i = 0 ;i<swiperData.length;i++){
          swiperArr.push({ "image": swiperData[i].image, "link": swiperData[i].link});
        }
       
        that.setData({
          imgUrls: swiperArr
        })
        
      }
    })


     //request news
     wx.request({
       url: getApp().data.urlDomain+'/v1/news',
       success:function(res){
       
        var newsArray = res.data.result.news
        var newRes = []
        for(var i = 0; i < newsArray.length; i++){
          var content = newsArray[i].content;
          var newType = newsArray[i].type;
          console.log("content:"+content)
          var item = { url: "#", news: content, newType: newType};
          newRes.push(item);
       }
       that.setData({
         newList: newRes
       });
     }
       
     })
  }
})
