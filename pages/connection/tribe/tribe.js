// pages/connection/tribe/tribe.js
var WebIM = require("../../../utils/WebIM")["default"];
let disp = require("../../../utils/broadcast");

Page({

    data: {
        groupList: [],
        myName: ""	
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (option) {
        let me = this;
        disp.on("em.xmpp.invite.joingroup", function () {
            var pageStack = getCurrentPages();
            console.log(pageStack)
            // 判断是否当前路由是本页
            // if (pageStack[pageStack.length - 1].route === me.route) {
            //     me.listGroups();
            // }
        });
        this.setData({
            myName: option.myName
        });
    },
    // 获取聊天列表
    listGroups() {
        var me = this;
        WebIM.conn.listRooms({
            success: function (rooms) {
                console.log(rooms)
                me.setData({
                    groupList: rooms
                });
                // 好像也没有别的官方通道共享数据啊
                getApp().globalData.groupList = rooms || [];
            },
            error: function () {

            }
        });
    },
    // 点击进入聊天室
    into_room: function (event) {
        var nameList = {
            myName: this.data.myName,
            your: event.currentTarget.dataset.username,
            groupId: event.currentTarget.dataset.roomid
        };
        wx.navigateTo({
            url: "../groupsChat/groupsChat?username=" + JSON.stringify(nameList)
        });
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
        this.listGroups()
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