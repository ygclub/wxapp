//index.js
//获取应用实例
Page({
  data: {
    result: true,
    sumbitStyle: {},
    money:{
      people:"",
      student:""
    },
    sumbitData:[
      {
        title:"计算AA金额",
        style:"defult",
        status:"0",
        type:"submit"
      },
      {
        title: "计算AA金额",
        style: "isCalculator",
        status: "0",
        type: "submit"
      },
      {
        title: "重新计算",
        style: "isCalculator",
        status: "1",
        type: "reset"
      }
    ]
  },
  onLoad: function (options) {
    this.setData({
      sumbitStyle : this.data.sumbitData[0]
    })
  },
  onShow: function () {
   
  },
  flagMoney:false,
  flagPeople:false,
  bindconfirm:function(e){
    if (e.target.id =="money")
    {
      if(e.detail)
      {
        this.flagMoney = true;
      }else{
        this.flagMoney = false;
      }
      this.buttonStyle();
    } else if (e.target.id ="allpeople")
    {
      if (e.detail)
       {
        this.flagPeople = true;
      }else{
        this.flagPeople = false;
      }
      this.buttonStyle();
    }
  },
  buttonStyle:function(){
    if (this.flagMoney == true && this.flagPeople == true)
    {
      this.setData({
        sumbitStyle: this.data.sumbitData[1],
        result: true
      })
    }else{
      this.setData({
        sumbitStyle: this.data.sumbitData[0],
        result: true
      })
    }
  },
  formReset:function(e){
    this.setData({
      sumbitStyle: this.data.sumbitData[0],
      result: true
    })
    this.flagMoney=false;
    this.flagPeople=false;
  },
  formSubmit:function(e){
    if (this.data.sumbitStyle.status==1)
    {
      this.formReset(e);
    }else{
      var money = e.detail.value.money;
      var people = e.detail.value.allpeople;
      var student = e.detail.value.student || 0;
      if (parseInt(student)>=parseInt(people))
      {
        wx.showModal({
          title: '阳光提示',
          content: '这次学生太多了，就不半价了',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return false;
      }
      if (money && people) 
      {
        var n = parseInt(people)-parseInt(student)+student/2;
        var avg = (money/n).toFixed(1);
        var floatAvg = parseInt( avg * 10 % 10);
        
        if(floatAvg <= 3){
          avg = avg - floatAvg * 0.1;
        }else if(floatAvg == 5 || floatAvg > 3){
          avg = avg - floatAvg * 0.1 + 0.5;
        }else{
          avg = avg - floatAvg * 0.1 + 1;
        }
        console.log(floatAvg + " - " + avg);
        var studentAvg = student == 0 ? 0 :(avg/2).toFixed(1);
        var floatStdAvg = parseInt( studentAvg * 10 % 10);
        console.log(floatStdAvg);
        if (floatStdAvg <= 3) {
          studentAvg = studentAvg - floatStdAvg * 0.1;
        } else if (floatStdAvg == 5 || floatStdAvg > 3) {
          studentAvg = studentAvg - floatStdAvg * 0.1 + 0.5;
        } else {
          studentAvg = studentAvg - floatStdAvg * 0.1 + 1;
        }
        console.log(floatStdAvg + " - " + studentAvg);
 
        this.setData({
          money: {
            people: avg.toFixed(2),
            student: studentAvg.toFixed(2)
          },
          sumbitStyle: this.data.sumbitData[2],
          result: false
        })
      }
    }
  },
  onShareAppMessage: function () {
    return {
      title: '本次聚餐金额',
      path: '/page/user?id=123'
    }
  }
})

