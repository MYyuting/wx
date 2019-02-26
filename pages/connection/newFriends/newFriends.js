// pages/connection/newFriends/newFriends.js
var WebIM = require("../../../utils/WebIM")["default"];
let disp = require("../../../utils/broadcast");
var config = require("../../../utils/config");
Page({
    data: {
        btnShow:true,
        friendList: [],
        myName: "",
    },

    onLoad: function (options) {
        var me = this;
        // 不需要 object 地址更新，就能刷
        disp.on("em.xmpp.subscribe", function () {
            me.setData({
                friendList: getApp().globalData.saveFriendList
            });
        });
        this.setData({
            myName: options.myName,
            // 哈？global？好吧
            friendList: getApp().globalData.saveFriendList
        });

        this.getNewFriends()
    },
    // 好友申请列表请求
    getNewFriends(){
        var that = this ;
        wx.request({
            url: config.serverUrl + "/ctct/getNewFriends",
            header: { 
                // 'content-type': 'application/x-www-form-urlencoded',
                'token':wx.getStorageSync("token")
            },
            method: 'GET',
            success(res) {
                console.log(res);
                if (res.data.code == 0) {
                    that.setData({
                        friendList:res.data.data
                    })
                }else{
                    wx.showToast({
                        title: '网络错误',
                        icon:"none",
                    })
                }
            },
            fail() {},
            complete() {},
        })
    },
    removeAndRefresh(removeId) {
        var idx;
        this.data.friendList.forEach(function (v, k) {
            if (v.from === removeId) {
                idx = k;
            }
        });
        this.data.friendList.splice(idx, 1);
        getApp().globalData.saveFriendList.splice(idx, 1);
        if (!this.data.friendList.length) {
            wx.navigateBack({
                url: "../connection/connection"
            });
        }
        else {
            this.setData({
                friendList: this.data.friendList
            });
        }
    },
    agree(event) {
        var me = this;
        // 同意（无回调）
        WebIM.conn.subscribed({
            to: event.currentTarget.dataset.from,
            message: "[resp:true]",
        });
        // 需要反向添加对方好友（无回调）
        WebIM.conn.subscribe({
            to: event.currentTarget.dataset.from,
            message: "[resp:true]",
        });
        // wx.showToast({
        // 	title: "OK",
        // 	duration: 1000
        // });
        setTimeout(function () {
            me.removeAndRefresh(event.currentTarget.dataset.from);
        }, 1000);
    },

    reject(event) {
        var me = this;
        // 无回调
        WebIM.conn.unsubscribed({
            to: event.currentTarget.dataset.from,
            message: "rejectAddFriend",
        });
        wx.showToast({
            title: "已拒绝",
            duration: 1000
        });
        setTimeout(function () {
            me.removeAndRefresh(event.currentTarget.dataset.from);
        }, 1000);
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