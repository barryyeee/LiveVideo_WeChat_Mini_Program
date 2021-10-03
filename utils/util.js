const saveVideo = (videoSrc) => {
    const value = wx.getStorageSync('videoHistory') || [];
    value.push(videoSrc);
    wx.setStorage({
        key: 'videoHistory',
        data: value,
        success: (result) => {

        },
        fail: () => { },
        complete: () => { }
    });
}

module.exports = {
    saveVideo
}