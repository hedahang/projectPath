import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import {
    getCookie
} from '@/utils/auth'
import {
    util
} from "@/utils/index";

// 创建axios实例
const service = axios.create({
    // api 的base_url
    // baseURL: process.env.BASE_API,
    // 请求超时时间
    timeout: 20000,
    //指示是否跨站点访问控制请求
    withCredentials: true
})

// request拦截器
service.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['Authorization'] = `Bearer ${getCookie('token')}` // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config
}, error => {
    // Do something with request error
    util.log('request error', error) // for debug
    Promise.reject(error)
})

// respone拦截器
var hasErroMsg = false;
var erroMsg = '';
service.interceptors.response.use(
    response => {
        /**
         * code为非200是抛错 可结合自己业务进行修改
         */
        const rs = response.data;
        console.log(Vue)
        if (!rs.status) {
            // 业务错误
            erroMsg = rs.message;
            if (!hasErroMsg) {
                hasErroMsg = true;
                Vue.$vux.toast.text(erroMsg, 'middle')
                hasErroMsg = false;
            }
            return Promise.reject('error')
        } else {
            // 请求成功后返回 data 字段的数据
            return response.data
        }
    },
    (error) => {
        erroMsg = error;
        if (error == 'Error: Network Error') {
            erroMsg = '好像断网了，请检查你的网络！'
        }
        if (!hasErroMsg) {
            hasErroMsg = true;
            Vue.$vux.toast.text(erroMsg, 'middle')
        }
        return Promise.reject(erroMsg)
    }
)

let request = Object.assign({}, service);
request.get = (url, params) => {
    return service.get(url, {
        params
    });
}
request.delete = (url, params) => {
    return service.delete(url, {
        params
    });
}
export default request