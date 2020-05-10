import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import MemoryUtiles from '../../utiles/MemoryUtiles'
import { Layout } from 'antd';
import LeftNav from '../../components/LeftNav/LeftNav'
import Header from '../../components/Header/Header'
import Home from '../home/Home'
import Category from '../category/Category'
import Product from '../product/Product'
import Role from '../role/Role'
import User from '../user/User'
import Bar from '../charts/Bar'
import Line from '../charts/Line'
import Pie from '../charts/Pie'



const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {

    render() {
        const user=MemoryUtiles.user
        if(!user._id){
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{height:'100%'}}>
            <Sider>
                <LeftNav/>
            </Sider>
            <Layout>
              <Header/>
              <Content style={{background:'#fff',margin:'20px'}}>
                  <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/category' component={Category}/>
                    <Route path='/product' component={Product}/>
                    <Route path='/role' component={Role}/>
                    <Route path='/user' component={User}/>
                    <Route path='/charts/bar' component={Bar}/>
                    <Route path='/charts/line' component={Line}/>
                    <Route path='/charts/pie' component={Pie}/>
                    <Redirect to='/home' />

                  </Switch>
                </Content>
              <Footer style={{textAlign:'center',color:'rgba(0,0,0,.5)'}}>
                  请使用谷歌浏览器打开，页面效果更清晰
              </Footer>
            </Layout>
          </Layout>
        )
    }
}
