<template>
  <div>
    <AppHeader id="app-header" @isCollapseChange="isCollapseChange" :isCollapse="isCollapse" :style="{ left: isCollapse === true ? '64px' : '15%'}"/>
    <transition name="el-zoom-in-center">
        <AppSide id="app-side" :isCollapse="isCollapse" :style="{ width: isCollapse === true ? '64px' : '15%'}"/>
    </transition>
    <AppMain id="app-main" :style="{ left: isCollapse === true ? '64px' : '15%'}"/>
  </div>
</template>

<script>
import AppMain from '../app-main/index.vue'
import AppSide from '../app-side/index.vue'
import AppHeader from '../app-header/index.vue'
export default {
  name: 'Frame-index',
  components: { AppMain, AppSide, AppHeader },
  data () {
      return {
        // 是否展开状态栏
        isCollapse: false
      }
  },
  methods: {
    isCollapseChange () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped lang="less">
#app-header {
    position: fixed;
    height: 60px;
    padding-right: 30px;
    z-index: 100;
    background: #FFFFFF;
    box-shadow: 0 4px 24px 0 rgba(37, 38, 94, 0.10);
    box-sizing: border-box;
    left: 15%;
    top: 0;
    right: 0;
  }
#app-main {
    position: absolute;
    top: 60px;
    left: 15%;
    right: 0;
    bottom: 0;
    // background: gray;
}
#app-side {
    width: 15%;
    position: fixed;
    top: 0;
    bottom: 0;
    background: #212a39;
    z-index: 100;
    overflow-y: auto;
    .logo {
      padding: 24px 0 0;
      text-align: center;
      /*height: 56px;*/

      img {
        width: 32px;
      }
    }
}
</style>