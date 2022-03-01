import { createStore,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
/* 
    redux的中间件
        * redux-log 
        * redux-promise
        * redux中异步数据请求
            * redux-thunk 
            * redux-saga  升级版  
    redux的中间件是通过redux的api来调用的，这个api就是  appliMiddleWare(中间1，中间件2) 
*/
import thunk from 'redux-thunk'
import reducer from '../reducers'
const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

export default store 