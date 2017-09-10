// pages/produce/produce.js
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    active:2,
    classId:"",
    lesson:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    this.setData({
      classId: options.id
    })

    console.log(this.data.classId);
    var info = this.data.classId.split("_");
    //request news
    wx.request({
      url: getApp().data.urlDomain + '/v1/query_class_detail',
      method:"post",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: json2Form({ "school": info[1], "class_name": info[2], "semester": info[0], "class_number": info[3] }),
      success: function (res) {
        
        console.log(res.data.result.plan.content);
        if (res.data.result.plan.content == ""){
          res.data.result.plan.content = "<p>主讲还未发布课程提纲</p>";
        }else{
          res.data.result.plan.content = "<p><h3>提纲:</h3></p>" + res.data.result.plan.content;
        }
        that.setData({
          lesson: res.data.result
        });
      }

    })
  },
  toAfterClass:function(){
    wx.showModal({
      title: 'LEAD阳光提示',
      content: '课后十分钟暂未开放，请耐心等待 ：）',
      confirmText:"知道了",
      cancelText:"好的",
      success: function (res) {
      }
    })  
  },
  copy_plan:function(){
    var that = this;
    if (that.data.lesson.plan.content == "<p>主讲还未发布课程提纲</p>"){
      wx.showToast({
        title: '没有提纲发布',
        icon: 'failed',
        duration: 2000
      });
      return; 
    }
    wx.setClipboardData({
      data: that.data.lesson.plan.content,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            //  
            wx.showToast({
              title: '提纲复制成功',
              icon: 'success',
              duration: 2000
            }) 
          }
        })
      }
    })
  },//分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '阳光小程序',
      path: '/pages/lessonDetail/lessonDetail',
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
function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}