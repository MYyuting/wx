// pages/public/consultDetails/consultDetails.js
var config = require("../../../utils/config.js")
Page({

    data: {
        informationId:'',
        consultDetails:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            informationId:options.consultId
        })
        this.getconsult()
    },
    // 获取咨询详情
    getconsult(){
        var that = this;
        wx.request({
            url: config.serverUrl + '/homePage/getInformationDetail',
            method: "POST",
            data:{
                infoId: that.data.informationId
            },
            header: { 'content-type': 'application/x-www-form-urlencoded',},
            success(res) {
                console.log(res)
                if (res.data.code == 0) {
                    that.setData({
                        consultDetails: res.data.data
                    })
                }else if(res.data.code == 6){
                    wx.showToast({
                        title: '请求系统异常',
                    })
                }
            }
        })
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

    }
})