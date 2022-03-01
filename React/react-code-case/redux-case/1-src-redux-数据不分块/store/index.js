//! 这个文件用于创建redux/store

import {createStore} from 'redux'
import reducer from '../reducers'
const store = createStore(reducer)

export default store  