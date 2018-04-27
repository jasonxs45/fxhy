<template>
  <div class="">
    <layout>
      <x-body slot="body" class="servicetel">
        <div class="servicetel-title">
          <span class="icon"></span>
          <span class="text">服务电话</span>
        </div>
        <split></split>
        <flexbox class="table-title">
          <flexbox-item>项目名称</flexbox-item>
          <flexbox-item>物业服务中心</flexbox-item>
        </flexbox>
        <template v-for="(city,index) in list">
          <div class="city" :key="'city'+index">
            <img :src="'static/images/pos'+[index+1]+'.png'" />
            <span class="txt">{{city.city}}</span>
          </div>
          <flexbox class="table-row" v-for="(item,index) in city.areas" :key="'tablerow'+index">
            <flexbox-item>{{item.name}}</flexbox-item>
            <flexbox-item>
              <a :href="'tel:'+city.preTel+item.tel">
                <img src="static/images/i8.png">
                <span class="txt">{{city.preTel+'-'+item.tel}}</span>
              </a>
              <a :href="'tel:'+city.preTel+item.tel" v-if="item.tel1">
                <img src="static/images/i8.png">
                <span class="txt">{{city.preTel+'-'+item.tel1}}</span>
              </a>
            </flexbox-item>
          </flexbox>
          <split :key="'split'+index"></split>
        </template>
        <footnav></footnav>
      </x-body>
    </layout>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import api from '../api'
import {
  Layout,
  Container,
  XBody,
  Flexbox,
  FlexboxItem,
  XLink,
  Icon,
  XImg,
  Split,
  Footnav
} from 'components'
export default {
  name: 'servicetel',
  components: {
    Layout,
    Container,
    XBody,
    Flexbox,
    FlexboxItem,
    XLink,
    Icon,
    XImg,
    Split,
    Footnav
  },
  data() {
    return {
      list: [
        {
          city: '武汉',
          preTel: '027',
          areas: [
            {
              name: '城市花园',
              tel: '85483335'
            },
            {
              name: '东澜岸',
              tel: '86784376'
            },
            {
              name: '福星城南区',
              tel: '85310888'
            },
            {
              name: '国际城K1、K2',
              tel: '59535252'
            },
            {
              name: '国际城K5',
              tel: '59817899'
            },
            {
              name: '汉口春天',
              tel: '83821091'
            },
            {
              name: '金色华府',
              tel: '82636372'
            },
            {
              name: '瞰江坊',
              tel: '59205250'
            },
            {
              name: '青城华府',
              tel: '86300608'
            },
            {
              name: '沙湖公馆',
              tel: '59265233'
            },
            {
              name: '商会大厦',
              tel: '85350718'
            },
            {
              name: '水岸国际',
              tel: '88605699'
            },
            {
              name: '水岸星城A区',
              tel: '59842625'
            },
            {
              name: '水岸星城B区',
              tel: '86708331'
            },
            {
              name: '水岸星城C区',
              tel: '59842626'
            }
          ]
        },
        {
          city: '恩施',
          preTel: '0718',
          areas: [
            {
              name: '福星城',
              tel: '8020999'
            }
          ]
        },
        {
          city: '咸宁',
          preTel: '0715',
          areas: [
            {
              name: '福星城',
              tel: '8900599',
              tel1: '8200188'
            }
          ]
        },
        {
          city: '孝感',
          preTel: '0712',
          areas: [
            {
              name: '福星城',
              tel: '2599255'
            }
          ]
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
      api.cnode.list({ page: page, tab: '' }).then((data) => {
        this.list = data.data.concat(this.list)
        cb && cb()
      })
    }
  }
}
</script>

<style lang="scss">
@import '~styles/variable.scss';
@import '~styles/mixins.scss';
.servicetel {
  background-color: #fff;
  .servicetel-title {
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
  .city {
    font-size: 0;
    text-align: center;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
    color: $sub-color;
    font-weight: 200;
    img,
    .txt {
      display: inline-block;
      vertical-align: top;
    }
    img {
      width: 12px;
      height: 12px;
      margin-right: 5px;
    }
    .txt {
      font-size: .55rem;
      line-height: 12px;
    }
  }
  .table-title,
  .table-row {
    .flexbox-item {
      text-align: center;
    }
  }
  .table-title {
    font-size: .64rem;
    color: #fff;
    background-color: $primary-color;
    height: 1.8rem;
    line-height: 1.8rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, .6) inset;
  }
  .table-row {
    border-bottom: 1px solid #ddd;
    .flexbox-item {
      position: relative;
      font-size: .6rem;
      padding: 10px 0;
      color: $text-color;
      border-left: 1px solid #ddd;
      &:first-child {
        border-left: none
      }
      &>a {
        display: block;
        width: 100%;
        font-size: 0;
        margin-top: 5px;
        &:first-child {
          margin-top: 0;
        }
        img,
        .txt {
          display: inline-block;
          vertical-align: top;
        }
        img {
          width: 13px;
          height: 13px;
          margin-right: 5px;
        }
        .txt {
          font-size: .6rem;
          color: $sub-color;
          font-weight: 200;
          line-height: 13px;
        }
      }
    }
  }
}
</style>
