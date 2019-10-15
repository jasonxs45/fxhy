<template>
  <div class="">
    <layout>
      <x-body slot="body" class="video">
        <div class="video-title">
          <span class="icon"></span>
          <span class="text">福星视频</span>
        </div>
        <div class="video-panel" v-for="(item,index) in list" :key="'item'+index">
          <container>
            <div class="title">{{item.vTitle}}</div>
            <!-- <div class="v-wrapper" v-html="item.vSrc"></div> -->
            <div class="v-wrapper">
              <video
                controls="controls"
                playsinline
                webkit-playinline
                :src="item.zSrc"
                :poster="item.pSrc"
                width="100%"
                :key="'video'+index"></video>
            </div>
          </container>
        </div>
        <footnav></footnav>
      </x-body>
    </layout>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import {
  Layout,
  Container,
  XBody,
  Footnav
} from 'components'
export default {
  name: 'Xvideo',
  components: {
    Layout,
    Container,
    XBody,
    Footnav
  },
  data() {
    return {
      list: [
        {
          vTitle: '福星惠誉企业品牌宣传片',
          pSrc: 'static/images/cover1.png',
          zSrc:'http://cdn.juzhen.net/2018/fxhysource/introduce2018v2.mp4'
        },
        // {
        //   vTitle: '福星惠誉大爱武汉宣传片',
        //   pSrc: 'static/images/cover2.png',
        //   zSrc:'http://cdn.juzhen.net/2018/fxhysource/imagev2.mp4'
        // },
        {
          vTitle: '福星惠誉大爱武汉5周年回顾',
          pSrc: 'static/images/5years.png',
          zSrc:'http://cdn.juzhen.net/2018/fxhysource/5years.mp4'
        }
      ]
    }
  },
  computed: {
  },
  created() {
    // this.fetch()
  },
  methods: {
    fetch(page = 1, cb) {
    }
  }
}
</script>

<style lang="scss">
@import '~styles/variable.scss';
@import '~styles/mixins.scss';
.video {
  background-color: #fff;
  .video-title {
    font-size: 0;
    background: #fff;
    padding: 12px 10px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .2);
    .icon,
    .text {
      display: inline-block;
    }
    .icon {
      width: 10px;
      height: 10px;
      background: $primary-color;
      margin-right: 5px;
    }
    .text {
      font-size: 16px;
    }
  }
  .video-panel {
    margin: 1rem auto;
    padding-bottom: 1rem;
    @include _1px;
    .title {
      color: $sub-color;
      font-size: .7rem;
      margin: .5rem 0;
      border-left: 4px solid $sub-color;
      padding-left: 8px;
    }
    .v-wrapper{
      video{
        display: block;
        background: #ccc;
        width: 100%;
      }
    }
  }
}
</style>
