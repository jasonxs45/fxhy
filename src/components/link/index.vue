<template>
  <router-link :class="classes" :to="href">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  computed: {
    classes () {
      return ['link', this.active ?'link-active' : '']
    }
  },
  props: {
    href: {
      type: [String, Object]
    },
    active: {
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
    .link{
      color:$primary-color;
      text-decoration: none;
      box-sizing: border-box;
      cursor: default;
      &-active{
        @include active;
      }
    }
</style>
