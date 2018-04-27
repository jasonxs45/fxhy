<template>
  <div :class="classes" onselectstart="return false;">
    <div
      :class="'picker'"
      @touchstart="touchStartHandler"
      @touchmove="touchMoveHandler"
      @touchend="touchEndHandler"
      @scroll="scrollHandlder"
      >
      <div :class="'picker-scroller'">
        <div v-if="placeholder" :class="['picker-item','picker-placeholder']">
          {{placeholder}}
        </div>
        <div
          v-for="(item, index) in options"
          :class="['picker-item', item.value === value ?'picker-active' : '']"
          :data-value="item.value"
          :data-index="index"
          v-html="item.label"
          >
        </div>
      </div>
    </div>
    <div :class="'picker-indicator'"></div>
  </div>
</template>

<script>
let easeout = (A, B, rate, callback) => {
  if (A === B || typeof A !== 'number') {
    return
  }
  B = B || 0
  rate = rate || 2
  let step = () => {
    A = A + (B - A) / rate
    if (Math.abs(B - A) < 1) {
      callback(B, true)
      return
    }
    callback(A, false)
    requestAnimationFrame(step)
  }
  step()
}

export default {
  computed: {
    classes () {
      return ['picker-wrapper']
    }
  },
  props: {
    options: {
      type: Array,
      reqiured: true
    },
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: ''
    },
    index: {
      type: [Number, String],
      default: 0
    }
  },
  watch: {
    options (value) {
      requestAnimationFrame(this.scrollToActive)
    }
  },
  created () {
    this.$touch = {}
  },
  mounted () {
    this.$touch.scrollElement = this.$el.querySelector('.picker')
    requestAnimationFrame(this.scrollToActive)
  },
  destroyed () {
    this.$touch = null
  },
  methods: {
    scrollToActive () {
      let node = this.$el.querySelector('.picker-active')
      let index = 0
      Array.from(this.$el.querySelectorAll('.picker-item')).forEach((item, i) => {
        if (item === node) {
          index = i
        }
      })
      requestAnimationFrame(() => {
        this.$touch.scrollElement.scrollTop = node ? index * (node.offsetHeight || 40) : 0
      })
    },
    touchEndHandler () {
      this.$touch.scrollEnd = true
      this.computedScrollTop()
    },
    touchMoveHandler (e) {
      let pageY = e.changedTouches[0].pageY
      if (this.pageY) {
        if (this.$touch.scrollElement.scrollTop === 0 && pageY - this.pageY > 0) {
          this.$pullTimer && clearTimeout(this.$pullTimer)
          this.$pullTimer = setTimeout(() => {
            this.$emit('on-pulldown')
          }, 500)
          e.preventDefault()
          e.stopPropagation()
        } else if (Math.round(this.$touch.scrollElement.scrollTop) === this.$touch.maxScrollTop && pageY - this.pageY < 0) {
          this.$pullTimer && clearTimeout(this.$pullTimer)
          this.$pullTimer = setTimeout(() => {
            this.$emit('on-pullup')
          }, 500)
          e.preventDefault()
          e.stopPropagation()
        }
      }
      this.pageY = pageY
    },
    touchStartHandler (e) {
      this.$touch.scrollEnd = false
      this.$touch.maxScrollTop = this.$touch.scrollElement.scrollHeight - this.$touch.scrollElement.offsetHeight
      this.pageY = e.changedTouches[0].pageY
      this.$timer && clearTimeout(this.$timer)
      this.$pullTimer && clearTimeout(this.$pullTimer)
    },
    scrollHandlder () {
      if (this.$touch && this.$touch.scrollEnd) {
        this.computedScrollTop()
      }
    },
    computedScrollTop () {
      this.$timer && clearTimeout(this.$timer)
      this.$timer = setTimeout(() => {
        this.$touch.scrollEnd = false
        let node = this.$el.querySelector('.picker')
        let _scrollTop = node.scrollTop
        let index = Math.round(_scrollTop / 40)
        let scrollTop = index * 40
        requestAnimationFrame(() => {
          if (_scrollTop !== scrollTop) {
            easeout(_scrollTop, scrollTop, 4, (value) => {
              node.scrollTop = value
            })
          }
          let active = this.$el.querySelectorAll('.picker-item')[index]
          if (active) {
            let value = active.dataset.value
            value !== this.value && this.$emit('on-change', value, this.index).$emit('input', value, this.index)
          }
        })
      }, 51)
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
  .picker{
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    height:280px;
    &::-webkit-scrollbar{
      display:none;
    }
    &-wrapper{
      position:relative;
      background:#fff;
      text-align: center;
      overflow:hidden;
    }
    &-scroller{
      padding:126px 0;
    }
    &-item{
      line-height:40px;
      overflow: hidden;
      white-space: nowrap;
      padding: 0px 0.15rem;
      height:40px;
      font-size:14px;
    }
    &-active{
      color:$primary-color;
    }
    &-indicator{
      &:before{
        @include divider
        top:125px;
        box-shadow: 0px -63px 0px 63px rgba(255, 255, 255, 0.45), 0px -64px 0px 21px rgba(255, 255, 255, 0.35), 0px -106px 0px 21px rgba(255, 255, 255, 0.5);
      }
      &:after{
        @include divider
        top:165px;
        box-shadow: 0px 63px 0px 63px rgba(255,255,255,0.45), 0px 64px 0px 21px rgba(255, 255, 255, 0.35), 0px 106px 0px 21px rgba(255, 255, 255, 0.5);
      }
    }
    &-placeholder{
      opacity:0.8;
    }
  }
</style>
