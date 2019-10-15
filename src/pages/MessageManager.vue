<template>
  <div class="">
    <layout>
      <x-body slot="body" class="video">
        <div class="my-title">
          <span class="icon"></span>
          <span class="text">留言列表</span>
        </div>
        <split></split>
        <tab :active="active" class="product-tab" @on-change="changeHandler">
          <tab-item>未回复</tab-item>
          <tab-item>已回复</tab-item>
        </tab>
      <div class="list" v-show="active === 0">
        <div v-for='(item, index) in list1' :key='"item-"+index' class='message' @click='detail(item.ID)'>
          <div class='desc'>{{item.Content}}</div>
          <div class='date'>{{item.AddTime}}</div>
          <div v-if='item.Content2' class='mark'>已回复</div>
        </div>
        <div class="check-more" @click="addList1">{{moreTag1?'查看更多':'没有更多了'}}<icon v-if='moreTag1'>&#xe65f;</icon></div>
      </div>
      <div class="list"  v-show="active === 1">
        <div v-for='(item, index) in list2' :key='"item-"+index' class='message' @click='detail(item.ID)'>
          <div class='desc'>{{item.Content}}</div>
          <div class='date'>{{item.AddTime}}</div>
          <div v-if='item.Content2' class='mark'>已回复</div>
        </div>
        <div class="check-more" @click="addList2">{{moreTag2?'查看更多':'没有更多了'}}<icon v-if='moreTag2'>&#xe65f;</icon></div>
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
  Split,
  Tab,
  TabItem
} from 'components'
export default {
  name: 'messagemanager',
  components: {
    Layout,
    Container,
    XBody,
    Footnav,
    Split,
    Tab,
    TabItem
  },
  data() {
    return {
      list1: [],
      list2: [],
      pageIndex1: 1,
      pageIndex2: 1,
      total1: 0,
      total2: 0,
      active: 0
    }
  },
  computed: {
    moreTag1 () {
      return this.list1.length < this.total1
    },
    moreTag2 () {
      return this.list2.length < this.total2
    }
  },
  methods: {
    fetch (id, pageSize= 10, curPage= 1, cb, tar) {
      axios({
        method: 'post',
        url: '/Mobile-PostAPI',
        data: {
          Logic: "Suggest",
          Name: "GetManageList",
          Data: JSON.stringify({
            _PageSize: pageSize,
            _PageIndex: curPage,
            S_State: id
          })
        }
      }).then((res) => {
        cb&&cb(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    addList1 () {
      this.pageIndex1++
      this.fetch(0, 10, this.pageIndex1, (data) => {
        this.list1 = this.list1.concat(data.data.Data)
      })
    },
    addList2 () {
      this.pageIndex2++
      this.fetch(1, 10, this.pageIndex2, (data) => {
        this.list2 = this.list2.concat(data.data.Data)
      })
    },
    changeHandler (value) {
      this.active = value
    },
    detail (id) {
      this.$router.push(`/pages/messagedetail?id=${id}&role=manager`)
    },
    checkid () {
      return axios({
        method: 'post',
        url: '/Mobile-PostAPI',
        data: {
          Logic: "Member",
          Name: "GetIdentity",
          Data: JSON.stringify({})
        }
      })
    }
  },
  created () {
    this.checkid()
      .then(res => {
        const { IsSuccess, Data } = res.data
        if (IsSuccess) {
          if (Data.IsSuggestAdmin) {
            this.fetch(0, 10, this.pageIndex1, (res) => {
              this.list1 = this.list1.concat(res.data.Data)
              this.total1 = res.data.DataCount
            })
            this.fetch(1, 10, this.pageIndex2, (res) => {
              this.list2 = this.list2.concat(res.data.Data)
              this.total2 = res.data.DataCount
            })
          } else {
            window.$alert({
              content: '对不起，你不是管理员',
              onConfirm: () => {
                this.$router.replace('/')
              }
            })
          }
        }
      })
      .catch(err => {
        console.lgo(err)
      })
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
    color:#fff !important;
    box-shadow:0 0 10px 0 rgba(0,0,0,.2) inset;
  }
}
.list{
  min-height: 400px;
  .message{
    margin: 15px;
    background: #fff;
    box-shadow: 0 0 1px 0 rgba(0,0,0, .1);
    padding: 15px;
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
.check-more{
  font-size:.55rem;
  color:$sub-color;
  font-weight:200;
  text-align:center;
  padding:10px;
  .iconfont{
    font-size:.512rem;
    color:$primary-color;
  }
}
</style>
