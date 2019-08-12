import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import md5Hex from 'md5-hex'
import { toByteStringUTF8 } from './utf8'
import { MessageBox, Message } from 'element-ui'
import { getToken } from '@/utils/auth'

// 接口密钥，需要与后台一致
const CIPHER = process.env.VUE_APP_CIPHER

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 默认为application/json
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }

    // 签名认证
    if (!config.params) {
      config.params = {}
    }

    const sign = getSign(config)
    config.params['sign'] = sign

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 自定义状态吗，未登录则重定向
      if (res.code === 4011) {
        // to re-login
        MessageBox.confirm('当前登录无效，请重新登录！', '重新登录', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('admin/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

function getLinkedString(config) {
  const arr = []
  let dataObj = {}
  for (const key in config.params) {
    arr.push(key)
  }

  if (isString(config.data)) {
    dataObj = qs.parse(config.data)
    for (const key in dataObj) {
      arr.push(key)
    }
  } else if (config.data instanceof FormData) {
    for (const key of config.data.keys()) {
      if (!(config.data.get(key) instanceof Object)) { arr.push(key) }
    }
  } else {
    for (const key in config.data) {
      if (!(config.data[key] instanceof Object)) { arr.push(key) }
    }
  }
  arr.sort()
  let str = ''
  for (const i in arr) {
    if (config.params[arr[i]]) {
      str += arr[i] + '=' + config.params[arr[i]] + '&'
    } else {
      if (config.data instanceof FormData) {
        str += arr[i] + '=' + config.data.get(arr[i]) + '&'
      } else if (isString(config.data)) {
        str += arr[i] + '=' + dataObj[arr[i]] + '&'
      } else {
        str += arr[i] + '=' + config.data[arr[i]] + '&'
      }
    }
  }
  return str.substr(0, str.length - 1)
}

function isString(str) {
  return (typeof str === 'string') && str.constructor === String
}

function getSign(config) {
  const linkedString = getLinkedString(config)
  const sign = md5Hex(toByteStringUTF8(linkedString + CIPHER))
  return sign
}

export default service
