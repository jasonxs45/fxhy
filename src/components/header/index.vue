<template>
  <div :class="classes">
    <flexbox class="nav" align="center">
      <div class="side-menu-btn left" @click="showMenu"></div>
      <flexbox-item :class="['header-title', back===false ? 'header-title-center' : '']">
        <slot name="title"></slot>
      </flexbox-item>
      <slot name="right"></slot>
      <slot name="pull"></slot>
    </flexbox>
    <slot></slot>

      <div class="side-menu">
        <transition name="fade">
          <div class="side-menu-wrapper scrollbox" v-show="menuShow">
            <sidebar @on-change="changeHandler" :active="active" class="sidebar">
              <sidebar-item @click="sidebarc">
                <accordion
                  title="首页"
                  :showing = "true"
                  :index = "0"
                  @title-click="goHome"
                >
                  <span slot="title-icon" class="title-icon" :class="['i'+4]"></span>
                </accordion>
              </sidebar-item>
              <sidebar-item @click="sidebarc">
                <accordion
                  title="识星企"
                  :showing = "false"
                  :index = "1"
                >
                  <span slot="title-icon" class="title-icon" :class="['i'+0]"></span>
                  <div class="" slot="panel">
                    <ul class="menus">
                      <li class="menu-item" @click="linkClick">
                          <x-link href="/pages/introduction">星简介</x-link>
                      </li>
                      <li class="menu-item" @click="linkClick">
                          <x-link href="/pages/newslist">星动态</x-link>
                      </li>
                      <li class="menu-item" @click="linkClick">
                          <x-link href="/pages/readings">星视界</x-link>
                      </li>
                       <li class="menu-item" @click="linkClick">
                          <x-link href="/pages/video">星视频</x-link>
                      </li>
                      <li class="menu-item" @click="linkClick">
                          <x-link href="/pages/recruitment">星招聘</x-link>
                      </li>
                  </ul>
                  </div>
                </accordion>
              </sidebar-item>
              <sidebar-item @click="sidebarc">
                <accordion
                  title="买星品"
                  :showing = "false"
                  :index = "2"
                >
                  <span slot="title-icon" class="title-icon" :class="['i'+1]"></span>
                  <div class="" slot="panel">
                    <ul class="menus">
                      <li class="menu-item" @click="linkClick">
                        <x-link href="/pages/products">看楼盘</x-link>
                      </li>
                      <li class="menu-item" @click="linkClick">
                        <x-link href="/pages/shoppingmall">逛商城</x-link>
                      </li>
                      <li class="menu-item" @click="linkClick">
                        <x-link href="/pages/regist">在线看房</x-link>
                      </li>
                    </ul>
                  </div>
                </accordion>
              </sidebar-item>
              <sidebar-item @click="sidebarc">
                <accordion
                  title="客户服务"
                  :showing = "false"
                  :index = "3"
                >
                  <span slot="title-icon" class="title-icon" :class="['i'+2]"></span>
                  <div class="" slot="panel">
                    <ul class="menus">
                      <li class="menu-item" @click="linkClick">
                        <x-link href="/pages/message">留言板</x-link>
                      </li>
                      <li v-if='admin' class="menu-item" @click="linkClick">
                        <x-link href="/pages/messagemanager">留言板(管理员)</x-link>
                      </li>
                      <!-- <li class="menu-item">
                          <a href="http://www.whfxhy.com/" class="">会员章程</a>
                      </li>
                      <li class="menu-item">
                          <a href="http://www.whfxhy.com/" class="">入会\认证</a>
                      </li>
                      <li class="menu-item">
                          <a href="http://www.whfxhy.com/" class="">个人中心</a>
                      </li>
                      <li class="menu-item">
                          <a href="http://www.whfxhy.com/" class="">积分计划</a>
                      </li>
                      <li class="menu-item">
                          <a href="http://www.whfxhy.com/" class="">会员活动</a>
                      </li> -->
                    </ul>
                  </div>
                </accordion>
              </sidebar-item>
              <sidebar-item @click="sidebarc">
                <accordion
                  title="快捷菜单"
                  :showing = "false"
                  :index = "4"
                >
                  <span slot="title-icon" class="title-icon" :class="['i'+3]"></span>
                  <div class="" slot="panel">
                    <ul class="menus">
                        <li class="menu-item" @click="linkClick">
                          <x-link href="/pages/servicetel">服务电话</x-link>
                        </li>
                        <li class="menu-item" @click="waiting">
                          <a class="">问卷调查</a>
                        </li>
                    </ul>
                  </div>
                </accordion>
              </sidebar-item>
            </sidebar>
            <div class="logo1">
              <img src="static/images/logo1.png" />
            </div>
          </div>
        </transition>
        <transition name="fade"><div class="background" v-show="menuShow" @click="showMenu"></div></transition>
      </div>
      <div class="serch-box"></div>
  </div>
</template>

<script>
import {Flexbox, FlexboxItem} from '../flexbox'
import {Sidebar, SidebarItem} from '../sidebar'
import Icon from '../icon'
import {Accordion} from '../accordion'
import XLink from '../link'
import axios from 'axios'
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Sidebar,
    SidebarItem,
    Icon,
    Accordion,
    XLink
  },
  props: {
    back: {
      type: [String, Boolean, Function],
      default: true
    },
    backText: {
      type: String,
      default: '返回'
    }
  },
  computed: {
    classes () {
      return ['header']
    }
  },
  data () {
    return {
      menuShow: false,
      active: 0,
      menushowing: [
        true, false, false, false
      ],
      admin: false
    }
  },
  methods: {
    checkid () {
      return axios({
        method: 'post',
        url: '/Mobile-PostAPI',
        data: {
          Logic: "Member",
          Name: "GetIdentity",
          Data: JSON.stringify({})
        }
      })
    },
    backHandler () {
      if (this.back === true) {
        history.back()
      }
      if (typeof this.back === 'string') {
        location.href = this.back
      }
      if (typeof this.back === 'function') {
        this.back()
      }
    },
    showMenu () {
      this.menuShow = !this.menuShow
      this.$emit('showMenu')
    },
    sidebarc (o, a, i) {
      for (var k= 0; k< o.$parent.$children.length; k++) {
        o.$parent.$children[k].active = false
        o.$parent.$children[k].$children[0].showBool = false
      }
      // if (i === 3) {
      //   window.$alert({
      //     content: `<img src="static/images/wait.png" style="width:50%"/>
      //               <p style="margin-top:20px">资料添加中</p>`
      //   })
      //   return
      // }
      o.$parent.$children[i].active = true
      o.$parent.$children[i].$children[0].showBool = true
    },
    accordClick (o, a) {
    },
    changeHandler (value) {
      this.active = value
    },
    linkClick () {
      this.showMenu()
      return false
    },
    waiting () {
       window.$alert({
          content: `<img src="static/images/wait.png" style="width:50%"/>
                    <p style="margin-top:20px">资料添加中</p>`
        })
    },
    goHome () {
      this.$router.push({name: 'home'})
      this.showMenu()
    }
  },
  created () {
    this.checkid()
      .then(res => {
        const { IsSuccess, Data } = res.data
        if (IsSuccess) {
          if (Data.IsSuggestAdmin) {
            this.admin = true
          }
        }
      })
      .catch(err => {
        console.lgo(err)
      })
  }
}
</script>

<style lang="scss">
  @import '~styles/variable.scss';
  @import '~styles/mixins.scss';
  .header{
      background-image: linear-gradient(to bottom,#fff -10%,#f2f2f2 100%);
      height:1.92rem;
      position: relative;
      color:#16487f;
      .side-menu-btn{
        width:50px;
        height:inherit;
        background:$primary-color url(../../../static/images/menu-icon.png) center no-repeat;
        background-size:40%;
        text-align: center;
      }
      .search-btn{
        font-weight:700;
        width:50px;
        background:url(../../../static/images/search.png) center no-repeat;
        background-size:40%;
      }
      .nav{
        height:100%;
        line-height:1.92rem;
      }
      .btn-pull{
        color:inherit;
        height:inherit;
        min-width: 40px;
        text-align: center;
        @include button;
        @include active;
      }
      &-back{
        margin-right:-10px;
        position:relative;
        z-index:1;
        &:active{
          background:transparent!important;
        }
      }
      &-title{
        font-size:1rem;
        overflow: hidden;
        &-center{
          text-align:center;
          line-height:1
        }
      }
      .side-menu{
        .side-menu-wrapper{
          width:10.2rem;
          height:calc(100% - 1.92rem);
          background:#fff;
          position: fixed;
          z-index:13;
          left:0;
          box-shadow:2px 2px 2px 0 rgba(0,0,0,.2);
          &.fade-enter-active,
          &.fade-leave-active {
            transform:translate3d(-100%,0,0);
            transition: all .3s ease-out;
          }
          &.fade-enter-to,
          &.fade-leave{
            transform:translate3d(0,0,0);
          }
          .sidebar{
            font-size:.6rem;
            min-height:100%;
            padding-bottom:80px;
            .sidebar-item{
              .accordion{
                .menu-item,
                .title{
                  padding:.64rem;
                  text-align:left
                }
                .title{
                  font-size:0;
                  position: relative;
                  @include _1px;
                  &:before{
                    content:'';
                    display:none;
                    position: absolute;
                    top:0;
                    left:0;
                    height:100%;
                    width:5px;
                    background-color:$primary-color;
                  }
                  .title-icon,.text{
                    font-size:.64rem;
                    display:inline-block;
                    vertical-align:middle
                  }
                  .title-icon{
                    margin-right:.6rem;
                    width:.64rem;
                    height:.64rem;
                    background: center no-repeat;
                    background-size:cover;
                    &.i0{
                      background-image: url(../../../static/images/i1.png);
                    }
                    &.i1{
                      background-image: url(../../../static/images/i2.png);
                    }
                    &.i2{
                      background-image: url(../../../static/images/i3.png);
                    }
                    &.i3{
                      background-image: url(../../../static/images/i4.png);
                    }
                    &.i4{
                      background-image: url(../../../static/images/i9.png);
                    }
                  }
                }
                .menu-item{
                  a{
                    display:block;
                    color:#fff;
                    padding-left:1.24rem;
                    font-weight:200;
                  }
                }
              }
              &-active{
                .accordion{
                  .title{
                    &:before{
                      display:block;
                    }
                    .title-icon{
                      margin-right:.6rem;
                      width:.64rem;
                      height:.64rem;
                      background: center no-repeat;
                      background-size:cover;
                      &.i0{
                        background-image: url(../../../static/images/i1_1.png);
                      }
                      &.i1{
                        background-image: url(../../../static/images/i2_1.png);
                      }
                      &.i2{
                        background-image: url(../../../static/images/i3_1.png);
                      }
                      &.i3{
                        background-image: url(../../../static/images/i4_1.png);
                      }
                      &.i4{
                        background-image: url(../../../static/images/i9_1.png);
                      }
                    }
                  }
                }
              }
            }
          }
          .logo1{
            height:50px;
            margin-top:-50px;
            padding:10px;
          }
        }
        .background{
          position:fixed;;
          width:100%;
          height:calc(100% - 1.92rem);
          background:rgba(0,0,0,.5);
          z-index:12;
          &.fade-enter-active,
          &.fade-leave-active {
            transition: all .3s ease-out
          }
          &.fade-enter,
          &.fade-leave-active {
            opacity: 0;
          }
        }

      }
      .serch-box{
        position: fixed;
        width:100%;
        height:100%;
        top:0;
        left:0;
        background-color: #fff;
        z-index:8891;
        display:none;
      }
    }
</style>
