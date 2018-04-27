<template>
  <div :class="classes">
    <flexbox :class="['layout-flexbox']" direction="column">
      <slot name="header"></slot>
      <slot name="body"></slot>
      <slot name="footer"></slot>
    </flexbox>
    <slot></slot>
  </div>
</template>

<script>
import {Flexbox} from '../flexbox'
export default {
  components: {
    Flexbox
  },
  computed: {
    classes () {
      return ['layout']
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
    .layout-flexbox{
      position:absolute;
      height:100%;
      width:100%;
      background:#f7f7f7;
      z-index:10;
    }
</style>
