// 由于路由为请求接口返回，若创建未及时返回则报错，所以先准备一份路由信息表用于创建时初始化，新增修改页面时需添加配置路由信息
const menuList = [
    {
        menuId: "/home",
        name: "首页",
        icon: "el-icon-s-home",
        url: "/home",
        keep: false
    },
    {
        menuId: "/components",
        name: "组件",
        icon: "el-icon-menu",
        children: [
            {
                menuId: "/components/table",
                name: "表格自适应",
                url: "/components/table"
            },
            {
                menuId: "/components/dialog",
                name: "拖拽对话框",
                url: "/components/dialog"
            },
            
        ]
    },
    {
        menuId: "/about",
        name: "关于",
        icon: "el-icon-s-custom",
        url: "/about"
    },
    {
        menuId: "/chart",
        name: "图表",
        icon: "el-icon-s-data",
        url: "/chart"
    },
]

export default menuList