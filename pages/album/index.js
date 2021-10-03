const app = getApp();
const util = require('../../utils/util.js')

Page({
    data: {
        placeHolderHeight: app.globalData.navBarHeight,
        noContenttexts: [
            'There is no moment now at your album.',
            'No hay ningún momento ahora en tu álbum.',
            '相册中目前还没有瞬间哦。',
            'あなたのアルバムには今の瞬間はありません。',
            '지금 앨범에 시간이 없습니다.'
        ],
        videoList: [],
        editDelete: false,
        changeColor: false,
        isFixed: false
    },
    fixedTop: 0,
    selectedDeleteIndex: [],

    onReady() {
        this.getVideoListFromStorage();
    },

    onPageScroll: function (e) {
        if (e.scrollTop > this.fixedTop) {
            this.setData({ isFixed: true })
        } else {
            this.setData({ isFixed: false })
        }
    },

    closeDeleteEditor() {
        this.selectedDeleteIndex = [];
        const newList = this.data.videoList.map((item) => {
            return {
                ...item,
                selected: false
            }
        });
        this.setData({
            editDelete: false,
            videoList: newList
        });
    },

    openDeleteEditor(event) {
        this.selectedDeleteIndex = [];
        let { index, selected } = event.currentTarget.dataset;
        this.updateDeleteList(index, selected);
        this.setData({
            editDelete: true,
        });
    },

    tapVideoItem(event) {
        const { editDelete } = this.data;
        if (editDelete) {
            let { index, selected } = event.currentTarget.dataset;
            this.updateDeleteList(index, selected);
        }
    },

    updateDeleteList(index, selected) {
        if (selected) {
            const removeIndex = this.selectedDeleteIndex.findIndex((value) => {
                return value === index;
            });
            this.selectedDeleteIndex.splice(removeIndex, 1);
        }
        else {
            this.selectedDeleteIndex.push(index);
        }
        const changeColor = this.selectedDeleteIndex.length > 0;
        const videoList = this.data.videoList;
        let newSelected = 'videoList[' + index + '].selected';
        this.setData({
            [newSelected]: !selected,
            changeColor
        });
    },

    openPhotoLibrary() {
        const _this = this;
        wx.chooseVideo({
            sourceType: ['album'],
            maxDuration: 60,
            success(res) {
                util.saveVideo(res.tempFilePath);
                _this.setData({
                    videoList: [
                        ..._this.data.videoList,
                        {
                            src: res.tempFilePath,
                            selected: false
                        }
                    ]
                });
            }
        });
    },

    updateVideoList(src) {
        this.setData({
            videoList: [
                ...this.data.videoList,
                {
                    src,
                    selected: false
                }
            ]
        });
    },

    confirmDelete() {
        if (this.selectedDeleteIndex.length === 0) return;
        const newVideoList = this.data.videoList;
        this.selectedDeleteIndex.forEach((value) => {
            newVideoList.splice(value, 1);
        });
        this.setData({
            videoList: newVideoList,
            changeColor: false
        }, () => {
            this.selectedDeleteIndex = [];
            this.updateStorage(newVideoList);
        });

    },

    updateStorage(newVideoList) {
        const value = newVideoList.map((item) => { return item.src });
        wx.setStorage({
            key: 'videoHistory',
            data: value,
            success: (result) => {

            },
            fail: () => { },
            complete: () => { }
        });
    },

    gotoIndex() {
        wx.navigateBack({
            delta: 1
        });
    },

    getVideoListFromStorage() {
        const videos = wx.getStorageSync('videoHistory') || [];
        const videoList = videos.map((src) => {
            return {
                src,
                selected: false
            }
        });
        this.setData({
            videoList
        });
    }

})
