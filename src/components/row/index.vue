<template>
  <div class="row">
  	<slot>this is a row with nothing</slot>
  </div>
</template>

<script>
export default {
  name: 'row',
  methods: {
    clickHandler (e) {
      this.$emit('click', e)
      console.log('row')
    }
  }
}
</script>

<style lang="scss">
.row{
	margin-left:-10px;
	margin-right:-10px;
	&:after{
		content:'';
		display:block;
		clear:both;
	}
}
</style>
