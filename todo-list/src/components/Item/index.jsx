import React, { Component } from 'react'
import { Checkbox } from 'antd';
import './index.css';

export default class Item extends Component {
    onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }
    render() {
        return (
            <div className="item-container">
                <Checkbox onChange={this.onChange}>Checkbox</Checkbox>
            </div>
        )
    }
}
