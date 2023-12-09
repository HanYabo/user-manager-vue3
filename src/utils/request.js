import axios from 'axios'
import { ElMessage } from 'element-plus'

const instance = axios.create({
    baseURL: 'http://localhost:8081',
    timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
    config => {
        config.headers['Authentication'] = 'f125d882-d774-bca8-1a5b-9b5a80a14f09'
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
instance.interceptors.response.use(
    response => {
        const res = response.data
        if(res.code !== 200) {
            ElMessage({
                type: 'error',
                message: res.message,
                duration: 5 * 1000
            })
            return Promise.reject('error')
        }else {
            return response.data
        }
    },
    error => {
        ElMessage({
            type: 'error',
            message: error.message,
            duration: 5 * 1000
        })
    }
)

export default instance