<template>
  <div class="">
    <layout>
      <x-body slot="body" class="video">
        <div class="my-title">
          <span class="icon"></span>
          <span class="text">我的留言</span>
        </div>
        <split></split>
        <div class='list'>
          <template v-if='list.length'>
            <div v-for='(item, index) in list' :key='"item-"+index' class='message' @click='detail(item.ID)'>
              <div class='desc'>{{item.Content}}</div>
              <div class='date'>{{item.AddTime}}</div>
              <div v-if='item.Content2' class='mark'>已回复</div>
            </div>
          </template>
          <div v-else class='no-data'>暂无记录</div>
        </div>
        <footnav></footnav>
      </x-body>
    </layout>
  </div>
</template>
<script>
import axios from 'axios'
import {
  Layout,
  Container,
  XBody,
  Footnav,
  Split
} from 'components'
export default {
  name: 'message',
  components: {
    Layout,
    Container,
    XBody,
    Footnav,
    Split
  },
  data() {
    return {
      list: []
    }
  },
  computed: {},
  methods: {
    getList () {
      axios.post('/Mobile-PostAPI',
        {
          Logic: 'Suggest',
          Name: 'GetMyList',
          Data: JSON.stringify({})
        }).then(res => {
          console.log(res)
          this.list = res.data.Data
        }).catch(err => {
          console.log(err);
        })
    },
    detail (id) {
      this.$router.push(`/pages/messagedetail?id=${id}`)
    }
  },
  created () {
    this.getList()
  }
}
</script>
<style lang="scss">
@import '~styles/variable.scss';
@import '~styles/mixins.scss';
.my-title{
    font-size:0;
    background: #fff;
    padding:12px 10px;
    box-shadow:0 1px 1px 0 rgba(0,0,0,.2);
    .icon,
    .text{
      display:inline-block;
    }
    .icon{
      width:10px;
      height:10px;
      background:$primary-color;
      margin-right:5px;
    }
    .text{
      font-size:16px;
    }
  }
.list{
  min-height: 400px;
  .message{
    margin: 15px;
    background: #fff;
    box-shadow: 0 0 1px 0 rgba(0,0,0, .1);
    padding: 20px 15px;
    position: relative;
    border-radius: 4px;
    .desc{
      font-size: 14px;
      line-height: 1.5;
    }
    .date{
      font-size: 12px;
      color: #777;
      font-weight: 300;
      margin-top: 10px;
    }
    .mark{
      position: absolute;
      top:0;
      right: 0;
      background: $primary-color;
      color: #fff;
      padding: 5px 10px;
      font-size: 10px;
      border-radius: 0 4px 0 0;
    }
  }
}
.no-data{
  padding: 30px;
  text-align: center;
  font-size: 14px;
  color: #888;
}
</style>
