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

            qqmapsdk = new QQMapWX({
              key: key
            });
            var dis = "";
            for(var i = 0 ; i < mapData.length; i ++){
              var map = mapData[i].location.split(",");
              var mapObj = mapData[i];
              // latitude = 40.094891;
              // longitude = 116.293844;
              dis = "";

              var objlist = {
                schoolname: mapObj.name,
                address: mapObj.address,
                id: i + 1,
                image: mapObj.image,
                location: mapObj.location,
                gather_location: mapObj.gather_location,
                dis: dis,
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
                  bgColor: "#ccc",
                  padding: 5,
                  display: 'ALWAYS'
                }
              }

              listDataArr.push(objlist);
              markDataArr.push(markObj);

              that.setData({
                listDatas: listDataArr,
                markers: markDataArr,
                latitude: latitude,
                longitude: longitude
              })

              that.mapCtx = wx.createMapContext('myMap');



              // wx.request({
              //   url: 'https://apis.map.qq.com/ws/distance/v1/?mode=walking&from='
              //   + latitude + ',' + longitude
              //   + '&to='+ map[1] + ','+ map[0] 
              //   + '&key=' + key,
              //   success: function (res) {
                 
              //   },
              //   fail:function(){
              //     dis=">=10KM";
              //   },
              //   complete:function(res){
              //     if (res.data.status == 0) {
              //       console.log(res.data.result);
              //       var disArr = res.data.result.elements;
              //       for (var i = 0; i < disArr.length; i++) {
              //         var str = disArr[i].distance
              //         if(str/1000>1){
              //           dis = (str / 1000).toFixed(2)  +"Km"
              //         }else {
              //           dis = str.toFixed(2) + "m"
              //         }
              //       }
              //     } else {
              //       dis = ">10KM";
              //     }
              //     var req = set(mapObj, map, i, dis);
              //     listDataArr.push(req.objlist);
              //     markDataArr.push(req.markObj);

              //     that.setData({
              //       listDatas: listDataArr,
              //       markers: markDataArr,
              //       latitude: latitude,
              //       longitude: longitude
              //     })

              //     that.mapCtx = wx.createMapContext('myMap');
              //   }
              // })
            }
           
           

            function set(obj, mapArr, i, disLength) {
              console.log(obj);
              var objlist = {
                schoolname: obj.name,
                address: obj.address,
                id: i + 1,
                image: obj.image,
                location: obj.location,
                gather_location: obj.gather_location,
                dis: disLength,
                course: obj.course,
                class_weekday: obj.class_weekday,
                class_time: obj.class_time
              }
              var markObj = {
                iconPath: iconUrl,
                id: i + 1,
                latitude: mapArr[1] - 0,
                longitude: mapArr[0] - 0,
                width: 15,
                height: 20,
                title: obj.name,
                callout: {
                  content: obj.name,
                  borderRadius: 5,
                  bgColor: "#ccc",
                  padding: 5,
                  display: 'ALWAYS'
                }
              }
              console.log(dis);

              return {
                objlist: objlist,
                markObj: markObj
              }
            }
          }
        })
      }
    })
  },

  speed(start,end,q){
    console.log(start);
    console.log(end);
 
    wx.request({
      url: 'https://apis.map.qq.com/ws/distance/v1/?mode=walking&from='
      + start.s + ',' + start.e
      +'&to=' + end.s+','
      + end.e +'&key=' + key,
      success:function(res){
        console.log(res.data);
      }
    })





    q.calculateDistance({
      mode:"driving",
      form:[{
        latitude: start.s,
        longitude:start.e
      }],
      to: [{
        latitude: end.s,
        longitude: end.e
      }],
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
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
      + data.class_weekday + '&location=' + data.location
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
