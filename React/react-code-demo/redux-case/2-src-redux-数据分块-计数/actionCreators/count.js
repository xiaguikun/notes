// import store from "../store"

// export default {
//     increment () {
//         const action = {
//             type: '',
//             payload
//         }
//         store.dispatch(action)
//     }
// }

import { INCREMENT } from '../constants'
export default {
    increment (payload) {
        // const action = {}
        return {
            type: INCREMENT,
            payload
        }
    } 
}