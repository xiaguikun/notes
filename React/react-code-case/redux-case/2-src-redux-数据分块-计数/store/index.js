import {createStore} from 'redux'
import reducer from '../reducers'
import {composeWithDevTools} from 'redux-devtools-extension'
// reducer 就是总的reducer，里面放着小的
const store = createStore(reducer,composeWithDevTools())
export default store 