// count这个数据库的reducer
import {INCREMENT} from '../constants'
const initState = {
    n: 0
}

export default function reducer (previousState=initState,action) {
    const newState = JSON.parse(JSON.stringify(previousState))
    // console.log('action',action)
    switch (action.type) {
        case INCREMENT:
            //数据操作
            newState.n+=action.payload
            break;
    
        default:
            break;
    }
    return newState
}