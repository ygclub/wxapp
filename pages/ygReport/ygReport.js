// pages/ygReport/ygReport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    return {
      title: '阳光公益报告',
      path: '/pages/ygReport/ygReport',
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

  clickButton:function(){

    console.log("save");
    var obj = wx.createCanvasContext("test_canvas");
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 750,
      height: 1134,
      destWidth: 750,
      destHeight: 1134,
      canvasId: 'test_canvas',
      fail:function(res){
        console.log("fail");
      },
      success: function (res) {
        console.log(res.tempFilePath)
        console.log("success");
      }
    })
  }
})