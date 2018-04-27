<template>
<div class="">
  <layout>
    <x-body slot="body">
      <swiper :active="active" :pagination="true" @on-change="changeHandler" :options="options" class="swiper">
        <swiper-item v-for="(item,index) in banners" :key="'swiper'+index">
          <img class="swiper-img" :src="item.src"/>
        </swiper-item>
      </swiper>
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
      <div class="check-more" @click="addNews" v-if="moreTag">查看更多<icon>&#xe65f;</icon></div>
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
  XBody,
  Swiper,
  SwiperItem,
  Ptlist,
  Footnav,
  Ptlistitem,
  XLink,
  Icon
} from 'components'
import { formatDate } from 'utils/date'
let page = 1
export default {
  name: 'newslist',
  components: {
    Layout,
    XBody,
    Swiper,
    SwiperItem,
    Footnav,
    Ptlist,
    Ptlistitem,
    XLink,
    Icon
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
      list: [],
      options: {
        speed: 500,
        lazyloading: true,
        observer: true
      },
      active: 0,
      total: 0
    }
  },
  computed: {
    moreTag () {
      return this.list.length < this.total
    }
  },
  created () {
    this.fetch()
  },
  filters: {
    formatDate (time) {
      let date = new Date(time.replace(/-/g, '/'))
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  methods: {
    fetch (page= 1, cb) {
      axios.post('/Mobile-PostAPI', {
        Logic: 'WebNews',
        Name: 'GetList',
        Data: JSON.stringify({_PageSize: 10, _PageIndex:page, S_Class: 6})
      }).then((res) => {
        for (var k= 0; k< res.data.Data.length; k++) {
          res.data.Data[k].SmallImg = res.data.Data[k].SmallImg.replace(/\S*\/plmnhytf12f3\//g,'http://www.whfxhy.com/plmnhytf12f3/')
        }
        this.list = this.list.concat(res.data.Data)
        this.total = res.data.DataCount
      }).catch((err) => {
        console.log(err);
      })
    },
    changeHandler (value) {
      this.active = value
    },
    toNewsdetail (value) {
      this.$router.push({name: 'newsdetail', query: { id: value }})
    },
    addNews () {
      page ++
      this.fetch(page)
    }
  }
}
</script>

<style lang="scss">
@import '~styles/variable.scss';
@import '~styles/mixins.scss';
.swiper{
  width:100%;
  height:6.4rem;
  .swiper-img{
    width:100%;
    height:100%;
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
</style>
