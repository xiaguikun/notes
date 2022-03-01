import React, { useEffect } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import actions from './actionCreators/user'
import {Button} from 'antd'
export default connect(
  // 两个参数
  ({user}) => user,
  dispatch => bindActionCreators(actions,dispatch)
)(function App ({list,getUserList,delUserList}) {

  useEffect(() => {
    getUserList({
      query: '',
      pagenum: 1,
      pagesize: 4
    })
  },[])

  if (!list.length)  return <div> 数据加载中... </div>

  const renderList = () => list.map(v => <li key={v.id}> 
    {v.username} 
    <Button type='primary' danger  onClick={() => { delUserList(v.id) }}> 删除 </Button>  
  </li>)

  return (
    <div>
      <ul>
        {renderList()}
      </ul>
    </div>
  )
}
)