import axios from 'axios'
import router from "../router";
import {errorTips} from "../elehelper/message";

const $http = axios.create({
    baseURL: 'https://share.snapgenshin.com/PotCopy/api'
    // baseURL: 'https://localhost/PotCopy/api'
})

//请求拦截器
$http.interceptors.request.use((config: any) => {
    let token: any = window.localStorage.getItem("Token");
    if (token !== null) {
        config.headers['Authorization'] = `Bearer ${token}`// 携带Token到请求头
    }
    return config;
}, (error) => {
    return Promise.reject(error)
})

// 添加响应拦截器
$http.interceptors.response.use((response) => {
    if (response.data.code === 401) {
        location.href = "/#/"
        errorTips(response.data.message)
    }
    return response.data
}, function (error) {
    if (error.response.status === 401) {
        error.message = "未登录或登录状态已过期"
        localStorage.clear()
        location.href = "/#/"
    }
    return Promise.reject(error)
})

export default $http
