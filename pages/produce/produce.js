// pages/produce/produce.js
var iconUrl = "../../image/map-icon.png";
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    schoolData:{},
    active:1,
    longitude:"",
    latitude:"",
    markers: [],
    polyline: [],
    controls: [],
    phone:"",
    contactor:"",
    gather_locationX:"",
    gather_locationY:"",
    school_locationX:"",
    school_locationY: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    var mapSchool = options.location.split(",");
    var mapGather = options.gather_location.split(",");
    
    // mapSchool = [40.1060400000, 116.2669400000];
    // mapGather = [40.1060400000, 116.2669400000];
    this.setData({
      schoolData: options,
      phone: options.phone,
      contactor:options.contactor,
      gather_locationX: mapGather[1]-0,
      gather_locationY: mapGather[0]-0,
      school_locationX: mapSchool[1]-0,
      school_locationY: mapSchool[0]-0
    })
    var id = options.data;
    console.log(id);
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var speed = res.speed
        var accuracy = res.accuracy
       
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          polyline: [{
            points: [{
              latitude: res.latitude,
              longitude: res.longitude,
            }, {
              latitude: mapSchool[1]-0,
              longitude: mapSchool[0]-0,
            }],
            color: "#FF0000DD",
            width: 2,
            dottedLine: true
          }],
          markers: [{
            iconPath: iconUrl,
            id: 1,
            latitude: mapSchool[1]-0,
            longitude: mapSchool[0]-0,
            width: 15,
            height: 20,
            callout: {
              content: "点我为您导航去项目点",
              borderRadius: 5,
              bgColor: "#ffffff",
              padding: 5,
              color:"#333333",
              fontSize: 13,
              display: 'ALWAYS'
            }
          }],
        })
       
        that.mapCtx = wx.createMapContext('myMap');
        wx.openLocation({
          latitude: mapSchool[1]-0,
          longitude: mapSchool[0]-0,
          scale: 28,
          name: options.title
        })
      }
    })
  
  },

  toSchool:function(e){
    var type = e.target.dataset.type -0;
    var that = this;
    if(type ==1){
      //项目点
      this.setData({
        active: 1,
        markers: [{
          iconPath: iconUrl,
          id: 1,
          latitude: this.data.school_locationX,
          longitude: this.data.school_locationY,
          width: 15,
          height: 20,
          callout: {
            content: "点我为您导航去项目点",
            borderRadius: 5,
            bgColor: "#ffffff",
            padding: 5,
            color: "#333333",
            fontSize: 13,
            padding: 5,
            display: 'ALWAYS'
          }
        }],
        polyline: [{
          points: [{
            latitude: this.data.latitude,
            longitude: this.data.longitude,
          }, {
            latitude: this.data.school_locationX,
            longitude: this.data.school_locationY,
          }],
          color: "#FF0000DD",
          width: 2,
          dottedLine: true
        }]
      })
      that.markertap({
        id :1,
      }, true);
    }else if(type ==2){
      //集合点
      this.setData({
        active: 2,
        markers: [{
          iconPath: iconUrl,
          id: 2,
          latitude: this.data.gather_locationX,
          longitude: this.data.gather_locationY,
          width: 15,
          height: 20,
          callout: {
            content: "点我为您导航去集合点",
            borderRadius: 5,
            bgColor: "#ffffff",
            padding: 5,
            color: "#333333",
            fontSize: 13,
            padding: 5,
            display: 'ALWAYS'
          }
        }],
        polyline: [{
          points: [{
            latitude: this.data.latitude,
            longitude: this.data.longitude,
          }, {
            latitude: this.data.gather_locationX,
            longitude: this.data.gather_locationY,
          }],
          color: "#FF0000DD",
          width: 2,
          dottedLine: true
        }]
      })
      that.markertap({
        id: 2,
      }, true);
    }
  },
  //点击导航
  markertap(e,type){
    var that = this;
    var id ="";
    if(type){
      id = e.id;
    }else{
      id = e.markerId;
    }
    

    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        if (id == 1) {
          wx.openLocation({
            latitude: that.data.school_locationX,
            longitude: that.data.school_locationY,
            scale: 28
          })
        } else if (id == 2) {
          wx.openLocation({
            latitude: that.data.gather_locationX,
            longitude: that.data.gather_locationY,
            scale: 28
          })
        }
      }
    })
  },
  callContactor:function(){
    var phone = this.data.phone;
    this.setData({
      active: 0,
    })
    wx.makePhoneCall({
      phoneNumber: phone 
    })
  },
  //分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '阳光地图',
      path: '/pages/coordinate/coordinate',
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
        console.log(res);
      }
    }
  }
})