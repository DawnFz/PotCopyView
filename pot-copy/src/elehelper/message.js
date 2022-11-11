import { ElMessage } from 'element-plus'

export const successMessage = (res) => {
  ElMessage({
    message: `${res.message}`,
    type: 'success',
    showClose: true,
    center: true
  })
}

export const errorMessage = (err) => {
  ElMessage({
    message: `服务器错误：${err.message}`,
    type: 'error',
    showClose: true,
    center: true
  })
}

export const copySuccessMessage = (res) => {
  ElMessage({
    message: `复制成功了喵!`,
    type: 'success',
    showClose: true,
    center: true
  })
}

export const copyErrorMessage = (err) => {
  ElMessage({
    message: `复制失败了喵！咦，还有这种事？${err.message}`,
    type: 'error',
    showClose: true,
    center: true
  })
}
