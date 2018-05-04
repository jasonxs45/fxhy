<template>
  <div :class="classes">
    <template v-for="(item,index) in groups">
      <accordion
        :title="item.jobTitle"
        :menus="item.jobmenu"
        :index="index"
        :showing="item.showing"
        @title-click="mutualCheck"
        :key="'accordion'+index"
      >
      </accordion>
    </template>
  </div>
</template>

<script>
import Accordion from './Accordion'
export default {
  name: 'accordion-group',
  props: {
    groups: {
      type: Array
    },
    mutual: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Accordion
  },
  computed: {
    classes () {
      return ['accordion-group']
    }
  },
  data () {
    return {
    }
  },
  methods: {
    mutualCheck (o, value) {
      this.$emit('mutual-accordion', o, value)
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
  @import '~styles/variable.scss';
  @import '~styles/mixins.scss';
  .accordion-group{}
</style>
