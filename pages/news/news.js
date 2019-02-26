// pages/news/news.js
const app = getApp();
let disp = require("../../utils/broadcast");
Page({

    data: {
        nvabarData: {
            showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
            title: '消息', //导航栏 中间的标题
        },
        height: app.globalData.height * 2 + 22,
        arr:[],
        unReadSpot:false,
    },
   
    onLoad: function (options) {
        
        let me = this;
        disp.on("em.xmpp.unreadspot", function (count) {
            me.setData({
                arr: me.getChatList(),
                unReadSpot: count > 0
            });
        });
    },
    datum(){
        wx.navigateTo({
            url: '../public/datum1/datum1',
        })
    },
    getChatList() {
        var array = [];
        var member = wx.getStorageSync("member");
        var myName = wx.getStorageSync("myUsername");
        for (let i = 0; i < member.length; i++) {
            let newChatMsgs = wx.getStorageSync(member[i].name + myName) || [];
            let historyChatMsgs = wx.getStorageSync("rendered_" + member[i].name + myName) || [];
            let curChatMsgs = historyChatMsgs.concat(newChatMsgs);
            if (curChatMsgs.length) {
                let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
                lastChatMsg.unReadCount = newChatMsgs.length;
                if (lastChatMsg.unReadCount > 10) {
                    lastChatMsg.unReadCount = "...";
                }
                array.push(lastChatMsg);
            }
        }
        return array;
    },

    into_chatRoom: function (event) {
        var my = wx.getStorageSync("myUsername");
        var nameList = {
            myName: my,
            your: event.currentTarget.dataset.username
        };
        wx.navigateTo({
            url: "../public/chat/chat?username=" + JSON.stringify(nameList)
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
        console.log(this.getChatList())
        this.setData({
            arr: this.getChatList(),
            unReadSpot: getApp().globalData.unReadSpot,
        });
    },

   
    onHide: function () {

    },

    
    onUnload: function () {

    },

    

})