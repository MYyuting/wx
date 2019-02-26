// pages/personal/datum/datum.js
var config = require("../../../utils/config.js")
Page({

    data: {
        pathImg:"",
        region: ['北京市', '北京市', '东城区'],
        regionTxt:'',     //家乡
        domainVal:"",     //领域
        graduatedVal:"",  //毕业院校
        hobbyVal:"",      //爱好
        hope:"",          //期待认识
        cityVal:"",       //城市
        identityStatus:"", //认证状态
        userInfo:"",
    },
    authenClick(e){
        switch (this.data.identityStatus) {
            case 2:
                wx.showToast({
                    title: '正在认证中...',
                    icon: "none",
                })
                break;
            case 1:
                wx.navigateTo({
                    url: 'fellinfo/fellinfo1/fellinfo1',
                })
                break;
            case 3:
                wx.navigateTo({
                    url: 'fellinfo/fellinfo',
                })
        }
    },
    bindRegionChange(e){
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            region: e.detail.value,
            regionTxt: e.detail.value[0] + '-' + e.detail.value[1] + '-' + e.detail.value[2]
        })
    },
    pathImg(){
        var that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
            sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
            success: res => {
                console.log(res)
                var tempFilePaths = res.tempFilePaths[0]
                that.uploadFile(tempFilePaths)
            }
        })
    },
    uploadFile(filePath) {
        var that = this;
        // 1: avatar / #头像 2: cardA / #身份证正面 3: cardB / #身份证反面 4: cardC / #营业执照或名片 
        wx.uploadFile({
            url: config.serverUrl + '/img/upload',
            filePath: filePath,
            name: 'file',
            formData: {
                type: 1,
            },
            header: {
                "token": wx.getStorageSync("token"),
            },
            success: function (res) {
                console.log(res.data);
                console.log(JSON.parse(res.data))
                var data = JSON.parse(res.data)
                if (data.code == 0) {
                    wx.hideToast();
                    that.setData({
                        pathImg: data.data.url
                    })
                    that.setAvatar()
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
    // 修改头像接口
    setAvatar(){
        wx.request({
            url: config.serverUrl +'/cen/editAvatar',
            method:"POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': wx.getStorageSync("token")
            },
            success(res){
                console.log(res)
                if(res.data.code == 0){
                    wx.showToast({
                        title: '上传头像成功',
                    })
                }
            }
        })
    },
    onLoad: function (options) {
        this.setData({
            userInfo: wx.getStorageSync("userInfo"),
            pathImg: wx.getStorageSync("userInfo").userAvatar
        })
        console.log(this.data.userInfo)
        this.getOtherInfo();
        this.getAutState();
    },
    // 获取用户认证状态
    getAutState(){
        var that = this ;
        wx.request({
            url: config.serverUrl +'/aut/getAutInfo',
            header: {
                'token': wx.getStorageSync("token")
            },
            method:"GET",
            success(res){
                console.log(res);
                if(res.data.code == 0){
                    that.setData({
                        identityStatus: res.data.data.identityStatus
                    })
                }
            }
        })
    },
    // 获取个人资料
    getOtherInfo(){
        var that = this;
        wx.request({
            url: config.serverUrl + "/cen/getOtherInfo",
            header: { 
                'token': wx.getStorageSync("token")
            },
            method: 'GET',
            success: function (res) {
                console.log(res)
                if(res.data.code == 0){
                    if (res.data.data.domain){
                        that.setData({
                            domainVal: res.data.data.domain
                        })
                    }
                    if (res.data.data.hobby) {
                        that.setData({
                            hobbyVal: res.data.data.hobby
                        })
                    }
                    if (res.data.data.graduated) {
                        that.setData({
                            graduatedVal: res.data.data.graduated
                        })
                    }
                    if (res.data.data.city) {
                        that.setData({
                            cityVal: res.data.data.city
                        })
                    }
                    if (res.data.data.hope) {
                        that.setData({
                            hopeVal: res.data.data.hope
                        })
                    }
                    if (res.data.data.homeTown) {
                        that.setData({
                            regionTxt: res.data.data.homeTown
                        })
                    }
                }
            },
            fail: function (res) {
                console.log(res)
            },
            complete: function (res) {

            },
        })
    },
    // 修改个人资料
    editInfo(data){
        var that = this ;
        wx.request({
            url: config.serverUrl +'/cen/editOtherInfo',
            method:"POST",
            data:data,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': wx.getStorageSync("token")
            },
            success(res){
                console.log(res);
                if(res.data.code == 0){
                    wx.showToast({
                        title: '修改资料成功',
                        duration:1500,
                    })
                }else{
                    wx.showToast({
                        title: '网络错误',
                        icon: "none"
                    })
                }
            },
            fail(){
                wx.showToast({
                    title: '网络错误',
                    icon:"none"
                })
            },
            complete(){}
        })
    },
    // 点击提交资料
    submitEdit(){
        var data={
            hobby: this.data.hobbyVal,
            hope:this.data.hopeVal,
            graduated: this.data.graduatedVal,
            domain: this.data.domainVal,
            city:this.data.cityVal,
            homeTown: this.data.regionTxt
        }
        console.log(data)
        this.editInfo(data)
    },
    domain(e){
        this.setData({
            domainVal:e.detail.value
        })
    },
    hope(e) {
        this.setData({
            hopeVal: e.detail.value
        })
    },
    hobby(e) {
        this.setData({
            hobbyVal: e.detail.value
        })
    },
    city(e) {
        this.setData({
            cityVal: e.detail.value
        })
    },
    graduated(e) {
        this.setData({
            graduatedVal: e.detail.value
        })
    },
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