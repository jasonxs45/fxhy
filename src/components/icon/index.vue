<template>
  <i :class="classes">
    <slot></slot>
  </i>
</template>

<script>
export default {
  computed: {
    classes () {
      return ['iconfont']
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
  @font-face {font-family: "v-iconfont";
    src: url('./iconfont/iconfont.eot?t=1491729060635'); /* IE9*/
    src: url('./iconfont/iconfont.eot?t=1491729060635#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('./iconfont/iconfont.woff?t=1491729060635') format('woff'), /* chrome, firefox */
    url('./iconfont/iconfont.ttf?t=1491729060635') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url('./iconfont/iconfont.svg?t=1491729060635#iconfont') format('svg'); /* iOS 4.1- */
  }
  .iconfont {
      font-family:"v-iconfont" !important;
      font-size:16px;
      font-style:normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      vertical-align: middle;
      display: inline-block;
      font-size:18px;
      line-height: 100%;
    }
</style>
