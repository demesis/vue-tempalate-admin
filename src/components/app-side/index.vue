

<script>
import { getMenu } from '../../api/menu'
import menuList from '../../utils/menus'
export default {
  name: "app-side",
  props : {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeName: '/home'
    }
  },
  computed: {
    menus () {
      return this.$store.state.menu.menus
    }
  },
  watch: {
    '$route.fullPath'() {
      this.activeName =  this.$route.fullPath
    }
  },
  created () {
    this.activeName =  this.$route.fullPath
    // 先引入默认路由表
    this.$store.state.menu.menus = menuList
    getMenu().then(res => {
      this.$store.state.menu.menus = res.data.data
    })
  },
  methods: {
    // 一级菜单判断是否有子节点
    renderRootMenu (menu) {
      if (menu.children && menu.children.length) {
        return (
          <el-submenu index={menu.menuId}>
            <template slot="title">
              <i class={menu.icon}></i>
              <span slot="title">{menu.name}</span>
            </template>
            {
              menu.children.map(child => this.renderChild(child))
            }
          </el-submenu>
        )
      } else {
        return (
          <el-menu-item index={menu.menuId}>
            <i class={menu.icon}></i>
            <span slot="title">{menu.name}</span>
          </el-menu-item>
        )
      }
    },
    // 二级菜单判断是否有子节点
    renderChild (child) {
      if (child.children && child.children.length) {
        return (
          <el-submenu index={child.menuId}>
            <span slot="title">{child.name}</span>
            {
              child.children.map(item => this.renderChild(item))
            }
          </el-submenu>
        )
      } else {
        return (
          <el-menu-item index={child.menuId}>{child.name}</el-menu-item>
        )
      }
    },
    handleSelect (index, indexPath) {
      // 通过menuId去找到对应的menu中的信息
      let menu
      let menuList = this.menus
      indexPath.forEach(item => {
        menu = menuList.find(menu => {
          return menu.menuId === item
        })
        menuList = menu.children || []
      })
      if (menu && menu.url) {
        this.$store.dispatch('menu/openTab', {
          menuId: menu.menuId,
          name: menu.name,
          url: menu.url
        })
      }
      this.$router.push(menu.url)
    }
  },
  render () {
    return (
      <el-menu
        background-color="#212a39" 
        text-color="#fff"
        active-text-color="#ffd04b"
        class="el-menu-vertical-demo scroll"
        default-active={this.activeName} collapse={this.isCollapse} 
        collapse-transition= {false}
        on-select={this.handleSelect}
        >
        {this.menus.map(item => this.renderRootMenu(item))}
      </el-menu>
    )
  } 
};
</script>