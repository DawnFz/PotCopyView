import axios from 'axios'

const $http = axios.create({
    baseURL: 'http://share.snapgenshin.com/PotCopy/api'
    // baseURL: 'http://localhost:8080/'
})

// 请求拦截器
$http.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})

// 添加响应拦截器
$http.interceptors.response.use(function (response) {
    return response.data
}, function (error) {
    return Promise.reject(error)
})

export default $http
