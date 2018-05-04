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
  mixins: [tab],
  computed: {
    classes () {
      return ['sidebar']
    }
  },
  data () {
    return {
    }
  },
  methods: {
    changeHandler (value) {
      this.$emit('click', value)
      value !== this.active && this.$emit('on-change', value).$emit('input', value)
    }
  }
}
</script>

<style lang="scss">
  @import '~styles/variable.scss';
  @import '~styles/mixins.scss';
  .sidebar{
      text-align:center;
      position:relative;
      user-select: none;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      overflow-scrolling: touch;
      &::-webkit-scrollbar{
        display:none;
      }
    }
</style>
