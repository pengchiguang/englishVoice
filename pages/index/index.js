//录音管理
const recorderManager = wx.getRecorderManager()
//音频组件控制
const innerAudioContext = wx.createInnerAudioContext()



var tempFilePath;
Page({
    data: {

    },
    //开始录音的时候
    start: function () {
        console.log('before recorder start')
        const options = {
            duration: 10000,//指定录音的时长，单位 ms
            sampleRate: 16000,//采样率
            numberOfChannels: 1,//录音通道数
            encodeBitRate: 96000,//编码码率
            format: 'mp3',//音频格式，有效值 aac/mp3
            frameSize: 50,//指定帧大小，单位 KB
        }
        //开始录音
        recorderManager.start(options);
        recorderManager.onStart(() => {
            console.log('recorder start')
    });
        //错误回调
        recorderManager.onError((res) => {
            console.log(res);
    })
    },
    //暂停录音
    pause: function () {
        recorderManager.onPause();
        console.log('暂停录音')
    },
    //停止录音
    stop: function () {
        console.log('before recorder stop')
        recorderManager.stop();
        recorderManager.onStop((res) => {
            this.tempFilePath = res.tempFilePath;
        console.log('停止录音', res.tempFilePath)
        const { tempFilePath } = res
        // this.upload();
        // this.play();
    })
    },
    //播放声音
    play: function () {

      console.log('start play some');
        innerAudioContext.src = this.tempFilePath
        innerAudioContext.autoplay = true

        // innerAudioContext.src = 'http://renrencmo.iji3.com/assets/img/tmp_800d4febe1f01f7d9e9531c3939d8a65.mp3'
        // innerAudioContext.src = 'https://cdn.caomall.net/15290437711272352156.mp3'
        console.log(innerAudioContext)


        innerAudioContext.onPlay(() => {
            console.log('开始播放')
    })

        innerAudioContext.onError((res) => {
            console.log(res.errMsg)
        console.log(res.errCode)
    })
        return
        innerAudioContext.autoplay = true
        // innerAudioContext.src = this.tempFilePath
        innerAudioContext.src = encodeURIComponent('https://pcgbbs.iji3.com/upload/tmp_1e734a900b259c4f3da0a9cf27373724.mp3')
        console.log(innerAudioContext)
        innerAudioContext.onPlay(() => {
            console.log('开始播放')
    })
        innerAudioContext.onError((res) => {
            console.log(res.errMsg)
        console.log(res.errCode)
    })

    },
    //上传录音
    upload:function(){
        wx.uploadFile({
            url: "https://pcgbbs.iji3.com/fileUpload.php",//演示域名、自行配置
            filePath: this.tempFilePath,
            name: 'file',
            header: {
                "Content-Type": "multipart/form-data"
            },
            formData:
                {
                    userId: 12345678 //附加信息为用户ID
                },
            success: function (res) {
                console.log(res);
                wx.showToast({
                    title: '上传成功',
                    icon: 'success',
                    duration: 2000
                })
            },
            fail: function (res) {
                console.log(res);
            },
            complete: function (res) {

            }
        })
    },
    onLoad: function () {

    },
})