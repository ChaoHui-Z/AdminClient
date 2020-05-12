/* 
封装的能发ajax请求的函数
*/
import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'

// 添加请求拦截器: 让post请求的请求体格式为urlencoded格式 a=1&b2
axios.interceptors.request.use(function (config) {
  const {method, data} = config
  if (method.toLowerCase() === 'post' && typeof data==='object') {
    config.data = qs.stringify(data) 
  }

  return config
})


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  
  return response.data 
}, function (error) { 
  message.error('请求出错 ' + error.message)
  return new Promise(() => {})
});


export default axios