<template>
  <confirm
    :class="classes"
    :open="open"
    :cancel="true"
    :cancel-text="cancelText"
    :confirm-text="confirmText"
    @on-close="closeHandler"
    @on-confirm="confirmHandler"
    >
    <div v-if="title" :class="'prompt-title'">{{title}}</div>
    <slot v-if="$slots.default"></slot>
    <template v-else>
      <password
        v-if="input.type === 'password'"
        v-model="myValue"
        :clear="false"
        :class="'prompt-input'"
        :placeholder="input.placeholder"
        @input="inputHandler"
      />
      <x-input
        v-else
        v-model="myValue"
        :clear="false"
        :class="'prompt-input'"
        :htmlType="input.type"
        :placeholder="input.placeholder"
        @input="inputHandler"/>
    </template>
  </confirm>
</template>

<script>
import Confirm from '../confirm'
import XInput from '../input'
import Password from '../password'
export default {
  components: {
    Confirm,
    XInput,
    Password
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String
    },
    confirmText: {
      type: String
    },
    title: {
      type: String
    },
    input: {
      type: Object,
      default () {
        return {}
      }
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return ['prompt', this.disabled ?'prompt-disabled' : '']
    }
  },
  data () {
    return {
      myValue: this.value
    }
  },
  methods: {
    closeHandler () {
      this.$emit('on-close')
    },
    confirmHandler () {
      this.open && this.$emit('on-confirm', this.myValue).$emit('input', this.myValue)
    },
    inputHandler (value) {
      this.$emit('on-change', value)
    }
  }
}
</script>

<style lang="scss">
  @import '~styles/variable.scss';
  @import '~styles/mixins.scss';
  .prompt{
      input{
        text-align:left;
        padding-left:0;
      }
      &-title{
        margin-bottom:5px;
        font-size:0.32rem;
      }
      .confirm-body{
        padding:0.7rem 0.5rem;
      }
      &-disabled{
        .confirm-footer button:last-child{
          opacity:0.5;
          pointer-events: none;
        }
      }
    }
</style>
