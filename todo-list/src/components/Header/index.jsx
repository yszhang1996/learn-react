import React, { Component } from 'react'
import { Input } from 'antd';
import { Button } from 'antd';
import './index.css'

export default class Header extends Component {
    render() {
        return (
            <div className="header-container">
                <Input placeholder="请输入您的任务名称，按回车键确认" />
                <Button type="primary">添加</Button>
            </div>
        )
    }
}
