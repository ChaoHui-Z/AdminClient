import React, { Component } from 'react'
import { Card, Button,Table, message   } from 'antd'
import { PlusOutlined  } from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import {reqCategorys} from '../../api'
/**
 * 分类管理
 */
export default class Category extends Component {
  state={
    categorys:[], // 列表信息数据
    loading:false
  }

  // 分类列表初始信息
  initColumns=()=>{
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width:300,
        render: ()=> <LinkButton>修改分类</LinkButton>,
      },
    ];
  }
  // 异步获取列表信息数据
  getCategorys = async () => {
      this.setState({loading: true})
      const result = await reqCategorys()
      this.setState({loading: false})
      if(result.status===0){
        const categorys = result.data
        this.setState({
          categorys
        })
        
      }else{
        message.error('获取列表信息失败')
      }
  }
  
  componentDidMount(){
    this.initColumns()
    this.getCategorys()
  }



  render() {
    const {categorys,loading} = this.state

    const extra = (
      <Button type='primary' icon={<PlusOutlined />}>添加</Button>
    )
    
    return (
      <div>
       <Card extra={extra}>
          <Table
            columns={this.columns}
            dataSource={categorys}
            bordered
            loading={loading}
            rowKey="_id"
            pagination={{defaultPageSize:6,showQuickJumper:true}}
          />
       </Card>
      </div>
    )
  }
}
