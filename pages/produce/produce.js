// pages/produce/produce.js
var iconUrl = "../../image/map-icon.png";
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    active:1,
    longitude:"",
    latitude:"",
    markers: [{
      iconPath: iconUrl,
      id: 0,
      latitude: 40.0104100000,
      longitude: 116.3503500000,
      width: 15,
      height: 20,
    }],
    polyline: [{
      points: [{
        latitude: 39.9961200000,
        longitude: 116.4808500000,
      }, {
        latitude: 40.0104100000,
        longitude: 116.3503500000,
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: "/def-img/race-info-time.svg",
      position: {
        left: 0,
        top: 300 - 50,
        width: 15,
        height: 20,
      },
      clickable: true
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var id = options.data;
    console.log(id);
    this.setData({
      latitude: 40.0104100000,
      longitude: 116.3503500000,
    })
  
    // wx.chooseLocation({
    //   success:function(res){
    //     console.log(res);
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  toSchool:function(e){
    var type = e.target.dataset.type -0;
    console.log(type);
    if(type ==1){
      this.setData({
        active: 1
      })
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          wx.openLocation({
            latitude: 40.0104100000,
            longitude: 116.3503500000,
            scale: 28
          })
        }
      })
    }else if(type ==2){
      this.setData({
        active: 2
      })
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          wx.openLocation({
            latitude: 40.0104100000,
            longitude: 116.3503500000,
            scale: 28
          })
        }
      })
    }
  }
})