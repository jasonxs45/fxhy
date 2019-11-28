<template>
  <div>
    <swiper :active="active" :pagination="true" @on-change="changeHandler" :options="options" class="swiper">
      <swiper-item v-for="(item,index) in banners" :key="'swiper'+index">
        <img class="swiper-img" :src="item.src"/>
      </swiper-item>
    </swiper>
    <container class="enter5">
      <row>
        <flexbox>
          <flexbox-item>
            <x-link href="/pages/introduction"><img src="static/images/e0.png"/></x-link>
          </flexbox-item>
          <flexbox-item>
            <x-link href="/pages/products"><img src="static/images/e1.png"/></x-link>
          </flexbox-item>
          <flexbox-item>
            <x-link href="/pages/shoppingmall"><img src="static/images/e2.png"/></x-link>
          </flexbox-item>
          <flexbox-item>
            <x-link href="/pages/message">
              <img src="static/images/e3.png"/>
            </x-link>
          </flexbox-item>
          <flexbox-item>
            <x-link href="/pages/servicetel">
              <img src="static/images/e4.png"/>
            </x-link>
          </flexbox-item>
          <flexbox-item style="display:none">
            <a @click="waiting">
              <img src="static/images/e5.png"/>
            </a>
          </flexbox-item>
        </flexbox>
      </row>
    </container>
    <split></split>
    <div class="enter-news">
      <h3 class="title"><span class="icon"></span><span class="text">新闻动态</span></h3>
      <ptlist :list="list">
        <ptlistitem
          v-for="(item,index) in list"
          :src="item.SmallImg"
          :title="item.Title"
          :content="item.ShortContent"
          :date="item.UpTime|formatDate"
          :uid="item.Id"
          :key="'item'+index"
          @click="toNewsdetail"
        ></ptlistitem>
      </ptlist>
      <x-link href="/pages/newslist"><div class="check-more">查看更多<icon>&#xe65f;</icon></div></x-link>
    </div>
    <split></split>
    <div class="map">
      <h3 class="title"><span class="icon"></span><span class="text">福星惠誉的中国版图</span></h3>
      <div class="map-img">
        <img src="static/images/map.jpg" alt="" @click="$router.push({name: 'products'})">
      </div>
    </div>
    <split></split>
    <!-- <div class="enter-block">
      <img src="static/images/e6.png" @click="waiting" />
    </div>
    <div class="enter-block">
      <x-link href="/pages/readings"><img src="static/images/e7.png" /></x-link>
    </div> -->
    <footnav></footnav>
  </div>
</template>

<script>
import {
  XLink,
  Flexbox,
  FlexboxItem,
  XImg,
  Icon,
  Swiper,
  SwiperItem,
  Container,
  Row,
  Split,
  Ptlist,
  Ptlistitem,
  Footnav
} from 'components'
import { formatDate } from 'utils/date'
import axios from 'axios'
import api from '../api'
let windowWidth = window.innerWidth
export default {
  name: 'home',
  components: {
    XLink,
    Flexbox,
    FlexboxItem,
    XImg,
    Icon,
    Swiper,
    SwiperItem,
    Container,
    Row,
    Split,
    Ptlist,
    Ptlistitem,
    Footnav
  },
  data () {
    return {
      banners: [
        {
          src: 'static/images/banner-1.png'
        },
        {
          src: 'static/images/banner-2.png'
        },
        {
          src: 'static/images/banner-3.png'
        }
      ],
      tabbarActive: 0,
      active: 0,
      options: {
        speed: 500,
        lazyloading: true
      },
      list: []
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time.replace(/-/g, '/'))
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  created () {
  },
  mounted () {
    axios.post('/Mobile-PostAPI',
      {
        Logic: 'WebNews',
        Name: 'GetList',
        Data: JSON.stringify({_Top: 3, S_Class: 6})
      }).then((res) => {
        for (var k= 0; k< res.data.Data.length; k++) {
          res.data.Data[k].SmallImg = res.data.Data[k].SmallImg.replace(/\S*\/plmnhytf12f3\//g,'http://www.whfxhy.com/plmnhytf12f3/')
        }
        this.list = res.data.Data
      }).catch((err) => {
        console.log(err);
      })
  },
  methods: {
    loadHandler (e) {
      let img = e.target
      let natural = {
        w: img.naturalWidth,
        h: img.naturalHeight
      }
      let item = {
        src: img.src,
        w: natural.w > windowWidth ? windowWidth : img.w,
        h: natural.w > windowWidth ? natural.h / natural.w * windowWidth : img.h
      }
      this.images.push(item)
    },
    changeHandler (value) {
      this.active = value
    },
    toNewsdetail (value) {
      this.$router.push({name: 'newsdetail', query: { id: value }})
    },
    waiting () {
       window.$alert({
          content: `<img src="static/images/wait.png" style="width:50%"/>
                    <p style="margin-top:20px">资料添加中</p>`
        })
    }
  }
}
</script>

<style lang="scss">
@import '~styles/variable.scss';
@import '~styles/mixins.scss';
  .swiper{
    width:100%;
    height:15.787rem;
    .swiper-img{
      width:100%;
      height:100%;
      object-fit: cover;
      &>img{
        width:100%;
        height:100%;
      }
    }
  }
  .enter5{
    padding:0 !important;
    .row{
      margin-left:0;
      margin-right:0;
    }
    .flexbox-item{
      a{
        display:block;
        width:100%;
        height:100%;
      }
    }
  }
  .enter-news, .map{
    background: #fff;
    >.title{
      font-size:0;
      padding-top:.64rem;
      padding-left:10px;
      .icon,.text{
        display:inline-block;
        vertical-align:top;
        line-height:.64rem;
      }
      .icon{
        width:.6rem;
        height:.6rem;
        background:$primary-color;
        margin-right:5px;
      }
      .text{
        font-size:.768rem;
        color:$title-color;
      }
    }
  }
  .map{
    .map-img{
      text-align: center;
      padding: 20px 0;
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
    }
  }
  .enter-block{
    text-align:center;
    margin:0 0 10px;
  }
</style>
