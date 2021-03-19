import React, { Component } from 'react';
import './index.css'

class Parent extends Component {
    render() {
        return (
            <div className="border">
                <span>我是parent组件</span>
                <A render={(name) => <B name={name} />} />
            </div>
        );
    }
}

class A extends Component {
    state = { name: 'tom' }
    render() {
        const { name } = this.state
        return (
            <div className="border">
                <span>我是A组件</span>
                { this.props.render(name)}
                {/* <B /> */}
            </div>
        );
    }
}

class B extends Component {
    render() {
        return (
            <div className="border">
                <span>我是B组件</span>
            </div>
        );
    }
}


export default Parent;
