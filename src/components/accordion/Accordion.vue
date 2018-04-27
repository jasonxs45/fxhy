<template>
  <div :class="classes">
    <div class="title"  @click="clickHandler">
      <slot name="title-icon"></slot>
      <span class="text">{{title}}</span>
      <slot></slot>
    </div>
    <transition 
      name="collapse"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div class="panel" ref="menu" v-show="showBool">
        <slot name="panel"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'accordion',
  props: {
    title: {
      type: String
    },
    index: {
      type: Number
    },
    showing: {
      type: Boolean,
      default: false
    }
  },
  components: {
  },
  computed: {
    classes () {
      return ['accordion']
    }
  },
  data () {
    return {
      showBool: this.showing
    }
  },
  methods: {
    clickHandler (o) {
      this.$emit('title-click', this, this.index)
    },
    beforeEnter () {
      this.$refs.menu.style.height = '0px'
      this.$refs.menu.style.visibility = 'hidden'
    },
    enter () {
      this.$refs.menu.style.height = this.$refs.menu.scrollHeight + 'px'
      this.$refs.menu.style.visibility = 'visible'
    },
    leave () {
      this.$refs.menu.style.height = '0px'
      this.$refs.menu.style.visibility = 'hidden'
    }
  },
  mounted () {
    if (this.showBool) {
      this.$refs.menu.style.height = 'auto'
      // this.$refs.menu.style.height = this.$refs.menu.scrollHeight + 'px'
    }
  }
}
</script>

<style lang="scss">
  @import '~styles/variable.scss';
  @import '~styles/mixins.scss';
  .accordion{
    .title{}
    &.active{
      .title{
        &:before{
          display:block;
        }
      }
    }
    .panel{
      overflow: hidden;
      transition: all .2s ease-in-out;
      .menu-item{
        @include _1px;
        &:last-child{
          background:none;
        }
      }
    }
  }
</style>
