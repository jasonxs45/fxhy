<template>
<div class="">
  <layout>
    <x-body slot="body" class="regist">
      <div class="regist-title">
        <span class="icon"></span>
        <span class="text">提交留言</span>
      </div>
      <div class="formrow">
        <div class="fhead">姓名：</div>
        <x-input placeholder="请输入2-6位中文姓名" v-model="customer.name" required>
        </x-input>
      </div>
      <div class="formrow">
        <div class="fhead">电话：</div>
        <x-input htmlType="tel" placeholder="请输入电话" v-model="customer.tel" required>
        </x-input>
      </div>
      <div class="formrow">
        <div class="fhead">留言：</div>
        <textarea class='textarea' placeholder="请填写您的意见和建议" v-model="customer.msg" required></textarea>
      </div>
      <div class="formrow">
        <div class="fhead"><p class="tips">上传照片（最多四张）</p></div>
        <img-row
          :group="uploadedImgs"
          :canUpload="true"
          @on-upload="uploadImg"
        >
          <img-cell
            v-for="(item, index) in uploadedImgs"
            :index="index"
            :canUpload="true"
            :del="true"
            :group="uploadedImgs"
            :key="'upimg-'+index"
          >
            <img class='myimg' :src="item" @click='preview(index)'/>
          </img-cell>
        </img-row>
      </div>
      <x-button type="primary" class="submit" @on-click="submitHandler">提交</x-button>
      <footnav></footnav>
    </x-body>
  </layout>
</div>
</template>
<script>
import axios from 'axios'
import wx from 'weixin-js-sdk'
import {
  Layout,
  Container,
  XBody,
  XLink,
  Icon,
  XImg,
  XButton,
  Split,
  XInput,
  XSelect,
  Datetime,
  ImgRow,
  ImgCell,
  Footnav
} from 'components'
export default {
  name: 'messagesubmit',
  components: {
    Layout,
    Container,
    XBody,
    XLink,
    Icon,
    XImg,
    XButton,
    Split,
    XInput,
    XSelect,
    Datetime,
    ImgRow,
    ImgCell,
    Footnav
  },
  data () {
    return {
      customer: {
        name: '',
        tel: '',
        msg: ''
      },
      uploadedImgs: []
    }
  },
  computed: {
    lastName () {
      return this.$store.state.lastName
    },
    lastTel () {
      return this.$store.state.lastTel
    }
  },
  methods: {
    uploadImg (res) {
      this.uploadedImgs.push(res)
    },
    preview (index) {
      wx.previewImage({
        current: this.uploadedImgs[index],
        urls: this.uploadedImgs
      })
    },
    submitHandler () {
      if (!this.customer.name.match(/^[\u4e00-\u9fa5]{2,6}$/i)) {
        window.$toast({
          type: 'warn',
          content: '请输入正确格式的姓名!'
        })
      } else if (!this.customer.tel.match(/^1([3,4,5,7,8]{1}[0-9]{9})$/i)) {
        window.$toast({
          type: 'warn',
          content: '请输入正确的手机号码！'
        })
      } else if (!this.customer.msg.trim()) {
        window.$toast({
          type: 'warn',
          content: '请填写您的意见和建议'
        })
      } else {
        axios.post('/Mobile-PostAPI', {
          Logic: "Suggest",
          Name: "AddSuggest",
          Data: JSON.stringify({
            Content: this.customer.msg,
            Images: JSON.stringify(this.uploadedImgs),
            Name: this.customer.name,
            Tel: this.customer.tel
          })
        }).then((res) => {
          window.$toast({
            type: 'loading',
            content: '提交中...',
            onClose: () => {
              if (res.data.IsSuccess) {
                window.$toast({
                  content: '提交成功！',
                  onClose: () => {
                    this.$router.push({name: 'home'})
                  }
                })
              }
            }
          })
        }).catch((err) => {
          console.log(err);
        })
      }
    }
  },
  mounted () {
    this.customer.name = this.lastName
    this.customer.tel = this.lastTel
  }
}
</script>
<style lang="scss">
@import '~styles/variable.scss';
@import '~styles/mixins.scss';
.regist{
  background-color: #fff;
  .regist-title{
    font-size:0;
    background: #fff;
    padding:12px 10px;
    box-shadow:0 1px 1px 0 rgba(0,0,0,.2);
    .icon,
    .text{
      display:inline-block;
    }
    .icon{
      width:10px;
      height:10px;
      background:$primary-color;
      margin-right:5px;
    }
    .text{
      font-size:16px;
    }
  }
  .formrow{
    position: relative;
    padding:8px 15px;
    .fhead{
      font-size:12px;
      height:1rem;
      line-height: 1rem;
      font-weight: 300;
    }
    .input-wrapper{
      height:1.5rem;
      input{
        font-size:14px;
      }
      .iconfont{
        font-size:14px;
      }
    }
    .textarea{
      display: block;
      resize: none;
      border: none;
      background: #f2f2f2;
      width: 100%;
      min-height: 150px;
      padding: 15px;
      font-size: 14px;
      outline: none;
      border-radius: 4px;
    }
  }
  .myimg{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .submit{
    font-size:$font-size-base;
    width:88%;
    display:block;
    margin:2rem auto 1rem;
    height:1.8rem;
    line-height:1.8rem;
  }
}
</style>
