<template>
  <div class="container">
  	<slot>this is container with nothing</slot>
  </div>
</template>

<script>
export default {
  name: 'container',
  methods: {
    clickHandler (e) {
      this.$emit('click', e)
      console.log('container')
    }
  }
}
</script>

<style lang="scss">
.container{
	padding:0 10px;
	&:after{
		content:'';
		display:block;
		clear:both;
	}
}
</style>
