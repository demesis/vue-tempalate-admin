<template>
  <div id="app-main">
    <div class="tab">
      <!-- 列表 -->
      <el-tabs
        v-model="activeName"
        type="card"
        @tab-click="handleTabClick"
        @tab-remove="handleTabRemove"
      >
        <el-tab-pane
          v-for="(item, index) in tabList"
          :label="item.name"
          :key="item.menuId"
          :name="item.menuId"
          :closable="index !== 0"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="content">
      <transition name="el-zoom-in-top">
        <keep-route ref="keepRoute" :keepId="keepId">
          <router-view/>
        </keep-route>
      </transition> 
    </div>
  </div>
</template>

<script>
import '../keep-route'
export default {
  name: "top-tab",
  data() {
    return {
      keepId: undefined
    };
  },
  computed: {
    activeName: {
      get() {
        return (
          this.$store.state.menu.currentTab &&
          this.$store.state.menu.currentTab.menuId
        );
      },
      set() {

      }
    },
    tabList() {
      return this.$store.state.menu.tabList;
    },
  },
  methods: {
    // 点击tab
    handleTabClick(tab) {
      let currentTab = this.tabList.find((item) => item.menuId === tab.name);
      if (currentTab) {
        this.$store.dispatch("menu/openTab", currentTab);
        this.$router.push(currentTab.url);
      }
    },
    // 关闭tab
    handleTabRemove(name) {
        let tab = this.tabList.find(item => item.menuId === name)
        // 关闭当前已打开的tab,切换到上一个或者下一个tab
        if (this.activeName === name) { 
          let nextTab
          this.tabList.forEach((tab, index) => {
            if (tab.menuId === name) {
              nextTab = this.tabList[index + 1] || this.tabList[index - 1]
            }
          })

          // 切换tab
          if (nextTab) {
            this.$store.dispatch('menu/openTab', nextTab)
            this.$router.push(nextTab.url)
          }
        }

        this.$store.dispatch('menu/closeTab', tab)

        // 删除缓存
        this.$refs.keepRoute.remove(tab.menuId)
    },
    initTab () {
      // 获取路由表信息
      let menus = this.$store.state.menu.menus
      // 获取当前路由
      let fullPath = this.$route.fullPath
      // 递归在路由表寻找路由信息
      const findMenu = (url, menuList) => {
        if (menuList) {
          for (let item of menuList) {
            let menu = item.url === url ? item : findMenu(url, item.children)

            if (menu) {
              return menu
            }
          }
        }
      }
      let currentTab = findMenu(fullPath, menus)
      if (currentTab && currentTab.url) {
          this.$store.dispatch('menu/openTab', {
            menuId: currentTab.menuId,
            name: currentTab.name,
            url: currentTab.url
          })
      }
      // 判断组件是否要保持状态
      if (currentTab.keep === false) {
        this.keepId = undefined
      } else {
        this.keepId = currentTab.menuId
      }
    }
    
  },
  watch: {
    '$route.fullPath'() {
      this.initTab()
    }
  },
  mounted () {
    this.initTab()
  }
};
</script>

<style scoped lang="less">
.content {
  box-sizing: border-box;
  position: absolute;
  top: 40px;
  bottom: 0;
  padding: 10px;
  width: 100%;
  overflow-y: auto;
  background-color: #f6f6f8;
}
</style>