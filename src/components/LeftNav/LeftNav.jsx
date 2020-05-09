import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Menu} from 'antd';
import {
  AppstoreOutlined,
  HomeOutlined,
  BarsOutlined,
  LayoutOutlined,
  UserOutlined,
  SafetyOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined
} from '@ant-design/icons'
import logo from '../../assets/images/logo192.png'
import './LeftNav.less'


const {SubMenu} = Menu;


class LeftNav extends Component {
  rootSubmenuKeys = ['/products', '/charts']

  state = {
    openKeys: [''],
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  render() {
    const selectKey = this.props.location.pathname
    return (
      <div className='left-nav'>
        <Link to='/home' className='left-nav-header'>
          <img src={logo} alt="logo"/>
          <h1>后台系统</h1>
        </Link>
        <div className='left-nav-link'>
          <Menu
            selectedKeys={[selectKey]}
            mode="inline"
            theme="dark"
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
          >
            <Menu.Item key="/home">
              <Link to='/home'>
                <HomeOutlined/>
                <span>首页</span>
              </Link>
            </Menu.Item>
            <SubMenu key="/products" icon={<AppstoreOutlined/>} title="商品">
              <Menu.Item key="/category">
                <Link to='/category'>
                  <BarsOutlined/>
                  <span>品类管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/product">
                <Link to='/product'>
                  <LayoutOutlined/>
                  <span>商品管理</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="/user">
              <Link to='/user'>
                <UserOutlined/>
                <span>用户管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/role">
              <Link to='/role'>
                <SafetyOutlined/>
                <span>角色管理</span>
              </Link>
            </Menu.Item>
            <SubMenu key="/charts" icon={<AreaChartOutlined/>} title="图形图表">
              <Menu.Item key="/charts/bar">
                <Link to='/charts/bar'>
                  <BarChartOutlined/>
                  <span>柱形图</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/charts/line">
                <Link to='/charts/line'>
                  <LineChartOutlined/>
                  <span>折线图</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/charts/pie">
                <Link to='/charts/pie'>
                  <PieChartOutlined/>
                  <span>饼图</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>

      </div>

    )
  }
}

export default withRouter(LeftNav)
