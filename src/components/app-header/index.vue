<template>
  <div style="display: flex; align-items: center; justify-content: space-between;">
    <div style="display: flex; align-items: center;">
        <i class="el-icon-s-unfold" style="font-size: 24px; margin-left: 15px; cursor: pointer;" @click="handleCollapse" v-if="isCollapse"></i>
        <i class="el-icon-s-fold" style="font-size: 24px; margin-left: 15px; cursor: pointer;" @click="handleCollapse" v-else></i>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 30px" >
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <transition-group name="el-zoom-in-top">
            <el-breadcrumb-item v-for="item in this.$route.meta" :key="item" >{{item}}</el-breadcrumb-item>
          </transition-group>
        </el-breadcrumb>
    </div>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <div class="photo" style="cursor: pointer;">
          <img src="../../assets/img/admin.jpg" width="40" height="40" style="border-radius: 25%;">
        </div>
      </span>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item @click.native="loginOut">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "app-header",
  props: {
    isCollapse: {
        type: Boolean
    }
  },
  methods: {
    // 点击展开收缩按钮
    handleCollapse () {
        this.$emit('isCollapseChange')
    },
    // 退出登录
    loginOut () {
      sessionStorage.removeItem('userName');
      this.$message.success('注销成功')
      this.$router.replace('/login')
    }
  }
};
</script>

<style scoped lang="less">


</style>