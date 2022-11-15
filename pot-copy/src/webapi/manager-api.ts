// 获取管理后台授权Token
import $http from "./index";
import {errorMessage, errorTips, successTips} from "../elehelper/message";

export const getAuthToken = (grantee: string, key: string) => {
    return $http({
        method: 'post',
        url: 'Auth/getToken',
        params: {
            grantee: grantee,
            key: key
        }
    }).then(res => {
        let status: string = res.status.toString()
        // @ts-ignore
        let message: string = res.message
        if (status === 'error') {
            errorTips(message)
        } else {
            localStorage.setItem("Token", res.data)
            successTips(message)
            return true
        }
    }).catch(err => {
        errorMessage(err)
    })
}

// 获取摹本列表
export const getManagerCopyInfos = (data: any) => {
    return $http({
        method: 'get',
        url: 'Manager/managerInfos',
        params: {
            pageNum: data.pageNum,
            pageSize: data.pageSize
        }
    }).then(res => {
        let message: string = res.status.toString()
        if (message === 'error') {
            errorMessage(res)
        } else {
            return res.data
        }
    }).catch(err => {
        errorMessage(err)
        location.href = "/#/";
    })
}

// 获取单个摹本
export const getManagerCopyInfo = (copyId: any) => {
    return $http({
        method: 'get',
        url: 'Manager/managerInfo',
        params: {copyId: copyId}
    }).then(res => {
        let message: string = res.status.toString()
        if (message === 'error') {
            errorMessage(res)
        } else {
            return res.data
        }
    }).catch(err => {
        errorMessage(err)
        location.href = "/#/";
    })
}

// 修改摹本审核状态
export const updateCopyInfo = (data: any) => {
    return $http({
        method: 'post',
        url: 'Manager/updateInfo',
        params: data
    }).then(res => {
        let message: string = res.status.toString()
        if (message === 'error') {
            errorMessage(res)
        } else {
            successTips(res.data)
            return true;
        }
    }).catch(err => {
        errorMessage(err)
        location.href = "/#/";
    })
}
