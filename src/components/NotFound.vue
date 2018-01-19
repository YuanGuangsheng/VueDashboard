<template>
  <div style="width: 900px;height: 576px;margin: 0 auto;" @click="back">
    <img src="/static/default/img/icon/404.jpg" alt="" style="">
  </div>
</template>

<script>
  export default {
    methods: {
      back () {
        this.$router.push('/home')
      }
    }
  }
</script>
