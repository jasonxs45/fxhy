<template>
  <div :class="classes" @click="clickHandler">
    <div :class="'action-sheet-item-text'" :disabled="disabled">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    classes () {
      return ['action-sheet-item', this.checked ?'action-sheet-item-active' : '']
    }
  },
  data () {
    return {
      checked: false
    }
  },
  methods: {
    clickHandler () {
      !this.disabled && this.$emit('click', this.value)
    }
  }
}
</script>

<style lang="scss">
  @import '~styles/variable.scss';
  @import '~styles/mixins.scss';
  .action-sheet-item{
    padding:14px 0;
    position:relative;
    border-left: 0.1rem solid transparent;
    border-right: 0.1rem solid transparent;
    user-select:none;
    white-space: nowrap;
    overflow: hidden;
    font-size:$font-size-base;
    @include active;
    &-text{
      @include disabled;
    }
    &:after{
      @include divider;
    }
    &:last-child:after{
      display:none;
    }
    &-active{
      color:$primary-color;
    }
  }
</style>
