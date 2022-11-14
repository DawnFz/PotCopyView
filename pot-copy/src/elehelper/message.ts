import {ElMessage} from 'element-plus'

export const successMessage = (res: any) => {
    ElMessage({
        message: `${res.message}`,
        type: 'success',
        showClose: true,
        center: true
    })
}

export const successTips = (res: any) => {
    ElMessage({
        message: res,
        type: 'success',
        showClose: true,
        center: true
    })
}


export const errorMessage = (err: any) => {
    ElMessage({
        message: `服务器错误：${err.message}`,
        type: 'error',
        showClose: true,
        center: true
    })
}

export const errorTips = (err: any) => {
    ElMessage({
        message: err,
        type: 'error',
        showClose: true,
        center: true
    })
}

export const copySuccessMessage = () => {
    ElMessage({
        message: `复制成功了喵!`,
        type: 'success',
        showClose: true,
        center: true
    })
}

export const copyErrorMessage = (err:any) => {
    ElMessage({
        message: `复制失败了喵！咦，还有这种事？${err.message}`,
        type: 'error',
        showClose: true,
        center: true
    })
}

