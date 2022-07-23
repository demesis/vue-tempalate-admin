
export default {
    namespaced: true,
    state() {
        return {
            // 路由信息
            menus: [],
            // 打开路由列表
            tabList: [{menuId: '/home', name: '首页', url: '/home', keep: false}],
            // 当前路由
            currentTab: null
        }
    },
    mutations: {
        // 打开tab
        openTab (state, tab) {
            // 没有添加，有则替换更新
            const oldTab = state.tabList.find(item => item.menuId === tab.menuId)
            if (oldTab) {
                Object.assign(oldTab, tab)
            } else {
                state.tabList.push(tab)
            }
            state.currentTab = tab
        },
        // 关闭tab
        closeTab (state, tab) {
            state.tabList =  state.tabList.filter(item => {
                return item.menuId !== tab.menuId
            })
        }
        
    },
    actions: {
        openTab ({ commit }, value) {
            commit('openTab', value)
        },
        closeTab ({ commit }, value) {
            commit('closeTab', value)
        }

    },
    getters: {
        
      },
}