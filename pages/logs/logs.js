//logs.js

Page({
  data: {
    imgSrc:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503247087783&di=e2423e4f765bf38b3d4040862f064e65&imgtype=0&src=http%3A%2F%2Fp4.qqgexing.com%2Ftouxiang%2F20120810%2F1502%2F5024b21b74511.jpg"
  },
  onLoad: function () {
    
  },
  toPage:function(e){
    console.log(e);
    switch (parseInt(e.target.dataset.id)) {
      case 0:
        wx.navigateTo({
          url: '../../pages/about/about'
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
      default: break;
    } 
  },
  toAbout(){

  }
})
