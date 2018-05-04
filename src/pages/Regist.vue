<template>
<div class="">
  <layout>
    <x-body slot="body" class="regist">
      <div class="regist-title">
        <span class="icon"></span>
        <span class="text">在线看房</span>
      </div>
      <split></split>
      <div class="formrow">
        <div class="fhead">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</div>
        <x-input placeholder="请输入2-6位中文姓名" v-model="customer.name" required>
        </x-input>
      </div>
      <div class="formrow">
        <div class="fhead">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：</div>
        <x-input htmlType="tel" placeholder="请输入电话" v-model="customer.tel" required>
        </x-input>
      </div>
      <div class="formrow">
        <div class="fhead">预约项目：</div>
        <div class="input-wrapper">
          <x-select
            :label.sync="customer.item.name"
            slot="value"
            :options="items"
            :value="customer.item.id"
            placeholder="请选择"
            @on-change="changeHandler"
          />
        </div>
      </div>
      <div class="formrow">
        <div class="fhead">预约时间：</div>
        <div class="input-wrapper">
          <datetime :get-popup-mounted="popupMounted" @on-change="datechange" v-model="customer.date" placeholder="请输入日期" required/>
        </div>
      </div>
      <x-button type="primary" class="submit" @on-click="submitHandler">提交</x-button>
      <footnav></footnav>
    </x-body>
  </layout>
</div>
</template>

<script>
import axios from 'axios'
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
  Footnav
} from 'components'
export default {
  name: 'regist',
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
    Footnav
  },
  data () {
    return {
      customer: {
        name: '',
        tel: '',
        item: {
          id: '',
          name: ''
        },
        date: undefined
      },
      items: []
    }
  },
  computed: {
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      axios.post('/Mobile-PostAPI', {
        Logic: 'Rent',
        Name: 'GetList',
        Data: JSON.stringify({})
      }).then((res) => {
        let options = []
        for (var i= 0; i< res.data.Data.length; i++) {
          options.push({value: res.data.Data[i].ID+'', label: res.data.Data[i].Name})
        }
        this.items = options
      }).catch((err) => {
        console.log(err);
      })
    },
    changeHandler (value) {
      this.customer.item.id = value
    },
    datechange (val) {
      if (new Date(val) <= new Date()) {
        window.$toast({
          type: 'warn',
          content: '预约日期不能小于今天！'
        })
      }
    },
    popupMounted (e) {
      return document.body
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
      } else if (!this.customer.item.name) {
        window.$toast({
          type: 'warn',
          content: '请选择要预约的项目'
        })
      }  else if (!this.customer.date) {
        window.$toast({
          type: 'warn',
          content: '请选择要预约的时间'
        })
      } else {
        axios.post('/Mobile-PostAPI', {
          Logic: 'LookHouse',
          Name: 'AddInfo',
          Data: JSON.stringify({
            RentID: this.customer.item.id,
            Name: this.customer.name,
            Tel: this.customer.tel,
            LookTime: this.customer.date
          })
        }).then((res) => {
          window.$toast({
            type: 'loading',
            content: '提交中...',
            onClose: () => {
              if (res.data.IsSuccess) {
                window.$toast({
                  content: '预约成功！',
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
    display:flex;
    display:-webkit-box;
    position: relative;
    padding:8px 15px;
    .fhead{
      font-size:.64rem;
      height:1rem;
      line-height: 1rem;
      font-weight: 300;
    }
    .input-wrapper{
      -webkit-box-flex:1;
      flex:1;
      height:1rem;
      position: static;
      input{
        font-size:.64rem
      }
      .iconfont{
        font-size:.64rem
      }
    }
    .select{
      padding-left:.4rem;
      height:1rem;
      -webkit-box-flex:1;
      flex:1;
      button{
        font-size:.64rem;
      }
    }
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
