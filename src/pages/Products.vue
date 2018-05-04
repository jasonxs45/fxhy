<template>
<div class="">
  <layout>
    <x-body slot="body">
      <split></split>
      <tab :active="active" class="product-tab" @on-change="changeHandler">
        <tab-item>国内项目</tab-item>
        <tab-item>国外项目</tab-item>
      </tab>
      <div class="inland" v-show="active === 0">
        <div class="item" v-for="(item,index) in list1" @click="toDetail(item.ID)" :key="'item'+index">
          <div class="item-wrapper">
            <div class="img"><img :src="item.ImgArr[0]"/></div>
            <div class="item-info">
              <div class="logo">
                <x-img class="logo-img" :src="item.Logo" :loading="true"/>
              </div>
              <div class="content">
                <p class="tel">
                  <span class="icon"></span>
                  <span class="text">{{item.Tel}}</span>
                </p>
                <p class="address">
                  <span class="icon"></span>
                  <span class="text">{{item.Address}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="check-more" @click="addList1" v-if="moreTag1">查看更多<icon>&#xe65f;</icon></div>
      </div>
      <div class="outland"  v-show="active === 1">
        <div class="item" v-for="(item,index) in list2" @click="toDetail(item.ID)" :key="'item'+index">
          <div class="item-wrapper">
            <div class="img">
              <img :src="item.ImgArr[0]"/>
            </div>
            <div class="item-info">
              <div class="content">
                <div class="line"></div>
                <div class="title">{{item.Name}}</div>
                <div class="line"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="check-more" @click="addList2" v-if="moreTag2">查看更多<icon>&#xe65f;</icon></div>
      </div>
      <footnav></footnav>
    </x-body>
  </layout>
  <!-- <router-view></router-view> -->
</div>
</template>

<script>
import axios from 'axios'
import {
  Layout,
  XHeader,
  XBody,
  Tab,
  TabItem,
  Footnav,
  XLink,
  Icon,
  Split,
  XImg
} from 'components'
export default {
  name: 'products',
  components: {
    Layout,
    XHeader,
    XBody,
    Tab,
    TabItem,
    Footnav,
    XLink,
    Icon,
    Split,
    XImg
  },
  data () {
    return {
      list1: [],
      list2: [],
      pageIndex1: 1,
      pageIndex2: 1,
      total1: 0,
      total2: 0,
      active: 0
    }
  },
  created () {
    this.fetch(1, 10, this.pageIndex1, (res) => {
      this.list1 = this.list1.concat(res.data.Data)
      this.total1 = res.data.DataCount
    })
    this.fetch(2, 10, this.pageIndex2, (res) => {
      this.list2 = this.list2.concat(res.data.Data)
      this.total2 = res.data.DataCount
    })
  },
  computed: {
    moreTag1 () {
      return this.list1.length < this.total1
    },
    moreTag2 () {
      return this.list2.length < this.total2
    }
  },
  methods: {
    fetch (id, pageSize= 10, curPage= 1, cb, tar) {
      axios({
        method: 'post',
        url: '/Mobile-PostAPI',
        data: {
          Logic: 'Rent',
          Name: 'GetList',
          Data: JSON.stringify({
            _PageSize: pageSize,
            _PageIndex: curPage,
            S_Class: id
          })
        }
      }).then((res) => {
        for (var k= 0; k< res.data.Data.length; k++) {
          res.data.Data[k].ImgArr[0] = res.data.Data[k].ImgArr[0].replace(/\S*\/UploadFiles\//g, 'http://fuxinghuiyu.1juke.cn/UploadFiles/')
          res.data.Data[k].Logo = res.data.Data[k].Logo.replace(/\S*\/UploadFiles\//g, 'http://fuxinghuiyu.1juke.cn/UploadFiles/')
        }
        cb&&cb(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    addList1 () {
      this.pageIndex1++
      this.fetch(1, 10, this.pageIndex1, (data) => {
        this.list1 = this.list1.concat(data.Data)
      })
    },
    addList2 () {
      this.pageIndex2++
      this.fetch(2, 10, this.pageIndex2, (data) => {
        this.list2 = this.list1.concat(data.Data)
      })
    },
    changeHandler (value) {
      this.active = value
    },
    toDetail (id) {
      this.$router.push({name: 'productdetail', query: { id: id }})
    }
  }
}
</script>

<style lang="scss">
@import '~styles/variable.scss';
@import '~styles/mixins.scss';
.product-tab{
  .tab-item{
    color:$sub-color;
    font-size:16px;
    height:40px;
    line-height:40px;
    box-shadow:0 0 2px 0 rgba(0,0,0,.3);
    background: linear-gradient(to bottom,#fff 0%,#ddd 100%);
    transition:all .2s;
    &-active{
      background:$primary-color;
      color:#b6d9ff;
      box-shadow:0 0 10px 0 rgba(0,0,0,.2) inset;
    }
  }
}
.inland{
  .item{
    background: #fff;
    margin:10px 0;
    box-shadow:0 1px 1px 0 rgba(0,0,0,.2);
    position: relative;
    &:before{
      content:'';
      @include _1px;
      height:1px;
      top:0;
      display:block;
    }
    .item-wrapper{
      &>.img{
        max-height:10rem;
        overflow: hidden;
      }
    }
    .item-info{
      display:flex;
      padding:10px;
      .logo{
        width:5.5rem;
        margin-left:-10px;
        padding:0 10px;
        display:-webkit-box;
        -webkit-box-align:center;
        -webkit-box-pack:center;
        .logo-img{
          img{
            max-height:2.2rem;
          }
        }
      }
      .content{
        flex:1;
        padding:0 10px;
        margin-right:-10px;
        @include _1px-vertical($text-color);
        .tel,.address{
          display:flex;
          .icon,
          .text{
            display:block;
          }
          .text{
            font-size:.6rem;
            color:$sub-color;
            font-weight:200;
            line-height:1.5;
            flex:1;
          }
          .icon{
            width:.9rem;
            height:.9rem;
            margin-right:5px;
            background:center no-repeat;
            background-size: auto 70%;
          }
        }
        .tel{
          .icon{
            background-image:url(../../static/images/i5-1.png);
          }
        }
        .address{
          .icon{
            background-image:url(../../static/images/i6-1.png);
          }
        }
      }
    }
  }
}
.outland{
  .item{
    background: #fff;
    margin:10px 0;
    box-shadow:0 1px 1px 0 rgba(0,0,0,.2);
    position: relative;
    &:before{
      content:'';
      @include _1px;
      height:1px;
      top:0;
      display:block;
    }
    .item-wrapper{
      &>.img{
        max-height:10rem;
        overflow: hidden;
      }
    }
    .item-info{
      .content{
        padding:15px 10px;
        display:flex;
        display:-webkit-box;
        -webkit-box-pack:center;
        -webkit-box-align:center;
        .title{
          font-size:16px;
          color:$primary-color;
          font-weight:200;
          margin:0 5px;
        }
        .line{
          height:1px;
          flex:1;
          @include _1px($primary-color);
        }
      }
    }
  }
}
.check-more{
  font-size:.55rem;
  color:$sub-color;
  font-weight:200;
  text-align:center;
  padding:10px;
  .iconfont{
    font-size:.512rem;
    color:$primary-color;
  }
}
</style>
