<template>
  <div :class="classes" onselectstart="return false;">
    <slot></slot>
  </div>
</template>

<script>
import { tab } from 'utils/mixins.js'
import Divider from '../divider'
export default {
  components: {
    Divider
  },
  props: {
    ripple: {
      type: Boolean,
      default: false
    }
  },
  mixins: [tab],
  computed: {
    classes () {
      return ['flexbox', 'tabbar']
    }
  },
  data () {
    return {
      childLength: this.$children.length
    }
  },
  methods: {
    changeHandler (val) {
      this.$emit('click', val)
      if (val !== this.active) {
        this.$emit('on-change', val).$emit('input', val)
      }
    }
  }
}
</script>

<style lang="scss">
  @import '~styles/variable.scss';
  @import '~styles/mixins.scss';
  .tabbar{
      text-align:center;
      position:relative;
      user-select: none;
      background: #fff;
      &:before{
        @include divider;
        top:0;
      }
    }
</style>
