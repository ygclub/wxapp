//index.js
//获取应用实例

var app = getApp();
var imgDown = "/image/icon-down.png";
var imgUp = "/image/icon-up.png";
Page({
  data: { 
    inputFalg:true,
    ifScroll:true,
    intelligenData:[
      {
        title:"智能排序",
        id:"-1",
        classname:"choose"
      },
      {
        title: "按课程",
        id: "1",
        classname: "default"
      },
      {
        title: "按项目点",
        id:'2',
        classname: "default"
      },
      {
        title: "按开课时间",
        id:"3",
        classname: "default"
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
    school_filter_touch:false,
    lesson_filter_touch:false,
    intelligen_filter_touch:false,
    lesson_arrow: imgDown,
    school_arrow: imgDown,
    intelligen_arrow: imgDown,
    bgdisplayclass: ".school-list .hidebg",
    ifScroll:true,
    dataType:1,
    search_key:"none",
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
        var schoolDataRes = [{ "title": "全部项目点", "id": 0, "classname":"choose"}]
        for(var i = 0; i < schools.length; i++){
          var school = { "title": schools[i].name, "id": i, "classname":"default"};
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
        var courseDataRes = [{ "title": "全部课程", "id": 0, "classname":"choose"}]
        for (var i = 0; i < courses.length; i++) {
          var course = { "title": courses[i].name, "id": i + 1, "classname":"default"};
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
      lesson_arrow: imgDown,
      school_arrow: imgDown,
      intelligen_arrow: imgDown
    })

    //query schedule  by default
    wx.request({
      url: getApp().data.urlDomain +'/v1/query_class_schedule',
      method:"post",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: app.json2Form({"school":"all","course":"all","keyword":"none","sort":-1}),
      success:function(res){

        var schedules = res.data.result.schedule;
        var resArray = []
        for(var i = 0; i < schedules.length; i++){

          var item = schedules[i];
          resArray.push(item);
        }
        that.setData({

          schedule_list: resArray

        });

      }
    })

  },
  //分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '阳光课程表',
      path: '/pages/schedule/schedule',
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
  filterList:function(e){
    console.log(e)
    var type = e.target.dataset.type;
    console.log(type);
    switch(type-0){
      case 1:
        if (this.data.schoolFlag) {
          this.setData({
            schoolFlag: false,
            school_filter_touch: false,
            bgdisplayclass: "hidebg",
            ifScroll:false,
            lesson_arrow: imgDown,
            school_arrow: imgDown,
            intelligen_arrow: imgDown,
          })
          return;
        }
        console.log(this.data.schoolFilter.title);
        var itemDatas = []
        for (var i = 0; i < this.data.schoolData.length;i++){
          var item = this.data.schoolData[i];
          console.log(this.data.schoolFilter.title+"- this.data.schoolData[i].classname=" + this.data.schoolData[i].title);
          if (this.data.schoolFilter.title == this.data.schoolData[i].title){
            item.classname ="choose";
          }else{
            item.classname = "default";
          }
          itemDatas.push(item);
        }
        console.log(itemDatas);

        this.setData({
          schoolFlag: true,
          lessonFlag: false,
          intelligenFlag: false,
          school_filter_touch: true,
          lesson_filter_touch: false,
          intelligen_filter_touch: false,
          bgdisplayclass: "displaybg",
          ifScroll:false,
          lesson_arrow: imgDown,
          school_arrow: imgUp,
          intelligen_arrow: imgDown,
          schoolData:itemDatas,
          dataType:1
        })
        break;
      case 2:
        if (this.data.lessonFlag) {
          this.setData({
            lessonFlag: false,
            lesson_filter_touch: false,
            bgdisplayclass: "hidebg",
            ifScroll:true,
            lesson_arrow: imgDown,
            school_arrow: imgDown,
            intelligen_arrow: imgDown,
          })
          return;
        }
        var itemDatas = []
        for (var i = 0; i < this.data.lessonData.length; i++) {
          var item = this.data.lessonData[i];
          console.log(this.data.lessonFilter.title + "- this.data.lessonData[i].classname=" + this.data.lessonData[i].title);
          if (this.data.lessonFilter.title == this.data.lessonData[i].title) {
            item.classname ="choose";
          } else {
            item.classname ="default";
          }
          itemDatas.push(item);
        }
        console.log(itemDatas);

        this.setData({
          schoolFlag:false,
          lessonFlag: true,
          intelligenFlag: false,
          school_filter_touch: false,
          lesson_filter_touch: true,
          intelligen_filter_touch: false,
          bgdisplayclass: "displaybg",
          ifScroll:false,
          lesson_arrow: imgUp,
          school_arrow: imgDown,
          intelligen_arrow: imgDown,
          lessonData:itemDatas,
          dataType:2
        })
        break;
      case 3:
        if (this.data.intelligenFlag) {
          this.setData({
            intelligenFlag: false,
            intelligen_filter_touch: false,
            bgdisplayclass: "hidebg",
            ifScroll:true,
            lesson_arrow: imgDown,
            school_arrow: imgDown,
            intelligen_arrow: imgDown,
          })
          return;
        }
        var itemDatas = []
        for (var i = 0; i < this.data.intelligenData.length; i++) {
          var item = this.data.intelligenData[i];
          console.log(this.data.intelligenFilter.title + "- this.data.intelligenData[i].classname=" + this.data.intelligenData[i].title);
          if (this.data.intelligenFilter.title == this.data.intelligenData[i].title) {
            item.classname = "choose";
          } else {
            item.classname = "default";
          }
          itemDatas.push(item);
        }
        console.log(itemDatas);

        this.setData({
          schoolFlag: false,
          lessonFlag: false,
          intelligenFlag: true,
          school_filter_touch: false,
          lesson_filter_touch: false,
          intelligen_filter_touch: true,
          bgdisplayclass: "displaybg",
          ifScroll:false,
          lesson_arrow: imgDown,
          school_arrow: imgDown,
          intelligen_arrow: imgUp,
          intelligenData:itemDatas,
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
     switch (type) {
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
     this.query_schedule();
     this.setData({
       schoolFlag: false,
       lessonFlag: false,
       intelligenFlag: false,
       school_filter_touch: false,
       lesson_filter_touch: false,
       intelligen_filter_touch: false,
       bgdisplayclass: "hidebg",
       ifScroll:true,
       lesson_arrow: imgDown,
       school_arrow: imgDown,
       intelligen_arrow: imgDown,
     })
   },
   toucheInput:function(){
     this.setData({
       inputFalg: false
     })
   },
   toucheInputCanel:function(){
     this.setData({
       inputFalg: true,
       search_key: "none"
     });
     this.query_schedule();
   },
   search_by_input:function(e){
     this.setData({
       search_key : e.detail.value
     });
     this.query_schedule();
   },
   load_more:function(){

   },
   upper_refresh:function(){
      this.query_schedule(); 
   },
   toClassDetail:function(e){
      console.log(e);
      var classId = e.currentTarget.id;//semester_school_class_classNumber
      wx.navigateTo({
        url: '/pages/lessonDetail/lessonDetail?id='+classId
      })
      

   },
   query_schedule:function(){
     var that = this;
     var school_condition = this.data.schoolFilter.title.indexOf("全部") != -1 ? "all" : this.data.schoolFilter.title;
     var lesson_condition = this.data.lessonFilter.title.indexOf("全部") != -1 ? "all" : this.data.lessonFilter.title;
     var search_key = this.data.search_key;
     wx.request({
       url: getApp().data.urlDomain + '/v1/query_class_schedule',
       method: "post",
       header: {
         "Content-Type": "application/x-www-form-urlencoded"
       },
       data: app.json2Form({ "school": school_condition, "course": lesson_condition, "keyword": search_key, "sort": this.data.intelligenFilter.id}),
       success: function (res) {
        
         var schedules = res.data.result.schedule;
         var resArray = []
         for (var i = 0; i < schedules.length; i++) {

           var item = schedules[i];
           resArray.push(item);
         }
         that.setData({

           schedule_list: resArray
         });
       }
     })
   },
   delSearc:function(e){
    console.log("删除");
    this.setData({
      search_key:"none"
    })
   }
})
// function json2Form(json) {
//   var str = [];
//   for (var p in json) {
//     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
//   }
//   return str.join("&");
// }
