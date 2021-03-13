import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'
import { Provider } from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))

// 检测redux中的状态的改变，如redux的状态发生了改变，那么重新渲染App组件
// 当使用react-redux时，由于connect已经为我们做了监听，所以可以注释掉store.subscribe
// store.subscribe(() => {
//     ReactDOM.render(<App />, document.getElementById('root'))
// })