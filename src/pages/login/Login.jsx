import React, {Component} from 'react'
import {Form, Input, Button, message} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import {Redirect} from 'react-router-dom'
import './Login.less'
import logo from './images/logo192.png'
import {reqLogin} from '../../api'
import StorageUtiles from '../../utiles/StorageUtiles'
import MemoryUtiles from '../../utiles/MemoryUtiles.js'

export default class Login extends Component {

  onFinish = async value => {

    //console.log(value);
    let {username, password} = value
    const result = await reqLogin(username, password)
    //console.log(result);

    if (result.status === 0) {
      let user = result.data
      //console.log(user);
      // localStorage.setItem('user_id',JSON.stringify(users))
      StorageUtiles.saveUser(user)
      MemoryUtiles.user = user
      this.props.history.replace('/')
      message.success('登录成功！')
    } else {
      message.error(result.msg)
    }

  }

  render() {
    const user = MemoryUtiles.user
    if (user._id) {
      return <Redirect to='/'/>
    }

    return (
      <div className='login'>
        <div className='login-header'>
          <img src={logo} alt=""/>
          <h1>React项目：后台管理系统</h1>
        </div>
        <div className='login-conenter'>
          <h1>用户登录</h1>
          <Form name="normal_login" className="login-form" onFinish={this.onFinish}>
            <Form.Item name="username"
                       rules={[
                         {required: true, message: '用户名不能为空！', whitespace: true},
                         {min: 4, message: '用户名长度不能小于4位'},
                         {max: 12, message: '用户名长度不能大于12位'},
                         {pattern: /^[a-zA-Z0-9_]+$/, message: '请不要输入非法字符'}
                       ]}>
              <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
            </Form.Item>
            <Form.Item name="password"
                       rules={[
                         {required: true, message: '密码不能为空！', whitespace: true},
                         {min: 4, message: '密码长度不能小于4位'},
                         {max: 12, message: '密码长度不能大于12位'},
                         {pattern: /^[a-zA-Z0-9_]+$/, message: '请不要输入非法字符'}
                       ]}>
              <Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password" placeholder="密码"/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
