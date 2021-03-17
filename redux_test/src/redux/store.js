/**
 * 该文件专门用于暴露一个store对象，整个应用只有一个store对象
 */

import { createStore, applyMiddleware, combineReducers } from 'redux' //引入createStore，专门用于创建redux中最为核心的store对象
import countReducer from './reducers/count' //引入为Count组件服务的reducer
import personReducer from './reducers/person' //引入为Count组件服务的reducer
import thunk from "redux-thunk"; //引入redux-thunk，用于支持异步action

// 汇总所有的reducer变为一个总的reducer
const allReducer = combineReducers({
    qiuhe: countReducer,
    rens: personReducer
})

export default createStore(allReducer, applyMiddleware(thunk)) //暴露store