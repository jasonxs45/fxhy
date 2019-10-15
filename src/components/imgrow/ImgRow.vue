<template>
<container>
  <row
    :group="group"
    class="img-row"
  >
    <slot></slot>
      <img-cell>
        <div
          v-if="canUpload&&group.length<maxCount"
          class="upload-btn"
          @click="clickHandler"
        >
          <icon>&#xe727;</icon>
        </div>
      </img-cell>
  </row>
</container>
</template>
<script>
import Container from 'components/container'
import Row from 'components/row'
import Icon from 'components/icon'
import ImgCell from './ImgCell'
import { wxConf } from 'utils/wxConfig'
export default {
  name: 'ImgRow',
  components: {
    Container,
    Row,
    Icon,
    ImgCell
  },
  props: {
    group: {
      type: Array
    },
    canUpload: {
      type: Boolean,
      default: false
    },
    maxCount: {
      type: Number,
      default: 4
    }
  },
  methods: {
    clickHandler (e) {
      let _self = this
      wxConf.wxUpload(_self.maxCount - this.group.length, res => {
        this.$emit('on-upload', res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~styles/variable.scss";
.img-row{
  margin: {
    left: -17px !important;
    right: -17px !important;
  }
  font-size: 0;
  .upload-btn{
    width: 80px;
    height: 80px;
    border:1px dashed $primary-color;
    border-radius: 4px;
    position: relative;
    display: inline-block;
    vertical-align: top;
    line-height: 80px;
    text-align: center;
    color:lighten($primary-color, 15%);
    .iconfont{
      font-size: 18px;
    }
  }
}
</style>
