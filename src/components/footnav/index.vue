<template>
  <div :class="classes">
    <div class="side-menu">
      <div class="side-menu-wrapper">
        <sidebar @on-change="changeHandler" :active="active" class="sidebar">
          <sidebar-item @click="sidebarc" class="noarrow">
            <accordion title="首页" :showing="true" :index="0" @title-click="goHome">
              <span slot="title-icon" class="title-icon" :class="['i'+4]"></span>
            </accordion>
          </sidebar-item>
          <sidebar-item @click="sidebarc">
            <accordion title="识星企" :showing="false" :index="1">
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
                    <!-- <x-link href="/pages/readings">星视界</x-link> -->
                    <a href="http://whbaidu.com/2016/FxhySsci/index.shtml">星视界</a>
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
            <accordion title="买星品" :showing="false" :index="2">
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
            <accordion title="客户服务" :showing="false" :index="3">
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
            <accordion title="快捷菜单" :showing="false" :index="4">
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
      </div>
    </div>
    <div class="footer">
      <p class="tel">
        <span class="text">福星惠誉控股有限公司</span>
        <!-- <span class="icon icon-tel"></span> -->
        <!-- <span class="text">0086—027—85350028</span> -->
      </p>
      <p class="address">
        <span class="icon icon-add"></span>
        <span class="text">中国·武汉 新华路186号福星国际商会大厦</span>
      </p>
      <p class="laws"><span class="text" @click="seeLaws">法律声明</span></p>
      <p class="powerby">
        Powered By
        <span>Matrix</span>
      </p>
    </div>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem } from '../flexbox'
import { Sidebar, SidebarItem } from '../sidebar'
import Icon from '../icon'
import { Accordion } from '../accordion'
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
    classes() {
      return ['footnav']
    }
  },
  data() {
    return {
      menuShow: false,
      active: 0,
      menushowing: [
        true, false, false, false
      ],
      lawsShow: false,
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
    backHandler() {
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
    showMenu() {
      this.menuShow = !this.menuShow
      this.$emit('showMenu')
    },
    sidebarc(o, a, i) {
      // if (i === 3) {
      //   window.$alert({
      //     content: `<img src="static/images/wait.png" style="width:50%"/>
      //               <p style="margin-top:20px">资料添加中</p>`
      //   })
      //   return
      // }
      if (o.$parent.$children[i].active && o.$parent.$children[i].$children[0].showBool) {
        o.$parent.$children[i].active = false
        o.$parent.$children[i].$children[0].showBool = false
      } else {
        for (var k = 0; k < o.$parent.$children.length; k++) {
          o.$parent.$children[k].active = false
          o.$parent.$children[k].$children[0].showBool = false
        }
        o.$parent.$children[i].active = true
        o.$parent.$children[i].$children[0].showBool = true
      }
    },
    accordClick(o, a) {
    },
    changeHandler(value) {
      this.active = value
    },
    linkClick() {
      this.showMenu()
      return false
    },
    waiting() {
      window.$alert({
        content: `<img src="static/images/wait.png" style="width:50%"/>
                    <p style="margin-top:20px">资料添加中</p>`
      })
    },
    goHome() {
      this.$router.push({ name: 'home' })
      this.showMenu()
    },
    seeLaws () {
      this.$router.push({
        name: 'laws'
      })
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
.footnav {
  background: $primary-color;
  position: relative;
  color: #ffffff;
  .side-menu {
    .side-menu-wrapper {
      .sidebar {
        font-size: .6rem;
        .sidebar-item {
          .accordion {
            .menu-item,
            .title {
              padding: .64rem;
              text-align: left
            }
            .title {
              font-size: 0 !important;
              position: relative !important;
              @include _1px(#fff);
              .title-icon,
              .text {
                font-size: .72rem;
                display: inline-block;
                vertical-align: middle
              }
              .title-icon {
                margin-right: .6rem;
                width: .64rem;
                height: .64rem;
                background: center no-repeat;
                background-size: cover;
                &.i0 {
                  background-image: url(../../../static/images/i1_1.png);
                }
                &.i1 {
                  background-image: url(../../../static/images/i2_1.png);
                }
                &.i2 {
                  background-image: url(../../../static/images/i3_1.png);
                }
                &.i3 {
                  background-image: url(../../../static/images/i4_1.png);
                }
                &.i4 {
                  background-image: url(../../../static/images/i9_1.png);
                }
              }
            }
            .menu-item {
              a {
                display: block;
                color: #fff;
                padding-left: 1.24rem;
                font-weight: 200;
                position: relative;
                &:before {
                  content: '';
                  display: block;
                  width: 6px;
                  height: 6px;
                  background: #ff5500;
                  position: absolute;
                  border-radius: 50%;
                  left: .5rem;
                  top: 50%;
                  margin-top: -3px;
                }
              }
            }
          }
          &:before{
            top:.8rem !important;
          }
          &-active {
            background: $primary-color;
            .accordion {
              .title {
                &:before {
                  display: block;
                }
                .title-icon {
                  margin-right: .6rem;
                  width: .64rem;
                  height: .64rem;
                  background: center no-repeat;
                  background-size: cover;
                  &.i0 {
                    background-image: url(../../../static/images/i1_1.png);
                  }
                  &.i1 {
                    background-image: url(../../../static/images/i2_1.png);
                  }
                  &.i2 {
                    background-image: url(../../../static/images/i3_1.png);
                  }
                  &.i3 {
                    background-image: url(../../../static/images/i4_1.png);
                  }
                  &.i4 {
                    background-image: url(../../../static/images/i9_1.png);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .footer {
    background: $primary-color;
    padding: 10px;
    .tel,
    .address,
    .laws {
      text-align: center;
      font-size: 0;
      margin: 10px 0;
      .icon {
        display: inline-block;
        vertical-align: top;
        width: .64rem;
        height: .64rem;
        margin-right: 6px;
        &.icon-tel,
        &.icon-add {
          background: center no-repeat;
          background-size: auto 100%;
        }
        &.icon-tel {
          background-image: url(../../../static/images/i5.png);
        }
        &.icon-add {
          background-image: url(../../../static/images/i6.png);
        }
      }
      .text {
        display: inline-block;
        vertical-align: top;
        color: #fff;
        font-size: .55rem;
        font-weight: 100;
        line-height: .64rem;
      }
    }
    .laws {
      .text{
        text-decoration: underline;
      }
    }
    .powerby {
      margin-top: 20px;
      font-size: .55rem;
      color: #fff;
      font-weight: 200;
      text-align: center;
      &>span {
        color: $error-color
      }
    }
  }
}
</style>
