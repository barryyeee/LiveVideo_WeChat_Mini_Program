const app = getApp();
const util = require('../../utils/util.js')

Page({
  data: {
    placeHolderHeight: app.globalData.navBarHeight,
    useFlash: false,
    startRecord: false,
    useBackCamera: true,
    openBlock: false
  },

  onLoad() {
    this.ctx = wx.createCameraContext();
  },

  takePhoto() {
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },

  controlFlash(e) {
    this.setData({
      useFlash: !this.data.useFlash
    });
  },

  controlCameraPosition() {
    this.setData({
      useBackCamera: !this.data.useBackCamera
    });
  },

  startRecord() {
    this.ctx.startRecord({
      success: (res) => {
        this.setData({
          startRecord: true,
        });
      }
    })
  },

  stopRecord() {
    this.ctx.stopRecord({
      success: (res) => {
        this.setData({
          startRecord: false,
        });
        util.saveVideo(res.tempVideoPath);
      }
    });
  },

  gotoAlbumPage() {
    wx.navigateTo({
      url: '../album/index',
      success: (result) => {

      },
      fail: () => { },
      complete: () => {
        this.setData({
          openBlock: false
        });
      }
    });
  },

  handleError(e) {
    wx.showToast({
      title: 'Need allow access to your camera',
      icon: 'none',
      duration: 1500,
      mask: false,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  }
})
