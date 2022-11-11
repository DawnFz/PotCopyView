import $http from './index'
import {errorMessage} from "../elehelper/message";

// 获取摹本列表
export const getCopyInfos = (data: any) => {
    return $http({
        method: 'get',
        url: 'Info/copyInfos',
        params: data
    }).then(res => {
        let message: string = res.status.toString()
        if (message === 'error') {
            errorMessage(res)
        } else {
            return res.data
        }
    }).catch(err => {
        errorMessage(err)
    })
}

// 获取单个摹本
export const getCopyInfo = (copyId: any) => {
    return $http({
        method: 'get',
        url: 'Info/copyInfo',
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
    })
}

// 获取洞天类型
export const getPotTypes = () => {
    return $http({
        method: 'get',
        url: 'Params/types'
    }).then(res => {
        return res.data
    }).catch(err => {
        errorMessage(err)
    })
}
