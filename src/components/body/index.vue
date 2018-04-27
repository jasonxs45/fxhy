<template>
  <flexbox-item :class="classes">
    <slot></slot>
    <slot name="footnav"></slot>
  </flexbox-item>
</template>

<script>
import {FlexboxItem} from '../flexbox'
export default {
  components: {
    FlexboxItem
  },
  computed: {
    classes () {
      return ['body', this.scroll ? 'scrollbox' : '']
    }
  },
  props: {
    scroll: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  @import '~styles/variable.scss';
  @import '~styles/mixins.scss';
  .body{
    position:relative;
  }
</style>
