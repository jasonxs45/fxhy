<template>
  <div class="img-cell">
    <slot></slot>
    <div
      v-if="del"
      class="delete"
      :index="index"
      :group="group"
      @click="deleteImg"
    >
      <icon>&#xe641;</icon>
    </div>
  </div>
</template>
<script>
import Icon from 'components/icon'
export default {
  name: 'ImgCell',
  components: {
    Icon
  },
  props: {
    index: {
      type: Number
    },
    group: {
      type: Array
    },
    del: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    deleteImg (e) {
      this.group.splice(this.index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~styles/variable.scss";
@import "~styles/mixins.scss";
.img-cell{
  width:80px;
  height: 80px;
  border-radius: 4px;
  margin:10px 8px 0;
  position: relative;
  display: inline-block;
  vertical-align: top;
  text-align: center;
  .fit-img{
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
  .delete{
    position: absolute;
    width:18px;
    height: 18px;
    text-align: center;
    top:-8px;
    right:-8px;
    z-index:1;
    background: $primary-color;
    border-radius: 50%;
    color:#fff;
    .iconfont{
      height: 100%;
      font-size: 8px;
      line-height: 18px;
      display: inline-block;
    }
  }
}
</style>
