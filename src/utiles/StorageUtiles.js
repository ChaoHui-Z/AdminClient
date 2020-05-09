/* 
操作local数据的工具函数模块
*/

export default{
    /* 
    保存user
    */
    saveUser(user){
        return localStorage.setItem('user_key',JSON.stringify(user))
    },
    /* 
    获取user，如果没有返回空对象
    */
    getUser(){
        return JSON.parse(localStorage.getItem('user_key')|| '{}')
    },
    /* 
    移除user
    */
    reave(){
        return localStorage.removeItem('user_key')
    }
}