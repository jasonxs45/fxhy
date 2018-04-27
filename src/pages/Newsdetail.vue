<template>
  <div class="newsdetail">
    <layout>
      <x-body slot="body">
        <container>
          <h2 class="title">{{item.Title}}</h2>
          <p class="date">{{item.AddTime|formatDate}}</p>
          <div class="content" v-html="item.Content"></div>
        </container>
        <footnav></footnav>
      </x-body>
    </layout>
  </div>
</template>

<script>
import axios from 'axios'
import {
  Layout,
  XBody,
  Container,
  Footnav,
  Ptlist,
  Ptlistitem,
  XLink,
  Icon
} from 'components'
import { formatDate } from 'utils/date'
export default {
  name: 'newsdetail',
  components: {
    Layout,
    XBody,
    Container,
    Footnav,
    Ptlist,
    Ptlistitem,
    XLink,
    Icon
  },
  data() {
    return {
      item: {}
    }
  },
  props: {
  },
  created() {
    axios.post('/Mobile-PostAPI',
      {
        Logic: 'WebNews',
        Name: 'GetModel',
        Data: JSON.stringify({ Id: this.$route.query.id })
      }).then((res) => {
        res.data.Data.Content = res.data.Data.Content.replace(/\bsrc=\S*\/plmnhytf12f3\/\b/g, 'src="http://www.whfxhy.com/plmnhytf12f3/')
        this.item = res.data.Data
      }).catch((err) => {
        console.log(err);
      })
  },
  methods: {},
  filters: {
    formatDate(time) {
      if (time) {
        let date = new Date(time.replace(/-/g, '/'))
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
  }
}
</script>

<style lang="scss">
@import '~styles/variable.scss';
@import '~styles/mixins.scss';
.newsdetail {
  h2.title {
    font-size: 1rem;
    line-height: 1.5;
    color: $title-color;
    margin: 10px 0;
  }
  .date {
    font-size: .512rem;
    color: $sub-color;
  }
  .content {
    margin: 10px 0;
    font-size: $font-size-small;
    color: $text-color;
    overflow-x: hidden;
    line-height: 2;
    p {
      line-height: 1.5;
      margin: 10px 0;
      font-size: .6rem;
      text-indent: 2em;
      img {
        margin-left: -2em;
        height: auto !important;
      }
    }
    img {
      margin: 10px 0;
      height: auto !important;
    }
  }
}
</style>
