// 定义需要的接口函数
import request from '../utils/request'

export const getMenu = () => {
    return request('/menu', 'get')
}