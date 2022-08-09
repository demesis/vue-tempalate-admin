// 定义需要的接口函数
import request from '../utils/request'

export const getMenu = (data) => {
    return request('/menu', 'post', data)
}