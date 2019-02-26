// pages/connection/myFriends/myFriends.js
let WebIM = require("../../../utils/WebIM")["default"];
let disp = require("../../../utils/broadcast");
var config = require("../../../utils/config")
Page({
    data: {
        member:[],
    },
    into_chatRoom: function (event) {
        console.log(event)
        var my = wx.getStorageSync("myUsername");
        var nameList = {
            myName: my,
            your: event.currentTarget.dataset.username,
            yourN: event.currentTarget.dataset.usern
        };
        wx.navigateTo({
            url: "../../public/chat/chat?username=" + JSON.stringify(nameList)
        });
    },
    onLoad: function (options) {
        this.getFriends()
    },
    // 获取好友列表
    getFriends(){
        var that = this;
        wx.request({
            url: config.serverUrl +'/ctct/getFriends',
            method:"GET",
            header: { 
                // "content-type": "application/x-www-form-urlencoded",
                "token":wx.getStorageSync("token")
            },
            success(res){
                console.log(res);
                if(res.data.code == 0){
                    that.setData({
                        member:res.data.data
                    })
                }
            },
            fail(){

            },
            complete(){

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