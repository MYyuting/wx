// pages/personal/fellinfo/fellinfo1/fellinfo1.js
var config = require("../../../../utils/config");
Page({
    data: {
        tempFilePaths:"",
        // productInfo:{},  //提交信息
        alertShow:false,
        renShow:true,
        token:"",
    },
    // 点击选择图片
    fellImg1(){
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
            sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
            success: res => {
                console.log(res)
                var tempFilePaths1 = res.tempFilePaths[0]
                wx.showToast({
                    title: '正在上传...',
                    icon: 'loading',
                    mask: true,
                    duration: 10000
                }) 
                this.uploadFile(tempFilePaths1,4)
            }
        })
    },
    backInfo(){
        wx.switchTab({
            url: '../../personal',
            success(res) {
                let page = getCurrentPages().pop()
                if (page == undefined || page == null) {
                    return
                }
                page.onLoad()
            }
        })
    },
    // 上传图片接口
    uploadFile(filePath, type) {
        var that = this;
        // 1: avatar / #头像 2: cardA / #身份证正面 3: cardB / #身份证反面 4: cardC / #营业执照或名片 
        wx.uploadFile({
            url: config.serverUrl + '/img/upload',
            filePath: filePath,
            name: 'file',
            formData: {
                'type': type,
            },
            header: {
                "Content-Type": "multipart/form-data",
                "token": that.data.token,
            },
            success: function (res) {
                console.log(res.data);
                console.log(JSON.parse(res.data))
                var data = JSON.parse(res.data)
                if (data.code == 0) {
                    that.setData({
                        tempFilePaths: data.data.url
                    })
                } else {
                    wx.hideToast();
                    wx.showToast({
                        title: "上传失败，请稍后再试",
                        icon: "none",
                        duration: 1500
                    })
                }

            },
            fail: function (res) {
                wx.hideToast();
                wx.showToast({
                    title: "上传失败，请稍后再试",
                    icon: "none",
                    duration: 1500
                })
            }
        });
    },
    rengong(){
        this.autInfo(2)
    },
    submit(){
        if (this.data.tempFilePaths == ""){
            wx.showToast({
                title: "图片不能为空",
                icon: "none"
            })
            return;
        }
        this.autInfo(1)
        
    },
    
    // 提交附加认证
    autInfo(type){
        wx.request({
            url: config.serverUrl + '/aut/addAutOtherInfo',
            data: {
                type:type,
                token:this.data.token,
            },    //1:证件认证，2:电话认证
            method: "POST",
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: res => {
                console.log(res);
                if (res.data.code == 0) {
                    // 
                    if (type == 1){
                        this.setData({
                            alertShow: true,
                            renShow: true,
                        })
                    }else{
                        this.setData({
                            alertShow: true,
                            renShow: false,
                        })
                    }
                    
                } else {
                    wx.showToast({
                        title: '网络错误，稍后再试',
                        icon: "none"
                    })
                }
            },
            fail: res => {

            },
            complete: res => {

            }
        })
    },
    onLoad: function (options) {
        var that = this;
        that.setData({
            token: wx.getStorageSync("token")
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