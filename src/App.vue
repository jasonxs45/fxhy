<template>
  <div id="app">
    <layout>
      <x-header slot="header" :back="false">
        <div class="side-menu-btn left" slot="left"></div>
        <div slot="title" class="logo">
          <img class="my-img" src="static/images/logo.png"/>
        </div>
        <button class="btn-pull search-btn" slot="pull"></button>
      </x-header>
      <x-body slot="body">
        <router-view></router-view>
      </x-body>
    </layout>
  </div>
</template>

<script>
import {
  Layout,
  XHeader,
  XBody
} from 'components'
export default {
  name: 'app',
  components: {
  	Layout,
  	XHeader,
  	XBody
  }
}
</script>

<style lang="scss">
@import '~styles/variable.scss';
@import '~styles/mixins.scss';
.logo{
  .my-img{
    width:3.8rem;
    vertical-align:middle;
  }
}
</style>
