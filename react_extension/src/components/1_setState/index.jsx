/**
 * 扩展知识1，setState的两种写法
 */
import React, { Component } from 'react';
import './index.css';

class Demo extends Component {

    state = { count: 0 }

    add = () => {
        // 对象式的setState
        // //1.获取原来的count值
        // const { count } = this.state
        // //2.更新状态
        // this.setState({ count: count + 1 },() => {
        //   console.log(this.state.count);  
        // })
        // this.setState({ count: this.state.count + 1 })

        // 函数式的setState
        this.setState((state, props) => {
            console.log(state, props);
            return { count: state.count + 1 }
        })
    }

    render() {
        return (
            <div>
                <h1>当前求和为：{this.state.count}</h1>
                <button className="no-select" onClick={this.add}>点我+1</button>
            </div>
        );
    }
}

export default Demo;
