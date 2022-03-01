//! 这些要创建reducers
//! reducer是一个纯函数， 唯一数据源 ， state只读

import {INCREMENT,DECREMENT} from '../constant'
const initState = {
    count: 0,
    obj: {
        a: 1,
        b: 2
    }
} // 唯一数据源
export default function reducer (previousState = initState,action) {
    // state只读，要想更改，需要拷贝
    // 问题： 什么时候用浅拷贝，什么时候用深拷贝？？  建议深拷贝
    // 浅拷贝的方式： 解构、Object.assign   Object.create  、 Loadsh 中  clone
    // 深拷贝的方式： 
        // JSON序列化_JSON.parse(JSON.stringify(previousState))
        // loadsh / cloneDeep 
        // 高级方式: Immutable 创建不可变对象
    const newState = JSON.parse(JSON.stringify(previousState))
    // console.log('action',action)  通过action参数接收到了actionCreators中发过来的action
    switch (action.type) {
        case INCREMENT:
            // +的数据操作
            newState.count+=action.payload
            break;
        case DECREMENT: 
            newState.count -= action.payload 
            break;
    
        default:
            break;
    }
    console.log('newState',newState)
    return newState
}