//index.js
//获取应用实例
var app = getApp()
var QQMapWX = require('../../three/qqmap-wx-jssdk.js');
console.log(QQMapWX);
var iconUrl = "../../image/map-icon.png"
var qqmapsdk;
Page({
  data: {
    listDatas:[],
    markers: [],
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
   
    
  },
  onLoad: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(res);
        wx.request({
          url: getApp().data.urlDomain + 'v1/' + latitude + '&' + longitude+'/leadmap',
          success: function (res) {
            console.log(res.data.result.school);
            var mapData = res.data.result.school;
            var listDataArr = [];
            var markDataArr =[];
           
            for(var i = 0 ; i < mapData.length; i ++){
              var map = mapData[i].location.split(",");

              //假的等删除
              map= [40.1060400000, 116.2669400000];

              var objlist = {
                schoolname: mapData[i].name,
                address: mapData[i].address,
                id: i+1,
                image: mapData[i].image,
                location: mapData[i].location,
                gather_location: mapData[i].gather_location,
                dis: mapData[i].distance,
                course: mapData[i].course,
                class_weekday: mapData[i].class_weekday,
                class_time: mapData[i].class_time
              }
              var markObj={
                iconPath: iconUrl,
                id: i+1,
                latitude: map[0],
                longitude: map[1],
                width: 15,
                height: 20,
                title: mapData[i].name,
                callout: {
                  content: mapData[i].name,
                  borderRadius: 5,
                  bgColor: "#ccc",
                  padding: 5,
                  display: 'ALWAYS'
                }
              }
              console.log(map);
              listDataArr.push(objlist);
              markDataArr.push(markObj);
            }
            that.setData({
              listDatas: listDataArr,
              markers: markDataArr
            })
            console.log(that.data);
            that.mapCtx = wx.createMapContext('myMap');
          }
        
        })
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
    console.log(this.data.listDatas);
    var data = this.data.listDatas[id-1];
    console.log(data);
    wx.navigateTo({
      url: '../../pages/produce/produce?title=' + data.schoolname
      + '&course=' + data.course + '&image=' + data.image
      + '&gather_location=' + data.gather_location + '&class_weekday='
      + data.class_weekday + '&location=' + data.location
    })
    
  }
})
