<template>
<div class="">
  <layout>
    <x-body slot="body" class="recruitment-body">
      <div class="recruitment-wrapper">
        <div class="recruitment-title">
          <span class="icon"></span>
          <span class="text">福星招聘</span>
        </div>
        <accordion
          v-for="(item, index) in list"
          :title="item.jobName"
          :index="index"
          :showing="item.showing"
          @title-click="clickHandler"
          :key="'accordion'+index"
          class="recruitment-item"
        >
        <p class="subscript">
          <span v-show="item.dept" class="job-department">{{item.dept}}</span>
          <span v-show="item.edu" class="job-edu">{{item.edu}}</span>
          <span v-show="item.experience" class="job-exp">工作年限：{{item.experience}}</span>
          <span class="flag">职位详情<icon :class="item.showing?'rotate':''">&#xe65f;</icon></span>
        </p>
        <div slot="panel" class="details" v-html="item.jobDescribe">
        </div>
        </accordion>
        <footnav></footnav>
      </div>
      <div class="email-tips">
        <p class="p1"><span class="icon"></span><span class="text">发送简历到人事邮箱 fxhy_hr@163.com</span></p>
        <p class="p2">标题格式为【姓名】-【应聘职位】</p>
      </div>
    </x-body>
  </layout>
  <!-- <router-view></router-view> -->
</div>
</template>

<script>
import {
  Layout,
  XBody,
  XLink,
  Icon,
  Accordion,
  AccordionGroup,
  Split,
  Footnav
} from 'components'
import axios from 'axios'
export default {
  name: 'recruitment',
  components: {
    Layout,
    XBody,
    XLink,
    Icon,
    Accordion,
    AccordionGroup,
    Split,
    Footnav
  },
  data () {
    return {
      list: []
    }
  },
  created () {
  },
  mounted () {
    axios.post('/Mobile-PostAPI', {
      Logic: 'JobList',
      Name: 'GetList',
      Data: JSON.stringify({
        S_IsShow: 1,//是否显示，不设置此参数则查询全部
        _PageSize: 10,
        _PageIndex: 1
      })
    }).then((res) => {
      for (var i= 0; i<res.data.Data.length; i++) {
        res.data.Data[i].showing = false
      }
      this.list = this.list.concat(res.data.Data)
    }).catch((err) => {
      console.log(err);
    })
  },
  methods: {
    clickHandler (o, index) {
      this.list[index].showing = !this.list[index].showing
      o.showBool = !o.showBool
    }
  }
}
</script>

<style lang="scss">
@import '~styles/variable.scss';
@import '~styles/mixins.scss';
.recruitment-body{
  height:100%;
  .recruitment-wrapper{
    width:100%;
    min-height:100%;
    padding-top: 1px;
    padding-bottom:120px;
    .recruitment-title{
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
  }
  .email-tips{
    height:100px;
    margin-top:-100px;
    text-align: center;
    background:#fff;
    color:$sub-color;
    padding-top:32px;
    .p1{
      font-size:0;
      .icon,.text{
        display:inline-block;
        vertical-align:top;
      }
      .icon{
        width:14px;
        height:11px;
        margin-right:5px;
        background:url(../../static/images/i7.png) center no-repeat;
        background-size: 100% 100%;
      }
      .text{
        font-size:12px;
      }
    }
    .p2{
      padding-top:10px;
      font-size:12px;
    }
  }
}
.recruitment-item{
  margin-top:10px;
  padding:10px;
  background-color: #fff;
  box-shadow:0 1px 2px 0 lighten(#000,88%);
  .title{
    margin-bottom:10px;
    .text{
      font-size:.6rem;
      color:$primary-color;
    }
    .subscript{
      margin-top:10px;
      .job-department,
      .job-edu,
      .job-exp{
        display:inline-block;
        background-color:$primary-color;
        color:#fff;
        font-size:10px;
        padding:2px 4px;
      }
      .job-edu{
        background-color:$info-color;
      }
      .job-exp{
        background-color:$warning-color;
      }
      .flag{
        font-size:10px;
        color:$sub-color;
        float:right;
        padding:2px 0;
        .iconfont{
          margin-left:5px;
          font-size:10px;
          transition:all .2s;
          &.rotate{
            transform:rotate(90deg);
          }
        }
      }
    }
  }
  .panel{
    .details{
      margin-top:10px;
      font-size:$font-size-small;
      line-height:1.5;
    }
  }
}
</style>
