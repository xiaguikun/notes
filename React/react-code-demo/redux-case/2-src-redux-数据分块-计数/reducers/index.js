import {combineReducers} from 'redux'
import count from './count'
const  rootReducer = combineReducers({
    // 分块的数据 - 其他的reducer
    count,
    // home,
    // use,
    // shop,
    // list
})

export default rootReducer