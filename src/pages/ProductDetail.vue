<template>
<div class="">
  <layout>
    <x-body slot="body" class="product-detail">
      <split></split>
      <img class="product-logo" :src="productItem.Logo"/>
      <swiper :active="active" v-if="productItem.ImgArr.length !== 0" :pagination="true" @on-change="changeHandler" :options="options" class="swiper">
        <swiper-item v-for="(item,index) in productItem.ImgArr" :key="'photo'+index">
          <img :src="item" class="swiper-img" />
        </swiper-item>
      </swiper>
      <split></split>
      <div class="breif-info">
        <flexbox class="fr item-title">
          <flexbox-item class="fh">项目名称：</flexbox-item>
          <flexbox-item class="fb"><p>{{productItem.Name}}</p></flexbox-item>
        </flexbox>
        <flexbox class="fr add">
          <flexbox-item class="fh">项目地址：</flexbox-item>
          <flexbox-item class="fb" @click.native="openMap"><p>{{productItem.Address}}</p></flexbox-item>
        </flexbox>
        <flexbox class="fr tel">
          <flexbox-item class="fh">案场热线：</flexbox-item>
          <flexbox-item>
            <a :href="'tel:'+tel" v-for="(tel,index) in tels" :key="'link'+index">{{tel}}</a>
          </flexbox-item>
        </flexbox>
      </div>
      <split></split>
      <div class="base-info">
        <h3 class="item-title"><span>基本信息</span></h3>
        <flexbox class="fr" v-if="productItem.CoverArea">
          <flexbox-item class="fh">占地面积：</flexbox-item>
          <flexbox-item>{{productItem.CoverArea}}</flexbox-item>
        </flexbox>
        <flexbox class="fr" v-if="productItem.BuildingArea">
          <flexbox-item class="fh">建筑面积：</flexbox-item>
          <flexbox-item>{{productItem.BuildingArea}}</flexbox-item>
        </flexbox>
        <flexbox class="fr" v-if="productItem.EstateType">
          <flexbox-item class="fh">物业类型：</flexbox-item>
          <flexbox-item>{{productItem.EstateType}}</flexbox-item>
        </flexbox>
        <flexbox class="fr" v-if="productItem.EstateFee">
          <flexbox-item class="fh">物业费：</flexbox-item>
          <flexbox-item>{{productItem.EstateFee}}</flexbox-item>
        </flexbox>
        <flexbox class="fr" v-if="productItem.Decorate">
          <flexbox-item class="fh">装修状况：</flexbox-item>
          <flexbox-item>{{productItem.Decorate}}</flexbox-item>
        </flexbox>
        <flexbox class="fr" v-if="productItem.GreeningRatio">
          <flexbox-item class="fh">绿化率：</flexbox-item>
          <flexbox-item>{{productItem.GreeningRatio}}</flexbox-item>
        </flexbox>
        <flexbox class="fr" v-if="productItem.PlotRatio">
          <flexbox-item class="fh">容积率：</flexbox-item>
          <flexbox-item>{{productItem.PlotRatio}}</flexbox-item>
        </flexbox>
      </div>
      <split></split>
      <div class="detail-info" v-if="productItem.Content">
        <h3 class="item-title"><span>详细信息</span></h3>
        <container>
          <div class="content" v-html="productItem.Content"></div>
        </container>
        <split></split>
      </div>
      <div class="house-imgs" v-if="productItem.HouseImg">
        <h3 class="item-title"><span>户型图</span></h3>
        <container class="houseimg-wrapper">
          <row>
            <div class="house-item" v-for="(item,index) in productItem.HouseImg" :key="'img'+index">
              <x-img :loading="true" :src="item.Img"  :data-index="index" @load="loadHandler" @click="clickHandler"/>
              <p class="house-item-name">{{item.Name}}</p>
              <p class="house-item-area">{{item.Area}}</p>
            </div>
          </row>
        </container>
      </div>
      <footnav></footnav>
    </x-body>
  </layout>
  <preview :list="photoGallary" ref="preview"/>
</div>
</template>

<script>
import axios from 'axios'
import wx from 'weixin-js-sdk'
import {
  Layout,
  Flexbox,
  FlexboxItem,
  Footnav,
  XHeader,
  XBody,
  XLink,
  Icon,
  Split,
  XImg,
  Swiper,
  SwiperItem,
  Container,
  Row,
  Preview
} from 'components'
let windowWidth = window.innerWidth
export default {
  name: 'productdetail',
  components: {
    Layout,
    Flexbox,
    FlexboxItem,
    Footnav,
    XHeader,
    XBody,
    XLink,
    Icon,
    Split,
    XImg,
    Swiper,
    SwiperItem,
    Container,
    Row,
    Preview
  },
  data () {
    return {
      active: 0,
      options: {
        speed: 500,
        lazyloading: true,
        observer: true,
        observeParents: true,
        loop:true
      },
      productItem: {
        ImgArr: [],
        Tel: ''
      },
      photoGallary: []
    }
  },
  computed: {
    tels () {
      let arr =[]
      if (this.productItem.Tel.indexOf('/') !== -1) {
        arr = this.productItem.Tel.split('/')
      } else {
        arr = [this.productItem.Tel]
      }
      return arr
    }
  },
  props: {},
  created () {
    this.fetch()
  },
  methods: {
    fetch (cb) {
      axios({
        method: 'post',
        url: '/Mobile-PostAPI',
        data: {
          Logic: 'Rent',
          Name: 'GetModel',
          Data: JSON.stringify({
            ID: this.$route.query.id
          })
        }
      }).then((res) => {
        // banner图
        for (var k= 0; k< res.data.Data.ImgArr.length; k++) {
          res.data.Data.ImgArr[k] = res.data.Data.ImgArr[k].replace(/\S*\/UploadFiles\//g, 'http://fuxinghuiyu.1juke.cn/UploadFiles/')
        }
        // 户型图
        if (res.data.Data.HouseImg) {
          res.data.Data.HouseImg = res.data.Data.HouseImg.replace(/\/UploadFiles\//g, 'http://fuxinghuiyu.1juke.cn/UploadFiles/')
          res.data.Data.HouseImg = JSON.parse(res.data.Data.HouseImg)
        }
        // 详细内容
        res.data.Data.Content = res.data.Data.Content.replace(/\bsrc=\S*\/plmnhytf12f3\/\b/g,'src="http://www.whfxhy.com/plmnhytf12f3/')
        // Logo
        res.data.Data.Logo = res.data.Data.Logo.replace(/\S*\/UploadFiles\//g, 'http://fuxinghuiyu.1juke.cn/UploadFiles/')
        this.productItem = res.data.Data
        cb&&cb(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    changeHandler (value) {
      this.active = value
    },
    loadHandler (e) {
      let img = e.target
      let natural = {
        w: img.naturalWidth,
        h: img.naturalHeight
      }
      let item = {
        src: img.src,
        w: natural.w > windowWidth ? windowWidth : natural.w,
        h: natural.w > windowWidth ? natural.h / natural.w * windowWidth : natural.h
      }
      this.photoGallary[e.target.parentNode.dataset.index] = item
    },
    clickHandler (e) {
      this.$refs.preview.open(parseInt(e.target.parentNode.dataset.index))
    },
    openMap () {
      wx.openLocation({
        latitude: parseFloat(this.productItem.Point_y), // 纬度，浮点数，范围为90 ~ -90
        longitude: parseFloat(this.productItem.Point_x), // 经度，浮点数，范围为180 ~ -180。
        name: this.productItem.Name, // 位置名
        address: this.productItem.Address, // 地址详情说明
        scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      })
    }
  }
}
</script>

<style lang="scss">
@import '~styles/variable.scss';
@import '~styles/mixins.scss';
.product-detail{
  background-color: #fff;
  .product-logo{
    display:block;
    height:4rem;
    padding:5px;
    margin:0 auto;
  }
  .swiper{
    width:100%;
    height:10rem;
    .swiper-img{
      width:100%;
      height:100%;
    }
  }
  .item-title{
    padding:8px 10px;
    @include _1px;
    span{
      color:#888;
      font-size:.64rem;
    }
  }
  .breif-info,
  .base-info,
  .detail-info{
    font-size:.64rem;
    @include _1px;
    .fr:last-child{
      background:none;
    }
  }
  .content{
    padding:10px 0 20px;
    p{
      font-size:.6rem;
      color:$sub-color;
      line-height:1.7;
    }
  }
  .fr{
    padding:12px 10px;
    @include _1px;
    &.add,
    &.tel{
      position: relative;
      padding-right:30px;
      &:after{
        @include arrow;
        right:14px;
        margin-top:-4px;
      }
    }
    &.tel{
      a{
        display:block;
        margin-top:5px;
        margin-right: 8px;
        color:#333;
        &:first-child{
          margin-top: 0;
        }
      }
    }
    .fh{
      flex:0 0 3.5rem;
      color:#888;
      font-weight:200;
    }
    .fb{
      p{
        line-height:1.2
      }
    }
  }
  .house-imgs{
    padding-bottom:20px;
    .houseimg-wrapper{
      padding:10px;
      .row{
        margin-left:-5px;
        margin-right:-5px;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
      }
      .house-item{
        display:inline-block;
        margin:0 5px;
        width:35%;
        .img-wrapper{
          text-align:center;
          img{
            max-height:3rem;
          }
        }
        .house-item-name,
        .house-item-area{
          color:#888;
          text-align:center;
          font-size:.512rem;
          line-height:1.5
        }
      }
    }
  }
}
</style>
