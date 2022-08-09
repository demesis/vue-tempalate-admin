<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  created() {
    this.$store.state.user.profile.userName = sessionStorage.getItem('userName')
  }
}
</script>

<style lang="less">
</style>
