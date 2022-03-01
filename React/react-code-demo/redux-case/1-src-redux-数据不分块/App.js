import React, { Component } from 'react'
import store from './store'
import {Button} from 'antd'
import actionCreators from './actionCreators'
export default class App extends Component {

  constructor () {
    super()
    //! 问题： 为什么需要定义state来接收store的state呢？
    this.state = {
      n: store.getState().count   // store.getState {count: 0,obj: {a: 1,b:2}}
    }
  }

  componentDidMount () {
    // 事件的订阅 - 创建自定义事件
    store.subscribe(() => {
      this.setState({
        n: store.getState().count
      })
    })
  }

  add = () => {
    //这里调用ActionCreators中的方法
    actionCreators.increment( 10 )
  }

  jian = () => {
    actionCreators.decrement( 10 )
  }

  render() {
    const { n } = this.state
    return (
      <div>
        <Button type="primary" onClick={this.add}> + </Button>
        <Button type="primary" onClick={this.jian}> - </Button>
        {n}
      </div>
    )
  }
}
