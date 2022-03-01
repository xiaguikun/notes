import React from 'react'
/* 
  * 1. 我们现在redux是做了数据分块的
  * 2. 组件中要想拿到store中的数据，要通过react-redux提供的api   connect函数【高阶组件】
*/
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from './actionCreators/count'
/* 
  connect(mapStateFromProps,mapDispatchFromProps)
    * 1. 参数
      * mapStateFromProps    
        * 从store中取出来state作为属性绑定到我们的组件身上，这样我们的组件就得到了props
      * mapDispatchFromProps 
        * 1. 可以将actionCreators中的方法取出来绑定到我们组件上 
        * 2. 可以主动将actionCreators中创建的action发送给reducer
    * 2. connect还可帮助我们更新视图 
    * 3. 底层原理
      *  合并分发  
*/



const mapStateFromProps = (state) => {
  // state 就是store中的全部数据  {count: {n: 0}}  
  return state.count // 只要count的数据
}

const mapDispatchFromProps = (dispatch) => {
  return bindActionCreators(actions,dispatch)
}


export default connect(
  mapStateFromProps,
  mapDispatchFromProps
)(function App (props) {
  return (
    <div>
      <button onClick={() => {props.increment(10)}}> + </button>
      {props.n}
    </div>
  )
})



