<template>
  <div :class="classes" @click="clickHandler">
    <slot></slot>
  </div>
</template>

<script>
export default {
  computed: {
    classes () {
      return ['swiper-item', 'swiper-slide']
    }
  },
  methods: {
    clickHandler (e) {
      this.$emit('click', e)
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
  .swiper-item{
    }
</style>
