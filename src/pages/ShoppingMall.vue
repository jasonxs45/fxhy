<template>
<div class="">
  <layout>
    <x-body slot="body" style="background:#fff">
      <split></split>
      <tab :active="activeTab" class="product-tab" @on-change="tabChangeHandler">
        <tab-item>群星城</tab-item>
        <tab-item>漫时区</tab-item>
      </tab>
      <split></split>
      <div class="" v-show="activeTab === 0">
        <div class="item">
          <div class="item-wrapper">
            <swiper :active="active1" v-if="item1.itemImgs.length !== 0" :pagination="true" @on-change="changeHandler1" :options="options" class="swiper">
              <swiper-item v-for="(item,index) in item1.itemImgs" :key="'photo1'+index">
                <img :src="item" class="swiper-img" />
              </swiper-item>
            </swiper>
            <div class="item-info">
              <container>
                <div class="content" v-html="item1.itemContent"></div>
              </container>
            </div>
          </div>
        </div>
      </div>
      <div class=""  v-show="activeTab === 1">
        <div class="item">
          <div class="item-wrapper">
            <swiper :active="active2" v-if="item2.itemImgs.length !== 0" :pagination="true" @on-change="changeHandler2" :options="options" class="swiper">
              <swiper-item v-for="(item,index) in item2.itemImgs" :key="'photo2'+index">
                <img :src="item" class="swiper-img" />
              </swiper-item>
            </swiper>
            <div class="item-info">
              <container>
                <div class="content" v-html="item2.itemContent"></div>
              </container>
            </div>
          </div>
        </div>
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
  XHeader,
  XBody,
  Tab,
  TabItem,
  XLink,
  Icon,
  Split,
  XImg,
  Swiper,
  SwiperItem,
  Footnav
} from 'components'
export default {
  name: 'shoppingmall',
  components: {
    Layout,
    Container,
    XHeader,
    XBody,
    Tab,
    TabItem,
    XLink,
    Icon,
    Split,
    XImg,
    Swiper,
    SwiperItem,
    Footnav
  },
  data () {
    return {
      activeTab: 0,
      active1: 0,
      active2: 0,
      options: {
        speed: 500,
        lazyloading: true,
        loop: true,
        observer: true,
        observeParents: true
      },
      item1:{
        itemImgs: [
          'static/images/qxc0.jpg',
          'static/images/qxc1.jpg',
          'static/images/qxc2.jpg',
          'static/images/qxc3.jpg',
          'static/images/qxc4.jpg',
          'static/images/qxc5.jpg',
          'static/images/qxc6.jpg',
          'static/images/qxc7.jpg',
          'static/images/qxc8.jpg',
          'static/images/qxc9.jpg'
        ],
        itemContent: `<dl><dt>项目名称：群星城项目</dt>
                    <dd>地址：徐东大街120号（徐东大街与团结大道交汇处）</dd>
                    <dd>销售热线：027-86816188</dd>
                    <dt>项目介绍：</dt>
                    <dd>福星惠誉·群星城是峡谷式生态主题购物街区，源自日本理念，10万方规模的原生态时尚街区，让人们置身其中体验国际理念的人性化购物环境。“群星城”以“绿色生态建筑”和“时间消费型”两大创新理念，获得华中区 “2013年度中国城市商业新地标”的殊荣。</dd></dl>`
      },
      item2: {
          itemImgs: [
            'static/images/msq0.jpg',
            'static/images/msq1.jpg',
            'static/images/msq2.jpg',
            'static/images/msq3.jpg',
            'static/images/msq4.jpg',
            'static/images/msq5.jpg',
            'static/images/msq6.jpg',
            'static/images/msq7.jpg',
            'static/images/msq8.jpg',
            'static/images/msq9.jpg',
            'static/images/msq10.jpg'
          ],
          itemContent: `<dl><dt>项目名称：漫时区</dt>
                      <dd>地址：武汉友谊大道隧道口（沙湖车管所对面）</dd>
                      <dd>销售热线：027-86721111</dd>
                      <dt>项目简介</dt>
                      <dd><p>福星惠誉•漫时区位于武昌滨江商务区，西北临和平大道，东北临武车路，东南临友谊大道，西南紧邻长江隧道出口，南距沙湖大桥约1公里，地铁2号线和规划中的7号线站点经过，交通方便快捷。</p></dd>
                      <dt>项目定位</dt>
                      <dd><p>关键词【特色】【精致】【乐趣】【创意】</p></dd>
                      <dd><p>项目覆盖范围主要为周边2公里的中高端商务人群、企事业单位人员、学生及周边高端社 区居民等人群。集潮流名品、娱乐休闲、精品餐饮、创意体验于一体的具有特色性、时尚性、趣味性的精致商业街区。总建筑面积约4万方,整体建筑风格简约现代，丰富业态与特色品牌相融合，全开放式结构，打造别具一格的精致休闲空间。</p></dd>
                      <dd><p>福星惠誉•漫时区是一个由共6座建筑组成的低密度开放式商业街区，开放式小径与城市主干道、小区车行道、人行道灵活互动，形成人流上导向、形态上协调、功能上互补、空间上延续。街内空中连廊、观光电梯、景观楼梯，形成立体网状交通动线，从顶层到一层过渡自然，聚集庞大客流量，保证消费者的最大逗留时间。</p></dd></dl>`
      }
    }
  },
  created () {
  },
  methods: {
    fetch (cb) {
    },
    tabChangeHandler (value) {
      this.activeTab = value
    },
    changeHandler1 (value) {
      this.active1 = value
    },
    changeHandler2 (value) {
      this.active2 = value
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
.swiper{
  width:100%;
  height:10rem;
  img{
    width:100%;
    height:100%;
  }
}
.item{
  .content{
    font-size:.6rem;
    color:$sub-color;
    line-height:1.7;
    padding:10px 0;
    dt{
      margin-top:10px;
    }
    dd{
      p{
        // text-indent:2em;
      }
    }
  }
}
</style>
