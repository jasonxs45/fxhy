<template>
  <div :class="classes" :style="styles" @click="clickHandler">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    opacity: {
      type: Number,
      default: 0.35
    }
  },
  computed: {
    classes () {
      return ['overlay']
    },
    styles () {
      return 'opacity:' + this.opacity
    }
  },
  data () {
    return {
    }
  },
  methods: {
    clickHandler (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss">
  @import '~styles/variable.scss';
  @import '~styles/mixins.scss';
  .overlay{
    position:absolute;
    left:0;
    top:0;
    height:100%;
    width:100%;
    background:#000;
    user-select: none;
  }
</style>
