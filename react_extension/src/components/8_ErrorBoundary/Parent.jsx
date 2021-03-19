import React, { Component } from 'react';
import Child from "./Child";

class Parent extends Component {

    state = {
        hasError: ''
    }

    static getDerivedStateFromError(error) {
        console.log(error);
        return {
            hasError: error
        }
    }

    componentDidCatch() {
        console.log('渲染组件时出错，反馈给服务器，用于通知编码人员进行BUG的解决');
    }

    render() {
        return (
            <div>
                <h2>我是Parent组件</h2>
                { this.state.hasError ? <h2>当前网络不稳定，稍后再试</h2> : <Child></Child> }
            </div>
        );
    }
}

export default Parent;