<template>
  <li class="ptlist-item" @click="clickHandler">
      <x-img :src="src?src:'static/images/fn1.jpg'" class="avator" :loading="true"/>
      <div class="text-wrapper">
        <h4 class="title">{{title}}</h4>
        <div class="content" v-html="content"></div>
        <span class="date">{{date}}</span>
      </div>
  </li>
</template>

<script>
import XImg from 'components/img'
export default {
  name: 'ptlistitem',
  components: {
    XImg
  },
  computed: {
    classes () {
      return ['ptlist']
    }
  },
  props: {
    src: {
      type: String,
      default: 'static/images/fn1.jpg'
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    date: {
      type: String
    },
    uid: {
      type: [String, Number]
    }
  },
  methods: {
    clickHandler () {
      console.log(this.uid)
      this.$emit('click', this.uid)
    }
  },
  data () {
    return {
    }
  },
  mounted () {}
}
</script>
<style lang="scss">
@import '~styles/variable.scss';
@import '~styles/mixins.scss';
.ptlist{
      .ptlist-item{
        width:100%;
        padding:0 10px 15px;
        margin-top:15px;
        display:flex;
        @include _1px;
        .avator{
          display:block;
          width:3.2rem;
          height:2.56rem;
          margin-right:10px;
          text-align:center;
        }
        .text-wrapper{
          flex:1;
          min-width:0;
          position: relative;
          text-align:left;
          .title{
            font-size:.6rem;
            color:$primary-color;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
          .content{
            color:$sub-color;
            font-size:.55rem;
            line-height:1.4;
            margin-top:5px;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            min-height:1rem;
          }
          .date{
            position: absolute;
            right:0;
            color:$thr-color;
            font-size:.512rem;
          }
        }
      }
    }
</style>
