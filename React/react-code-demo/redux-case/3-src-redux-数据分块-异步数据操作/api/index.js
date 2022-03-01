// 数据请求书写
import axios from 'axios'
import {baseURL} from './env'
const ins = axios.create({
  timeout: 10000,
  baseURL
})
//axios拦截器
ins.interceptors.request.use((config) => {
  config.headers.common.Authorization = localStorage.getItem('token')
  return config 
},(error) => {
  return Promise.reject(error)
})

export const getUserListReq = data => {
    return ins.get('users',{params: data})
}

// 删除用户请求方法
export const delUserListReq = id => {
  return ins.delete(`users/${id}`)
}