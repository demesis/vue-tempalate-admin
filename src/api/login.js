// 定义需要的接口函数
import request from '../utils/request'

export const Login = (data) => {
    return request('/login', 'post', data)
}