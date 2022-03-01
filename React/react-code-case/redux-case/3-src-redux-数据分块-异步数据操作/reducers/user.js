import {GET_USER_LIST,DEL_USER_LIST} from '../constant'
const initState = {
    list: []
}

export default function reducer (state=initState,action) {
    const newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case GET_USER_LIST:
            // 数据判断
            // console.log('action',action.payload.data.data.users)
            if (action.payload.data.data) newState.list = action.payload.data.data.users
            break;
        case DEL_USER_LIST:
            // console.log('action_del',action.payload.id)
            newState.list = newState.list.filter(v => v.id != action.payload.id)
            break;
        default:
            break;
    }
    return newState
}