<template>
  <div id="feedback">

    <slidebar :class="slideBarClass" :collapse="isCollapse"></slidebar>

    <navbar :class="navBarClass" @change="changeCollapse"></navbar>

    <div class="container" :class="containerClass">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        containerClass: 'container-normal',
        slideBarClass: 'slideBar-normal',
        navBarClass: 'navBar-normal',
        isCollapse: false
      }
    },
    methods: {
      changeCollapse (isCollapse) {
        if (isCollapse) {
          this.isCollapse = true
          this.slideBarClass = 'slideBar-none'
          this.containerClass = 'container-collapse'
          this.navBarClass = 'navBar-none'
        } else {
          this.isCollapse = false
          this.slideBarClass = 'slideBar-normal'
          this.containerClass = 'container-normal'
          this.navBarClass = 'navBar-normal'
        }
      }
    }
  }
</script>
<style>
  .container-normal {
    transition: margin-left 0.25s ease-out;
    margin-left: 200px;
    padding: 20px 20px 60px 20px;
  }

  .container-collapse {
    transition: margin-left 0.25s ease-out;
    margin-left: 64px;
    padding: 20px 20px 60px 20px;
  }
</style>
