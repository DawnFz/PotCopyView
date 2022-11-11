import $http from '../webapi/index'

// 获取摹本列表
export const getCopyInfos = (data) => {
    return $http({
        method: 'get',
        url: 'Info/copyInfos',
        params: {
            pageNum: data.pageNum,
            pageSize: data.pageSize,
            copyName: data.copyName,
            typeId: data.typeId,
            blockId: data.blockId,
            tagNames: data.tagNames
        }
    })
}

// 获取洞天类型
export const getPotTypes = () => {
    return $http({
        method: 'get',
        url: 'Params/types'
    })
}
