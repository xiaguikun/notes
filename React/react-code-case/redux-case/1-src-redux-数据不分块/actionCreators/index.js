//! actionCreators中存放的方法
//! 创建动作，store.dispatch发送动作

import store from '../store'
import {INCREMENT,DECREMENT} from '../constant'
export default {
    increment (payload) {
        // 创建动作
        const action = {
            type: INCREMENT, // 动作的类型
            payload // 负载： 组件传递过来的参数/数据请求的结果
        }
        // 发送动作
        store.dispatch(action)
    },
    decrement (payload) {
        // 创建动作
        const action = {
            type: DECREMENT, // 动作的类型
            payload // 负载： 组件传递过来的参数/数据请求的结果
        }
        // 发送动作
        store.dispatch(action)
    }
} 