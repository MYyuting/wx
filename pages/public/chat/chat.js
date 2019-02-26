// pages/chat/chat.js
let disp = require("../../../utils/broadcast");
Page({

    data: {
        username: {
            your: "",
        },
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let username = JSON.parse(options.username);
        this.setData({ username: username });
        console.log(username)
        wx.setNavigationBarTitle({
            title: username.yourN
        });
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

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
        disp.fire("em.chatroom.leave");
    },

   
})