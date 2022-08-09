import Mock from "mockjs"

import menu from "./menu.json"
import userMenu from "./user-menu.json"

// 模拟菜单请求
Mock.mock("/mock/menu", 'post', config => {
    let { userName } = JSON.parse(config.body)
    if (userName === 'admin') {
        return { code: 200, message: "成功", data: menu }
    } else {
        return { code: 200, message: "成功", data: userMenu }
    }
})

// 模拟登录请求
Mock.mock("/mock/login", 'post', config => {
    let { userName, password } = JSON.parse(config.body) 
    if (userName === 'admin' && password === '123456') {
        return {
            code: 200,
            message: '登录成功'
        }
    } else{
        return {
            code: 0,
            message: '账号密码错误'
        }
    }
})