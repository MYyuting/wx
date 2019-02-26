// pages/public/datum1/datum1.js
var config = require("../../../utils/config.js")
Page({

    data: {
        dataMsg:{},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            
        })
        this.getTaMsg();
    },

    getTaMsg(){
        var that = this;
        wx.request({
            url: config.serverUrl + '/cen/getUserInfo',
            data:{
                userId:'',
            },
            header: { 
                'token' : wx.getStorageSync("token")
            },
            method:"GET",
            success(res){
                console.log(res);
                if(res.data.code == 0){
                    that.setData({
                        dataMsg: res.data.data
                    })
                }else{
                    wx.showToast({
                        title: '网络错误',
                    })
                }
            },
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