import React, { Component } from 'react'
import { Checkbox } from 'antd';
import { Button } from 'antd';
import './index.css';

export default class Footer extends Component {
    onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }
    render() {
        return (
            <div className="footer-container">
                <Checkbox onChange={this.onChange}></Checkbox>
                <span className="check-text">已完成0/全部2</span>
                <Button type="primary" danger>清除已完成任务</Button>
            </div>
        )
    }
}
