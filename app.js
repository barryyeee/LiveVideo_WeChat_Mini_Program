// app.js
App({
  onLaunch() {
    const systemInfo = wx.getSystemInfoSync();
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();

    this.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
    this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    this.globalData.menuBottom = menuButtonInfo.top - systemInfo.statusBarHeight;
    this.globalData.menuHeight = menuButtonInfo.height;
  },
  globalData: {
    navBarHeight: 0,
    menuRight: 0,
    menuBottom: 0,
    menuHeight: 0,
  }
})
