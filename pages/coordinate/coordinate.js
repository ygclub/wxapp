//index.js
//获取应用实例
var app = getApp()
var QQMapWX = require('../../three/qqmap-wx-jssdk.js');
console.log(QQMapWX);
var qqmapsdk;
Page({
  data: {
    listDatas:[
      {
        schoolname:"昌平西二旗",
        address:"北京市昌平区东小口镇葫芦村",
        id:"1",
        dis:"7.8km"
      },
      {
        schoolname: "上地",
        address: "北京市昌平区东小口镇芦村",
        id: "2",
        dis: "400m"
      },
      {
        schoolname: "望京",
        address: "北京市昌平区东小口镇芦村",
        id: "4",
        dis: "12.6km"
      },
       {
        schoolname: "国贸",
        address: "北京市朝阳区东坝社区中心",
        id: "3",
        dis: "12.6km"
      }
    ],
    markers: [
      {
        iconPath: "/def-img/race-info-time.svg",
        id: 1,
        latitude: 40.0104100000, 
        longitude: 116.3503500000,
        width: 15,
        height: 20,
        title: "五道口",
        callout: { 
          content:"五道口",
          borderRadius:5,
          bgColor:"#ccc", 
          padding:5,
          display:'ALWAYS'
          }
      },
      {
        iconPath: "/def-img/race-info-time.svg",
        id: 2,
        latitude: 40.1060400000,
        longitude: 116.2669400000,
        width: 15,
        height: 20,
        title:"昌平西二旗",
        callout: {
          content: "昌平西二旗",
          borderRadius: 5,
          bgColor: "#ccc",
          padding: 5,
          display: 'ALWAYS'
        }
      },
      {
        iconPath: "/def-img/race-info-time.svg",
        id: 3,
        latitude: 39.9961200000,
        longitude: 116.4808500000,
        width: 15,
        height: 20,
        title: "望京soho",
        callout: {
          content: "望京soho",
          borderRadius:5,
          bgColor: "#ccc",
          padding: 5,
          display: 'ALWAYS'
        }
      }
    ],
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap');
    
  },
  onLoad: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(res);
      }
    })
    qqmapsdk = new QQMapWX({
      key: 'LLJBZ-KSTK6-TGPSD-EB24J-FOOAH-TABIX'
    });
    console.log(qqmapsdk);
    qqmapsdk.calculateDistance({
      to: [{
        latitude: 39.984060,
        longitude: 116.307520
      }, {
        latitude: 39.984572,
        longitude: 116.306339
      }],
      success: function (res) {
        console.log(11);
        console.log(res);
      },
      fail: function (res) {
        console.log(12);
        console.log(res);
      },
      complete: function (res) {
        console.log(13);
        console.log(res);
      }
    });
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: 39.984060,
        longitude: 116.307520
      },
      success: function (res) {
        console.log(112);
        console.log(res);
      },
      fail: function (res) {
        console.log(113);
        console.log(res);
      },
      complete: function (res) {
        console.log(114);
        console.log(res);
      }
    });
    qqmapsdk.search({
      keyword: '酒店',
      region: "北京",
      success: function (res) {
        console.log(121);
        cosole.log(11);
        console.log(res);
      },
      fail: function (res) {
        console.log(122);
        cosole.log(12);
        console.log(res);
      },
      complete: function (res) {
        cosole.log(13);
        console.log(131);
        console.log(res);
      }
    })
  },
  toModule:function(e){
    var id = e.markerId;
    if(!id){
      id = e.target.dataset.tab;
    }
    console.log(id);
    wx.navigateTo({
      url: '../../pages/produce/produce?data='+id
    })
    
  }
})
