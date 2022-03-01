import {getUserListReq,delUserListReq} from '../api'
import { GET_USER_LIST,DEL_USER_LIST } from '../constant'
export default {
    // 获取用户列表
    getUserList (payload) {
        // 没有带异步数据请求写法
            // return {
            //     type: '',
            //     payload 
            // }
        //!!! 带了异步数据请求写法
        return async dispatch => {
            // 发送数据请求，发送action
            dispatch({
                type: GET_USER_LIST,
                payload: await getUserListReq(payload)
            })
        }
    },
    delUserList (id) {
        return async dispatch => {
            // 发请求   发动作
            dispatch({
                type: DEL_USER_LIST,
                payload: {
                    data: await delUserListReq(id),
                    id
                }
            })
        }
    }
}