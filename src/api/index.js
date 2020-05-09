/* 
包含应用中所有请求接口的函数: 接口请求函数
函数的返回值都是promise对象
*/

import ajax from './ajax'




//地址
const BASE = ''

// 请求登录
export const reqLogin = (username, password) =>  ajax.post(BASE + '/login', {username, password})