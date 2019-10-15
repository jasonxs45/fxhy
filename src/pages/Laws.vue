<template>
  <div class="laws-wrapper">
    <div class="laws-content">
      <div class="laws-panel">
        <div class="body">
          <dl>
            <dt class="tit">法律声明</dt>
            <dd class="prag">本网站（http://fuxinghuiyu.1juke.cn/fxhyMicro/）及本微信公众号（微信号：FUXINGHUIYU）上为版权人所有的文件，在此并未作任何授权。本网站上的文件仅限于为信息和非商业或个人之目的使用，并且不得在任何网络计算机上复制或公布，也不得在任何媒体上传播。</dd>
            <dd class="prag">未经版权人许可，任何人不得擅自(包括但不限于：以非法的方式复制、传播、展示、镜像、上载、下载)使用。否则版权人将依法追究其法律责任。</dd>
            <dt class="tit">免责声明</dt>
            <dd class="prag">版权人拥有对本网站的内容进行随时更改之权利，事前将不会另行通知。版权人不保证或声明本网站展示的资料是否正确、全面或是最新数据。</dd>
            <dd class="prag">本网站内的所有图片(包括但不限于插图、透视图、设计图等)、模型、文字描述等，仅作为参考信息，非开发商的任何承诺或要约。</dd>
            <dt class="tit">开发商声明</dt>
            <dd class="prag">网站有关其开发项目信息的介绍，均以政府最后审批文件为准。商品房买卖双方之间的关系以当事人签订的买卖双方之间的关系以当事人签订买卖合同为准。</dd>
            <dd class="prag">任何人因本网站或依赖其内容进行交易所引致的损失，版权人和开发商均不承担任何责任。</dd>
          </dl>
        </div>
        <div class="foot" @click="back">我知道了</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Laws',
  methods: {
    back () {
      history.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.laws-wrapper{
  background: #fff;
  position: relative;
  .laws-content{
    .laws-panel{
      width: 100%;
      height: 100%;
      background: #fff;
      border-radius: 4px;
      position: relative;
      padding-bottom: 50px;
      .body{
        width: 100%;
        padding: 15px;
        overflow-y: auto;
        font-size: 14px;
        color: #333;
        .tit{
          font-size: 16px;
          margin-top: 30px;
          &:first-child{
            margin-top: 0;
          }
        }
        .prag{
          line-height: 1.5;
          margin-top: 15px;
        }
      }
      .foot{
        position: absolute;
        height: 50px;
        border-top: 1px solid #ddd;
        bottom: 0;
        width:100%;
        line-height: 50px;
        font-size: 14px;
        text-align: center;
        color: #333;
        background: #fff;
        z-index:1;
        & + .body{
          padding-bottom: 65px;
        }
      }
    }
  }
}
</style>
