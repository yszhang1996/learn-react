import React, { Component } from 'react'
import { Input } from 'antd';
import { Button } from 'antd';
import './index.css'

export default class Header extends Component {
    onPressEnter = (e) => {
        console.log(e.target.value);
    }
    render() {
        return (
            <div className="header-container">
                <Input placeholder="请输入您的任务名称，按回车键确认" onPressEnter={this.onPressEnter} />
                <Button type="primary">添加</Button>
            </div>
        )
    }
}
