<template>
  <div :class="classes" @click="clickHandler">
    <slot></slot>
  </div>
</template>

<script>
let flexMap = {
  direction: {
    column: 'flexbox-column'
  },
  wrap: {
    wrap: 'flexbox-wrap'
  },
  justify: {
    center: 'flexbox-content-center'
  },
  align: {
    center: 'flexbox-align-center'
  }
}

export default {
  props: {
    direction: {
      type: String,
      default: 'normal'
    },
    wrap: {
      type: String,
      default: 'normal'
    },
    justify: {
      type: String,
      default: 'normal'
    },
    align: {
      type: String,
      default: 'normal'
    }
  },
  computed: {
    classes () {
      let array = ['flexbox']
      for (let name in flexMap) {
        if (this[name] && flexMap[name][this[name]]) {
          array.push(flexMap[name][this[name]])
        }
      }
      return array
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
  .flexbox{
    display: flex;
    &.flexbox-wrap{
      box-lines: multiple;
      flex-wrap: wrap;
    }
    &.flexbox-column{
      box-orient: vertical;
      flex-direction: column;
    }
    &.flexbox-content-center{
      box-pack: center;
      justify-content: center;
    }
    &.flexbox-align-center{
      box-align: center;
      align-items: center;
    }
    .flexbox-item{
      flex:1;
      min-width:0;
    }
    .flexbox-item2{
      flex:2;
      min-width:0;
    }
    .flexbox-item3{
      flex:3;
      min-width:0;
    }
    .flexbox-item4{
      flex:4;
      min-width:0;
    }
    .flexbox-item5{
      flex:5;
      min-width:0;
    }
  }
</style>
