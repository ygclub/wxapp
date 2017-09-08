//index.js
//获取应用实例
Page({
  data: { 
    inputFalg:true,
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
    lesson_arrow:"../../image/icon-down.png",
    school_arrow: "../../image/icon-down.png",
    intelligen_arrow: "../../image/icon-down.png",
    bgdisplayclass: ".school-list .hidebg",
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
      lesson_arrow: "../../image/icon-down.png",
      school_arrow: "../../image/icon-down.png",
      intelligen_arrow: "../../image/icon-down.png"
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
        if (this.data.schoolFlag) {
          this.setData({
            schoolFlag: false,
            bgdisplayclass: "hidebg",
            lesson_arrow: "../../image/icon-down.png",
            school_arrow: "../../image/icon-down.png",
            intelligen_arrow: "../../image/icon-down.png",
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
          bgdisplayclass: "displaybg",
          lesson_arrow: "../../image/icon-down.png",
          school_arrow: "../../image/icon-up.png",
          intelligen_arrow: "../../image/icon-down.png",
          schoolData:itemDatas,
          dataType:1
        })
        break;
      case 2:
        if (this.data.lessonFlag) {
          this.setData({
            lessonFlag: false,
            bgdisplayclass: "hidebg",
            lesson_arrow: "../../image/icon-down.png",
            school_arrow: "../../image/icon-down.png",
            intelligen_arrow: "../../image/icon-down.png",
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
          bgdisplayclass: "displaybg",
          lesson_arrow: "../../image/icon-up.png",
          school_arrow: "../../image/icon-up.png",
          intelligen_arrow: "../../image/icon-down.png",
          lessonData:itemDatas,
          dataType:2
        })
        break;
      case 3:
        if (this.data.intelligenFlag) {
          this.setData({
            intelligenFlag: false,
            bgdisplayclass: "hidebg",
            lesson_arrow: "../../image/icon-down.png",
            school_arrow: "../../image/icon-up.png",
            intelligen_arrow: "../../image/icon-down.png",
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
          bgdisplayclass: "displaybg",
          lesson_arrow: "../../image/icon-down.png",
          school_arrow: "../../image/icon-up.png",
          intelligen_arrow: "../../image/icon-up.png",
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
       bgdisplayclass: "hidebg",
       lesson_arrow: "../../image/icon-down.png",
       school_arrow: "../../image/icon-down.png",
       intelligen_arrow: "../../image/icon-down.png",
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
   },
   query_schedule:function(){
     var that = this;
     var school_condition = this.data.schoolFilter.title.indexOf("全部") != -1 ? "all" : this.data.schoolFilter.title;
     var lesson_condition = this.data.lessonFilter.title.indexOf("全部") != -1 ? "all" : this.data.lessonFilter.title;
     wx.request({
       url: getApp().data.urlDomain + '/v1/query_class_schedule',
       method: "post",
       header: {
         "Content-Type": "application/x-www-form-urlencoded"
       },
       data: json2Form({ "school": school_condition, "course": lesson_condition, "keyword": "none", "sort": this.data.intelligenFilter.id}),
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
   }
})
function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}
