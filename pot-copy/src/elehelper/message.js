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
