import React, { Component } from 'react'
import './index.css'

// 创建Context对象
const UserNameContext = React.createContext()
const { Provider, Consumer } = UserNameContext

class A extends Component {

    state = { username: 'tom', age: 19 }

    render() {
        return (
            <div className="border">
                <h3>我是A组件，我的用户名是{this.state.username}</h3>
                <Provider value={{ username: this.state.username, age: this.state.age }}>
                    <B />
                </Provider>
            </div>
        )
    }
}

class B extends Component {
    render() {
        return (
            <div className="border">
                <h3>我是B组件，我从A组件接受到的用户名是???</h3>
                <C />
            </div>
        )
    }
}

// class C extends Component {
//     static contextType = UserNameContext
//     render() {
//         return (
//             <div className="border">
//                 <h3>我是C组件，我从A组件接受到的用户名是{this.context.username}，年龄是{this.context.age}</h3>
//             </div>
//         )
//     }
// }

function C() {
    return (
        <div className="border">
            <Consumer>
                {
                    value => {
                        return (
                            <h3>我是C组件，我从A组件接受到的用户名是{value.username}，年龄是{value.age}</h3>
                        )
                    }
                }
            </Consumer>
        </div>
    )
}

export default A
