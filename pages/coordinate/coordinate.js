//index.js
//获取应用实例
var app = getApp()
var QQMapWX = require('../../three/qqmap-wx-jssdk.js');
var key = "LLJBZ-KSTK6-TGPSD-EB24J-FOOAH-TABIX"
console.log(QQMapWX);
var iconUrl = "/image/map-icon.png"
var qqmapsdk;
Page({
  data: {
    listDatas:[],
    markers: [],
    latitude:0,
    longitude:0,
  },
  onReady: function (e) {
    
  },
  onLoad: function () {
    var that = this;
  
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        
        wx.request({
          url: getApp().data.urlDomain + 'v1/' + latitude + '&' + longitude+'/leadmap',
          success: function (res) {

            var mapData = res.data.result.school;
            var listDataArr = [];
            var markDataArr =[];
            var leader_phone = res.data.result.phone;

            qqmapsdk = new QQMapWX({
              key: key
            });
            var dis = "";
            var arr = {}
            for(var i = 0 ; i < mapData.length; i ++){
              var map = mapData[i].location.split(",");
              var mapObj = mapData[i];
              // latitude = 40.106039;
              // longitude = 116.267228;
              console.log(map);
              
              dis = "";
              arr = {
                latitude: map[1] - 0,
                longitude: map[0] - 0,
              }

              var objlist = {
                schoolname: mapObj.name,
                address: mapObj.address,
                id: i + 1,
                image: mapObj.image,
                location: mapObj.location,
                phone:mapObj.phone,
                contactor: mapObj.contactor,
                class_time:mapObj.class_time,
                gather_location: mapObj.gather_location,
                dis: "计算中...",
                course: mapObj.course,
                class_weekday: mapObj.class_weekday,
                class_time: mapObj.class_time
              }
              var markObj = {
                iconPath: iconUrl,
                id: i + 1,
                latitude: map[1] - 0,
                longitude: map[0] - 0,
                width: 15,
                height: 20,
                title: mapObj.name,
                callout: {
                  content: mapObj.name,
                  borderRadius: 5,
                  bgColor: "#d3d3d3",
                  padding: 5,
                  color: "#333333",
                  padding: 5,
                  fontSize:13,
                  display: 'ALWAYS'
                }
              }
              listDataArr.push(objlist);
              markDataArr.push(markObj);
              that.speed({
                s: latitude,
                e: longitude
              }, arr, qqmapsdk,i);
            }
          
            that.setData({
              listDatas: listDataArr,
              markers: markDataArr,
              latitude: latitude,
              longitude: longitude,
              phone:leader_phone
            })
            that.mapCtx = wx.createMapContext('myMap');
          }
        })
      }
    })
  },

  speed(start,end,q,i){

    var that = this;
    var dis ="";
    q.calculateDistance({
      mode:"walking",
      from:{
        latitude: start.s,
        longitude:start.e
      },
      to:[end],
      complete: function (res) {
        console.log(res);
        var getArr = that.data.listDatas;
        if (res.status == 0 ){
          console.log(res.result.elements);
          dis = res.result.elements[0].distance;
          if(dis/1000>=1){
            dis = (dis / 1000).toFixed(2) +"Km";
          }else {
            dis = dis +"m";
          }
        }else{
          dis = "大于10Km"
        }
       
        getArr[i].dis = dis;
        that.setData({
          listDatas: getArr
        })
      }
    });
  },

  //跳转项目点
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
      url: '/pages/produce/produce?title=' + data.schoolname
      + '&course=' + data.course + '&image=' + data.image
      + '&gather_location=' + data.gather_location + '&class_weekday='
      + data.class_weekday + '&location=' + data.location + '&phone=' + data.phone + '&contactor=' + data.contactor + '&class_time=' + data.class_time
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
