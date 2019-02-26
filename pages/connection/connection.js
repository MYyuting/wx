// pages/connection/connection.js
const app = getApp();
let WebIM = require("../../utils/WebIM")["default"];
let disp = require("../../utils/broadcast");
var config = require("../../utils/config");
let systemReady = false;
Page({
    data: {
        nvabarData: {
            showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
            title: '人脉', //导航栏 中间的标题
        },
        height: app.globalData.height * 2 + 22,
        messageNum: "",  //新申请量
        myName:"",  
        token:"",
        recomList:"", //推荐列表
        userType: '0',  //：0普通用户、1认证用户、2VIP、3合作伙伴
    },
    sosClick(){
        wx.navigateTo({
            url: '../public/search/search',
        })
    },
    // 点击事件
    myFriends(){
        wx.navigateTo({
            url: 'myFriends/myFriends',
        })
    },
    newFriends(){
        wx.navigateTo({
            url: 'newFriends/newFriends?myName=' + this.data.myName,
        })
    },
    inviteClick(){
        wx.navigateTo({
            url: 'invite/invite',
        })
    },
    // 点击发消息
    sendchat(event) {
        if(this.data.userType == 0){
            wx.showToast({
                title: '暂未认证，不支持聊天',
                icon:'none'
            })
            return;
        } else if (this.data.userType == 1){
            wx.showToast({
                title: '该功能需升级VIP',
                icon: 'none'
            })
            return;
        }
        var my = wx.getStorageSync("myUsername");
        var nameList = {
            myName: my,
            your: event.currentTarget.dataset.username,
            yourN: event.currentTarget.dataset.usern
        };
        wx.navigateTo({
            url: "../public/chat/chat?username=" + JSON.stringify(nameList)
        });
    },
    tribe(){
        wx.navigateTo({
            url: 'tribe/tribe?myName=' + wx.getStorageSync("myUsername"),
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var me = this;
        this.setData({
            myName: wx.getStorageSync("myUsername"),
            token: wx.getStorageSync("token"),
            userType: wx.getStorageSync("userInfo").userType
        });
        this.getMsg();
    },
    // 请求数据人脉home
    getMsg(){
        var that = this ;
        wx.request({
            url: config.serverUrl + "/ctct/getIndex",
            data: {
                token: this.data.token
            },
            // header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'GET',
            success(res){
                console.log(res);
                if(res.data.code == 0){
                    that.setData({
                        recomList:res.data.data.hot.vip,
                        messageNum: res.data.data.newFriends
                    })
                }
            },
            fail(){

            },
            complete: function () {
                
            },
        })
    },
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.setData({
            messageNum: getApp().globalData.saveFriendList.length,
        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})