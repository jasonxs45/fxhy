import './index.scss'
import '../utils/polyfill'
import Vue from 'vue'
import Overlay from './overlay'
import XButton from './button'
import XInput from './input'
import XSelect from './select'
import Password from './password'
import {Actionsheet, ActionsheetItem} from './actionsheet'
import Datetime from './datetime'
import Popup from './popup'
import {Swiper, SwiperItem} from './swiper'
import {Tab, TabItem} from './tab'
import {Sidebar, SidebarItem} from './sidebar'
import {Flexbox, FlexboxItem} from './flexbox'
import Confirm from './confirm'
import Prompt from './prompt'
import Picker from './picker'
import Alert from './alert'
import Toast from './toast'
import XImg from './img'
import Layout from './layout'
import XHeader from './header'
import Footnav from './footnav'
import XBody from './body'
import XLink from './link'
import Spinner from './spinner'
import Icon from './icon'
import Container from './container'
import Row from './row'
import Split from './split'
import {Ptlist, Ptlistitem} from './ptlist'
import {Accordion, AccordionGroup} from './accordion'
import Preview from './preview'
((w) => {
  w.$toast = (props, mounted = document.body) => {
    props = Object.assign({
      open: true,
      onClose: () => {
        return true
      }
    }, props)
    let node = document.createElement('div')
    mounted.appendChild(node)
    let vue = new Vue({ //eslint-disable-line
      el: node,
      template: `
        <toast
          :open="props.open"
          :duration="props.duration"
          :type="props.type"
          :align="props.align"
          @on-close="closeHandler">
          {{props.content}}
        </toast>
      `,
      components: {Toast},
      data: {props: props},
      methods: {
        closeHandler: () => {
          props.open = props.onClose() === false
          !props.open && setTimeout(() => {
            vue.$destroy()
          }, 1000)
        }
      },
      destroyed: () => {
        requestAnimationFrame(() => {
          vue.$el.remove()
        })
      }
    })
    return vue
  }

  w.$alert = (props, mounted = document.body) => {
    props = Object.assign({
      open: true,
      onConfirm: () => {
        return true
      }
    }, props)
    let node = document.createElement('div')
    mounted.appendChild(node)
    let vue = new Vue({ //eslint-disable-line
      el: node,
      template: `
        <alert
          :open="props.open"
          :confirm-text="props.confirmText"
          @on-confirm="confirmHandler"
          @on-close="closeHandler">
            <div class="content" v-html="props.content"></div>
        </alert>
      `,
      components: {Alert},
      data: {props: props},
      methods: {
        confirmHandler: () => {
          props.open = props.onConfirm() === false
          !props.open && setTimeout(() => {
            vue.$destroy()
          }, 1000)
        },
        closeHandler: () => {
          props.open = props.onCancel() === false
          !props.open && setTimeout(() => {
            vue.$destroy()
          }, 1000)
        }
      },
      destroyed: () => {
        requestAnimationFrame(() => {
          vue.$el.remove()
        })
      }
    })
    return vue
  }

  w.$confirm = (props, mounted = document.body) => {
    props = Object.assign({
      open: true,
      onConfirm: () => {
        return true
      },
      onCancel: () => {
        return true
      }
    }, props)
    let node = document.createElement('div')
    mounted.appendChild(node)
    let vue = new Vue({ //eslint-disable-line
      el: node,
      template: `
        <confirm
          :open="props.open"
          :confirm-text="props.confirmText"
          :cancel-text="props.cancelText"
          @on-confirm="confirmHandler"
          @on-close="closeHandler">
          {{props.content}}
        </confirm>
      `,
      components: {Confirm},
      data: {props: props},
      methods: {
        confirmHandler: () => {
          props.open = props.onConfirm() === false
          !props.open && setTimeout(() => {
            vue.$destroy()
          }, 1000)
        },
        closeHandler: () => {
          props.open = props.onCancel() === false
          !props.open && setTimeout(() => {
            vue.$destroy()
          }, 1000)
        }
      },
      destroyed: () => {
        requestAnimationFrame(() => {
          vue.$el.remove()
        })
      }
    })
    return vue
  }
  w.$prompt = (props, mounted = document.body) => {
    props = Object.assign({
      open: true,
      disabled: true,
      onConfirm: () => {
        return true
      },
      onCancel: () => {
        return true
      },
      onChange: (value) => {
        if (value && value.trim()) {
          return false
        } else {
          return true
        }
      }
    }, props)
    let node = document.createElement('div')
    mounted.appendChild(node)
    let vue = new Vue({ //eslint-disable-line
      el: node,
      template: `
        <prompt
          :title="props.title"
          :open="props.open"
          :disabled="props.disabled"
          :input="props.input"
          :confirm-text="props.confirmText"
          :cancel-text="props.cancelText"
          @on-confirm="confirmHandler"
          @on-close="closeHandler"
          @on-change="changeHandler"/>
      `,
      components: {Prompt},
      data: {props: props},
      methods: {
        confirmHandler: () => {
          props.open = props.onConfirm() === false
          !props.open && setTimeout(() => {
            vue.$destroy()
          }, 1000)
        },
        closeHandler: () => {
          props.open = props.onCancel() === false
          !props.open && setTimeout(() => {
            vue.$destroy()
          }, 1000)
        },
        changeHandler: (value) => {
          props.disabled = props.onChange(value)
        }
      },
      destroyed: () => {
        requestAnimationFrame(() => {
          vue.$el.remove()
        })
      }
    })
    return vue
  }
})(window)

export {
  XInput,
  XButton,
  Password,
  XSelect,
  Actionsheet,
  ActionsheetItem,
  Datetime,
  Overlay,
  Popup,
  Picker,
  Swiper,
  SwiperItem,
  Spinner,
  Tab,
  TabItem,
  Sidebar,
  SidebarItem,
  Flexbox,
  FlexboxItem,
  Confirm,
  Prompt,
  Alert,
  Toast,
  XImg,
  Layout,
  XHeader,
  Footnav,
  XBody,
  XLink,
  Icon,
  Container,
  Row,
  Split,
  Ptlist,
  Ptlistitem,
  Accordion,
  AccordionGroup,
  Preview
}
