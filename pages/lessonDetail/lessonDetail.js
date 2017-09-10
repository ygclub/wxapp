// pages/produce/produce.js
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    active:1,
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
        that.setData({
          lesson: res.data.result
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