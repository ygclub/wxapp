//index.js
//获取应用实例
Page({
  data: { 
    inputFalg:true,
    intelligenData:[
      {
        title:"智能排序",
        id:"-1"
      },
      {
        title: "按课程",
        id: "1"
      },
      {
        title: "按项目点",
        id:'2'
      },
      {
        title: "按开课时间",
        id:"3"
      }
    ],
    schoolData: [],
    lessonData: [],
    schoolFilter:"",
    lessonFilter:"",
    intelligenFilter:"",
    schoolFlag: false,
    lessonFlag: false,
    intelligenFlag: false,
    dataType:1
  },
  //事件处理函数
  onShow: function () {

  },
  onLoad: function () {

    var that = this;

    //query schools
    wx.request({
      url: getApp().data.urlDomain+'/v1/school',
      success:function(res){
        var schools = res.data.result.school;
        var schoolDataRes = [{"title":"全部项目点","id":0}]
        for(var i = 0; i < schools.length; i++){
           var school = {"title":schools[i].name,"id":i};
           schoolDataRes.push(school);
        }
        that.setData({
          schoolData: schoolDataRes
        });
      }
    });

    //query coures
    wx.request({
      url: getApp().data.urlDomain + '/v1/course',
      success: function (res) {
        var courses = res.data.result.course;
        var courseDataRes = [{"title":"全部课程","id":0}]
        for (var i = 0; i < courses.length; i++) {
          var course = { "title": courses[i].name, "id": i+1 };
          courseDataRes.push(course);
        }
        that.setData({
          lessonData: courseDataRes
        });
      }
    });

    //set init data
    this.setData({
      schoolFilter: {title:"全部项目点",id:0},
      lessonFilter: {title:"全部课程",id:0},
      intelligenFilter: this.data.intelligenData[0],
    })

    //query schedule  by default
    wx.request({
      url: getApp().data.urlDomain +'/v1/query_class_schedule',
      method:"post",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: json2Form({"school":"all","course":"all","keyword":"none","sort":-1}),
      success:function(res){

        var schedules = res.data.result.schedule;
        var resArray = []
        for(var i = 0; i < schedules.length; i++){

          var item = schedules[i];
          item.image = getApp().data.urlDomain+item.image;
          resArray.push(item);
        }
        that.setData({

          schedule_list: resArray

        });

      }
    })

  },
  filterList:function(e){
    console.log(e)
    var type = e.target.dataset.type;
    console.log(type);
    switch(type-0){
      case 1:
        this.setData({
          schoolFlag: true,
          lessonFlag: false,
          intelligenFlag: false,
          dataType:1
        })
        break;
      case 2:
        this.setData({
          schoolFlag:false,
          lessonFlag: true,
          intelligenFlag: false,
          dataType:2
        })
        break;
      case 3:
        this.setData({
          schoolFlag: false,
          lessonFlag: false,
          intelligenFlag: true,
          dataType:3
        })
        break;
    }
  },
   lessonList:function(e){
     var data = e.target.dataset.index;
     console.log(data);
     var type = this.data.dataType;
     console.log(type);
     switch (type - 0) {
       case 1:
         this.setData({
           schoolFilter: data,
         })
         break;
       case 2:
         this.setData({
           lessonFilter: data,
         })
         break;
       case 3:
         this.setData({
           intelligenFilter: data,
         })
         break;
     }
     this.setData({
       schoolFlag: false,
       lessonFlag: false,
       intelligenFlag: false
     })
   },
   toucheInput:function(){
     this.setData({
       inputFalg: false
     })
   },
   toucheInputCanel:function(){
     this.setData({
       inputFalg: true
     })
   }
})
function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}
