import $http from './index'
import {errorMessage, errorTips, successTips} from "../elehelper/message";
import router from "../router";
import qs from 'qs';

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

// 获取洞天区域
export const getBlocks = (typeId: number) => {
    return $http({
        method: 'get',
        url: 'Params/blocks',
        params: {
            typeId: typeId
        }
    }).then(res => {
        return res.data
    }).catch(err => {
        errorMessage(err)
    })
}

// 获取标签
export const getTags = () => {
    return $http({
        method: 'get',
        url: 'Params/tags',
        params: {
            pageNum: 1
        }
    }).then(res => {
        return res.data.content
    }).catch(err => {
        errorMessage(err)
    })
}

// 分享我的摹本
export const addCopyInfo = (data: any) => {
    return $http({
        method: 'post',
        url: '/Info/shareCopyInfo',
        data: qs.stringify(data, {
            indices: false
        })
    }).then(res => {
        let message: string = res.status.toString()
        if (message === 'error') {
            errorMessage(res)
        } else {
            successTips(res.data)
            setTimeout(() => {
                router.push({
                    path: 'info-list',
                }).catch()
            }, 500)
        }
    }).catch(err => {
        errorMessage(err)
    })
}
