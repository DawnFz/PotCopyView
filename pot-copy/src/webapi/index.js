import axios from 'axios'

const $http = axios.create({
  baseURL: 'http://share.snapgenshin.com/PotCopy/api'
  // baseURL: 'http://localhost:8085/PotCopy/api'
})

// 请求拦截器
$http.interceptors.request.use(function (config) {
  // 在发送请求之前获取token加入请求头中
  // config.headers.Authorization = `Bearer ${localStorage.getItem('Token')}`
  return config
}, function (error) {
  // 对请求错误做什么
  return Promise.reject(error)
})

// 添加响应拦截器
$http.interceptors.response.use(function (response) {
  // 直接返回response中的data
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default $http
