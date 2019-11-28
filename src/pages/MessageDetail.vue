<template>
  <div class="">
    <layout>
      <x-body slot="body" class="video">
        <div class="my-title">
          <span class="icon"></span>
          <span class="text">详情</span>
        </div>
        <Split />
        <div v-if='detail' class='main'>
          <div class='top'>
            <img v-if='detail.HeadImgUrl' :src="detail.HeadImgUrl" class='avatar' />
            <p class='name'>{{detail.Name}}</p>
            <p class='date'>{{detail.AddTime}}</p>
          </div>
          <div class='msg'>{{detail.Content}}</div>
          <div v-if='detail.Images' class='imgs'>
            <img v-for='(item, index) in detail.imgs' :key='item' :src="item" @click='preview(index)' class='thumbnail' />
          </div>
          <div v-if='detail.Content2' class='reply-area'>
            <div class='top'>
              <p class='name'>管理员回复：</p>
              <p class='date'>{{detail.AddTime2}}</p>
            </div>
            <div class='reply'>{{detail.Content2}}</div>
          </div>
          <div v-if='role==="manager"&&!detail.Content2' class='reply-area'>
            <p>管理员回复</p>
            <textarea class='textarea' placeholder='请填写回复' v-model='msg'></textarea>
            <x-button type="primary" class="submit" @on-click="reply">提交</x-button>
          </div>
        </div>
        <Split />
        <footnav></footnav>
      </x-body>
    </layout>
  </div>
</template>
<script>
import {
  Layout,
  Container,
  XBody,
  Footnav,
  Split,
  Flexbox,
  FlexboxItem,
  XButton
} from 'components'
import axios from 'axios'
import wx from 'weixin-js-sdk'
export default {
  name: 'message-detail',
  components: {
    Layout,
    Container,
    XBody,
    Footnav,
    Split,
    Flexbox,
    FlexboxItem,
    XButton
  },
  data() {
    return {
      id: '',
      role: '',
      detail: null,
      msg: ''
    }
  },
  computed: {},
  methods: {
    preview (index) {
      wx.previewImage({
        current: this.detail.imgs[index],
        urls: this.detail.imgs
      })
    },
    getDetail () {
      axios.post('/Mobile-PostAPI',
        {
          Logic: 'Suggest',
          Name: 'GetSuggestInfo',
          Data: JSON.stringify({
            ID: this.id
          })
        }).then(res => {
          console.log(res)
          this.detail = res.data.Data
          this.detail.imgs = this.detail.Images ? eval(this.detail.Images) : []
        }).catch(err => {
          console.log(err);
        })
    },
    reply () {
      if (!this.msg.trim()) {
        window.$toast({
          type: 'warn',
          content: '回复内容不能为空'
        })
        return
      }
      axios.post('/Mobile-PostAPI',
        {
          Logic: "Suggest",
          Name: "Reply",
          Data: JSON.stringify({
            SuggestID: this.id,
            Content: this.msg,
            ImageList: JSON.stringify([])
            })
        }).then(res => {
          window.$toast({
            type: 'loading',
            content: '提交中...',
            onClose: () => {
              if (res.data.IsSuccess) {
                window.$toast({
                  content: '回复成功！',
                  onClose: () => {
                    // this.$router.back()
                    this.$router.replace('messagemanager')
                  }
                })
              }
            }
          })

        }).catch(err => {
          console.log(err);
        })
    }
  },
  created () {
    const { id, role } = this.$route.query
    this.id = id
    this.role = role
    this.getDetail()
  }
}
</script>
<style lang="scss">
@import '~styles/variable.scss';
@import '~styles/mixins.scss';
.my-title{
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
  .main{
    background: #fff;
    padding: 15px 15px 60px;
  }
  .top{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .avatar{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
  .name{
    font-size: 14px;
    color: #333;
    flex: 1;
  }
  .date{
    font-size: 12px;
    font-weight: 200;
    color: #666;
  }
  .msg{
    font-size: 14px;
    background: #f2f2f2;
    padding: 15px;
    border-radius: 4px;
    margin: 15px 0;
    line-height: 1.5;
  }
  .reply-area{
    border-top: 1px solid #ddd;
    padding-top: 15px;
    .reply, .textarea{
      display: block;
      width: 100%;
      outline: none;
      border: none;
      font-size: 14px;
      background: #f2f2f2;
      color: #555;
      padding: 15px;
      border-radius: 4px;
      margin: 15px 0;
    }
    .textarea{
      min-height: 150px;
    }
  }
  .submit{
    display: block;
    margin: 15px auto;
    width: 280px !important;
    height: 44px !important;
    line-height: 44px !important;
  }
  .imgs{
    margin: 15px -8px;
  }
  .thumbnail{
    width: 80px;
    height: 80px;
    border-radius: 4px;
    object-fit: cover;
    margin: 8px;
  }
</style>
