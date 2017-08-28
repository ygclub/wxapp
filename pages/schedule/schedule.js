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
    schoolData: [
      {
        title: "定富小学",
        id: "0"
      },
      {
        title: "朱芳村社区",
        id: "1"
      },
      {
        title: "信心",
        id: '2'
      }
    ],
    lessonData: [
      {
        title: "语文",
        id: "0"
      },
      {
        title: "数学",
        id: "1"
      },
      {
        title: "英语",
        id: '2'
      },
      {
        title: "计算机间",
        id: "3"
      },
      {
        title: "人工智能",
        id: "3"
      }
    ],
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
    this.setData({
      schoolFilter: {title:"全部项目点",id:0},
      lessonFilter: {title:"全部课程",id:0},
      intelligenFilter: this.data.intelligenData[0],
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
