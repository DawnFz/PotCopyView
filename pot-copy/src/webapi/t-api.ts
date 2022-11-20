// 获取管理后台授权Token
import $http from "./index";
import {errorMessage, errorTips, successTips} from "../elehelper/message";
import router from "../router";
import qs from "qs";

export const getAuthToken = (username: string, password: string) => {
    return $http({
        method: 'post',
        url: 'Author/login',
        params: {
            username: username,
            password: password
        }
    }).then(res => {
        let status: string = res.status.toString()
        // @ts-ignore
        let message: string = res.message
        if (status === 'error') {
            errorTips(message)
        } else {
            localStorage.setItem("Token", res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data))
            successTips(message)
            if (res.data.roleLevel === 0) {
                setTimeout(() => {
                    router.push("manager").catch()
                }, 1000)
            } else if (res.data.roleLevel === 1) {
                setTimeout(() => {
                    router.push("author").catch()
                }, 1000)
            } else {
                setTimeout(() => {
                    router.push("/#").catch()
                }, 1000)
            }
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

// 获取摹本列表[管理员]
export const allCopyInfos = (data: any) => {
    return $http({
        method: 'get',
        url: 'Manager/allCopyInfos',
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

// 获取摹本列表[创作者]
export const mySharedInfos = (data: any) => {
    return $http({
        method: 'get',
        url: 'Author/mySharedInfos',
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

// 编辑我的摹本
export const editCopyInfo = (data: any) => {
    return $http({
        method: 'post',
        url: '/Author/editCopyInfo',
        data: data
    }).then(res => {
        let message: string = res.status.toString()
        if (message === 'error') {
            errorMessage(res)
        } else {
            successTips(res.data)
            setTimeout(() => {
                location.reload();
            }, 500)
        }
    }).catch(err => {
        errorMessage(err)
    })
}

// 分享我的摹本
export const shareCopyInfoVerity = (data: any) => {
    return $http({
        method: 'post',
        url: '/Author/shareCopyInfoVerity',
        data: data
    }).then(res => {
        let message: string = res.status.toString()
        if (message === 'error') {
            errorMessage(res)
        } else {
            successTips(res.data)
            location.href = "/#/author/my-info"
        }
    }).catch(err => {
        errorMessage(err)
    })
}

// 删除我分享的摹本
export const delCopyInfo = (copyId: string) => {
    return $http({
        method: 'delete',
        url: '/Author/delCopyInfo',
        params: {
            copyId: copyId
        }
    }).then(res => {
        let message: string = res.status.toString()
        if (message === 'error') {
            errorMessage(res)
        } else {
            successTips(res.data)
            location.href = "/#/author/my-info"
        }
    }).catch(err => {
        errorMessage(err)
    })
}

// 删除我分享的摹本
export const delReport = (copyId: string, tips: boolean) => {
    return $http({
        method: 'delete',
        url: '/Manager/delReport',
        params: {
            copyId: copyId
        }
    }).then(res => {
        let message: string = res.status.toString()
        if (message === 'error') {
            errorMessage(res)
        } else {
            if (tips) successTips(res.data)
        }
    }).catch(err => {
        errorMessage(err)
    })
}

// 管理员删除摹本
export const managerDelCopyInfo = (copyId: string) => {
    return $http({
        method: 'delete',
        url: '/Manager/delCopyInfo',
        params: {
            copyId: copyId
        }
    }).then(res => {
        let message: string = res.status.toString()
        if (message === 'error') {
            errorMessage(res)
        } else {
            successTips(res.data)
        }
    }).catch(err => {
        errorMessage(err)
    })
}

// 查询举报信息
export const getAllReports = (data: any) => {
    return $http({
        method: 'get',
        url: '/Manager/getAllReports',
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
