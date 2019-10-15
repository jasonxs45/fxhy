import wx from 'weixin-js-sdk'
import axios from 'axios'
export var wxConf = {
  name: 'weixin-config',
  shareData: {
    title: '福星惠誉多功能微站，匠心创造邀您体验！',
    desc: `为您提供更便捷的一体化服务`,
    link: '' + location.href,
    imgUrl: `${location.origin}${location.pathname}/static/images/banner-1.png`
  },
  isWX() {
    var ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true
    } else {
      return false
    }
  },
  init(cb) {
    let _self = this
    axios.post('/Admin-GetAuthorize', {
      redirectUrl: location.href
    }).then((res) => {
      if (res.data.IsSuccess) {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.Data.AppId, // 必填，公众号的唯一标识
          timestamp: res.data.Data.Timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.Data.NonceStr, // 必填，生成签名的随机串
          signature: res.data.Data.Signature, // 必填，签名
          jsApiList: this.apilist
        })
        wx.ready(() => {
          wx.onMenuShareAppMessage(_self.shareData)
          wx.onMenuShareTimeline(_self.shareData)
          wx.onMenuShareQQ(_self.shareData)
          cb && cb()
        })
      } else {
        location.href = res.data.Data
      }
    }).catch((err) => {
      console.log(err);
    })
  },
  previewImg ({current, urls}) {
    wx.previewImage({
      current,
      urls
    })
  },
  wxUpload (limit, a) {
    /* 图片组 */
    let images = {
      localId: [],
      serverId: []
    }
    /* 选择文件 */
    wx.chooseImage({
      count: limit,
      success (res) {
        images.localId = res.localIds
        uploadImage()
      }
    })

    /* 微信JSAPI 5.3 上传图片 */
    function uploadImage () {
      if (images.localId.length === 0) {
        alert('请选择图片')
        return
      }
      var i = 0
      var length = images.localId.length
      images.serverId = []
      /* 上载到微信服务器 */
      function upload () {
        wx.uploadImage({
          localId: images.localId[i],
          success (res) {
            i++
            downloadImage(i, res.serverId)
            if (i < length) {
              setTimeout(function () {
                upload()
              }, 200)
            }
          },
          fail (res) {
            alert('上传失败' + JSON.stringify(res))
          }
        })
      }
      upload()
    }
    /* 从微信服务器下载图片 */
    function downloadImage (index, serverID, cb) {
      return axios.post(
        location.origin + '/Mobile-wx_UploadImg', // 请求的url地址
        {
          serverID
        }
      )
      .then(res => {
        let url = location.origin + res.data
        a(url)
      })
      .catch(err => {
        console.log(err)
        alert('网络错误，请稍后再试')
      })
    }
  },
  apilist: [
    'checkJsApi',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'hideMenuItems',
    'showMenuItems',
    'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'translateVoice',
    'startRecord',
    'stopRecord',
    'onRecordEnd',
    'playVoice',
    'pauseVoice',
    'stopVoice',
    'uploadVoice',
    'downloadVoice',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'downloadImage',
    'getNetworkType',
    'openLocation',
    'getLocation',
    'hideOptionMenu',
    'showOptionMenu',
    'closeWindow',
    'scanQRCode',
    'chooseWXPay',
    'openProductSpecificView',
    'addCard',
    'chooseCard',
    'openCard'
  ]
}
