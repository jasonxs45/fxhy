<template>
  <label :class="classes" @focusin="focusHandler" @focusout="blurHandler">
    <slot name="icon"></slot>
    <slot v-if="$slots.default"></slot>
    <input
      v-else
      :type="htmlType"
      :placeholder="placeholder"
      :readonly="readonly"
      :value="value"
      :disabled="disabled"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :maxlength="maxlength"
      :name="name"
      :required="required"
      :pattern="pattern"
      @keyup="keyupHandler"
      @keydown="keydownHandler"
      @change="changeHandler"
      @input="inputHandler"
      @invalid="invalidHandler"
      />
    <transition name="input-clear-fade">
      <button
        type="button"
        v-show="clear&&isFocus"
        :class="'input-clear-button'"
        @click="clearHandler"
      >
        <icon>&#xe641;</icon>
      </button>
    </transition>
  </label>
</template>

<script>
import { input } from 'utils/mixins.js'
import Icon from '../icon'
export default {
  components: {
    Icon
  },
  mixins: [input],
  computed: {
    classes () {
      let classes = {}
      classes['input-focus'] = this.isFocus
      classes['input-clear'] = !!this.value && this.clear
      return [
        'input-wrapper',
        classes
      ]
    }
  },
  data () {
    return {
      isFocus: false
    }
  },
  methods: {
    clearHandler (e) {
      this.clear && this.$el.classList.remove('input-clear')
      this.$emit('on-change', '').$emit('input', '')
    },
    inputHandler (e) {
      if (e.target.value) {
        this.clear && this.$el.classList.add('input-clear')
      } else {
        this.clear && this.$el.classList.remove('input-clear')
      }
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss">
  @import '~styles/variable.scss';
  @import '~styles/mixins.scss';
    .input-wrapper{
      position:relative;
      display:block;
      height:0.9rem;
      background:#fff;
      .iconfont{
        color:$sub-color;
      }
      >.iconfont:first-child{
        line-height: 100%;
        position: absolute;
        left: 5px;
        top: 50%;
        margin: -8px 0;
      }
      >.iconfont:first-child+input{
        padding-left:30px;
      }
      input{
        border:0;
        width:100%;
        height:100%;
        box-sizing:border-box;
        outline: none;
        text-align: inherit;
        font-size: inherit;
        padding-left: 0.4rem;
        vertical-align: middle;
        background: transparent;
        @include disabled;
        &::-webkit-input-placeholder{
          color:#999
        }
      }

      &:before{
        @include divider;
        z-index:1;
      }
      &:after{
        @include divider($primary-color);
        width:0;
        transition:width 0.4s $ease-in-out;
        z-index:2;
      }
    }
    .input-focus:after{
      width:100%;
    }
    .input-clear-button{
      position:absolute;
      top:0;
      right:0;
      @include button;
      width:40px;
      height:100%;
      display:none;
    }
    .input-clear{
      .input-clear-button{
        display:block;
      }
      input{
        padding-right:40px;
      }
    }
  .input-clear-fade-enter-active, .input-clear-fade-leave-active {
    transition: opacity $transition-time;
  }
  .input-clear-fade-enter, .confirm-fade-leave-active {
    opacity: 0
  }
</style>
