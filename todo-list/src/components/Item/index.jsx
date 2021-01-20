import React, { Component } from 'react'
import { Checkbox } from 'antd';
import './index.css';

export default class Item extends Component {
    onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }
    render() {
        const {todo,done} = this.props
        return (
            <div className="item-container">
                <Checkbox defaultChecked={done} onChange={this.onChange} >{todo}</Checkbox>
            </div>
        )
    }
}
