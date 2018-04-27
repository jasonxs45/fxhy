<template>
  <div :class="classes" @click="clickHandler">
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    clickHandler (e) {
      this.$emit('on-change', this.index)
      this.$emit('click', this, this.active, this.index)
    }
  },
  computed: {
    classes () {
      let array = ['sidebar-item']
      if (this.active) {
        array.push('sidebar-item-active')
        array.push(this.$parent.activeClass)
      }
      return array
    }
  },
  data () {
    return {
      active: false
    }
  }
}
</script>

<style lang="scss">
  @import '~styles/variable.scss';
  @import '~styles/mixins.scss';
  .sidebar-item{
      line-height:1;
      position:relative;
      overflow:hidden;
      white-space: nowrap;
      transition:background .2s;
      &:after{
        @include divider;
      }
      &.noarrow{
        &:before{
          content:'';
          display:none;
        }
      }
      &:before{
        @include arrow($rotate:45deg);
        right:.64rem !important;
        left:auto;
        top:.64rem !important;
        margin-top:0 !important;
        transition:all .2s
      }
      &-active{
        color:#fff;
        background:#8f8f8f;
        position:relative;
        z-index:1;
        &:before{
          @include arrow($rotate:135deg);
          border-color:#fff
        }
      }
    }
</style>
