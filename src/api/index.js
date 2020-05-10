/* 
包含应用中所有请求接口的函数: 接口请求函数
函数的返回值都是promise对象
*/

import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd';




//地址
const BASE = ''

// 请求登录
export const reqLogin = (username, password) =>  ajax.post(BASE + '/login', {username, password})

// 发送jsonp请求得到天气信息
export const reqWeather = (city) => {

  
    return new Promise((resolve, reject) => { 
      const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
      jsonp(url, {}, (error, data) => {
        if (!error && data.error===0) { // 成功的
          const {dayPictureUrl, weather} = data.results[0].weather_data[0]
          resolve({dayPictureUrl, weather})
        } else { // 失败的
          message.error('获取天气信息失败')
        }
  
      })
    })
    
  }