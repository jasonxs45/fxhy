<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  computed: {
    classes () {
      return ['divider']
    }
  }
}
</script>

<style lang="scss">
  @import '~styles/variable.scss';
  @import '~styles/mixins.scss';
  .divider{
    @include divider;
    position:static;
  }
</style>
