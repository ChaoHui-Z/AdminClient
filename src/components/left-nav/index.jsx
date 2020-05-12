import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo192.png'
import './index.less'
import memoryUtils from '../../utils/memoryUtils';

const { SubMenu } = Menu

/* 
左侧导航组件
*/
class LeftNav extends Component {

  hasAuth  = (item) => {
    // 得到当前用户的所有权限
    const user = memoryUtils.user
    const menus = user.role.menus

    if (user.username === 'admin' || item.public || menus.indexOf(item.key)!==-1) {
      return true
    } else if (item.children) {
      const cItem = item.children.find(cItem => menus.indexOf(cItem.key)!==-1)
      return !!cItem 
    }

    
    return false
  }

  getMenuNodes2 = (menuList) => {

    const path = this.props.location.pathname

    return menuList.reduce((pre, item) => {
      if (this.hasAuth(item)) {
        if (!item.children) {
          pre.push((
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))
        } else { 
          const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
          if (cItem) {
            this.openKey = item.key
          }

          pre.push((
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getMenuNodes2(item.children)}
            </SubMenu>
          ))
        }
      }
      
      return pre
    }, [])
  }


  getMenuNodes = (menuList) => {

    // 得到当前请求的path
    const path = this.props.location.pathname

    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        if (item.children.find(cItem => path.indexOf(cItem.key) === 0)) {
          this.openKey = item.key
        }
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }

 
  componentWillMount () {
   this.menuNodes = this.getMenuNodes2(menuList)
  }


  render() {
   
    // 得到当前请求路径, 作为选中菜单项的key
    let selectKey = this.props.location.pathname // /product/xxx
    if (selectKey.indexOf('/product')===0) {
      selectKey = '/product'
    }
    
    return (
      <div className="left-nav">
        <Link className="left-nav-link" to="/home">
          <img src={logo} alt="logo"/>
          <h1>REACT后台</h1>
        </Link>

        <Menu
          selectedKeys={[selectKey]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          { this.menuNodes }
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)
