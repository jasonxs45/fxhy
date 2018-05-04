<template>
  <ul :class="classes">
    <slot></slot>
  </ul>
</template>

<script>
import XImg from 'components/img'
export default {
  name: 'ptlist',
  components: {
    XImg
  },
  computed: {
    classes () {
      return ['ptlist']
    }
  },
  props: {
    list: {
      type: Array
    }
  },
  methods: {
  },
  data () {
    return {
    }
  },
  mounted () {}
}
</script>
<style lang="scss">
@import '~styles/variable.scss';
@import '~styles/mixins.scss';
.ptlist{}
</style>
