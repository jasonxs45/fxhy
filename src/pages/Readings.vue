<template>
<div class="">
  <layout>
    <x-body slot="body" class="readings">
      <img src="static/images/xsj.png" />
      <container>
        <div class="book-table" v-for="(items,index) in bookTab" :key="'table'+index">
          <x-img :src="item.Img" v-for="(item,index) in items" @click="outLink" :key="'img'+index"/>
        </div>
      </container>
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
  Container,
  XBody,
  XLink,
  Icon,
  XImg,
  Footnav
} from 'components'
export default {
  name: 'readings',
  components: {
    Layout,
    Container,
    XBody,
    XLink,
    Icon,
    XImg,
    Footnav
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
    bookTab () {
      let arr = []
      for (var i= 0; i< this.list.length; i+= 3) {
        arr.push(this.list.slice(i, i+3))
      }
      return arr
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      axios.post('/Mobile-PostAPI', {
        Logic: 'StarHorizon',
        Name: 'GetList',
        Data: JSON.stringify({})
      }).then((res) => {
        for (var k= 0; k< res.data.Data.length; k++) {
          res.data.Data[k].Img = res.data.Data[k].Img.replace(/\S*\/UploadFiles\//g, 'http://fuxinghuiyu.1juke.cn/UploadFiles/')
        }
        this.list = this.list.concat(res.data.Data)
      }).catch((err) => {
        console.log(err);
      })
    },
    outLink () {
      location.href='http://whbaidu.com/2016/FxhySsci/index.shtml'
    }
  }
}
</script>

<style lang="scss">
@import '~styles/variable.scss';
@import '~styles/mixins.scss';
.readings{
  .book-table{
    display:flex;
    display:-webkit-box;
    // -webkit-box-pack:;
    width:100%;
    min-height: 4rem;
    padding:0 1rem 2.4rem;
    margin:20px 0;
    background:url(../../static/images/booktab.png) bottom center no-repeat;
    background-size: 100% auto;
    .img-wrapper{
      width:calc(33% - 10px);
      margin:0 6px;
      background:#fff;
      box-shadow:2px 2px 4px 0 rgba(0,0,0,.4)
    }
  }
}
</style>
