<template>
  <div>
    <h3>改变权限</h3>
    <el-button-group>
        <el-button type="primary" :disabled="activeName === 'admin'" icon="el-icon-user-solid" @click="changePermisssion">admin</el-button>
        <el-button type="primary" :disabled="activeName !== 'admin'" icon="el-icon-user" @click="changePermisssion">user</el-button>
    </el-button-group>
    <h2>当前权限：{{activeName}}</h2>
    <el-button @click="toPage('/permission/page')" type="primary">前往权限测试页</el-button>
    <el-button @click="toPage('/404')" type="primary">前往空白页</el-button>
  </div>
</template>

<script>
import { getMenu } from '../../api/menu'
export default {
  name: 'Change',
  computed :{
    activeName () {
      return this.$store.state.user.profile.userName
    }
  },
  methods: {
    // 改变权限
    changePermisssion () {
      if (this.activeName === 'admin') {
        getMenu({userName: 'user'}).then(res => {
          this.$store.state.menu.menus = res.data
          this.$store.state.user.profile.userName = 'user'
        })
        // 删除权限测试页tab
        this.$store.dispatch('menu/closeTab', {
          menuId:"/permission/page",
          name:"权限测试页",
          url:"/permission/page"
          }
        )
      } else {
        getMenu({userName: 'admin'}).then(res => {
          this.$store.state.menu.menus = res.data
          this.$store.state.user.profile.userName = 'admin'
        })
      }
    },
    toPage (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style>

</style>