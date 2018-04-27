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
  init() {
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
        })
      } else {
        location.href = res.data.Data
      }
    }).catch((err) => {
      console.log(err);
    })
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
