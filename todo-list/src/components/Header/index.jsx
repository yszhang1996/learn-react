import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd';
import { Button } from 'antd';
import './index.css'

export default class Header extends Component {
    static propTypes = {
        addTodo: PropTypes.func.isRequired
    }
    state = {
        value: ""
    }
    onPress = () => {
        // event.persist()
        const { value } = this.state
        if (value === '') return
        this.props.addTodo(value)
        this.setState({ value: "" })
    }
    render() {
        const { value } = this.state
        return (
            <div className="header-container">
                <Input placeholder="请输入您的任务名称，按回车键确认" value={value} onChange={e => { this.setState({ value: e.target.value }) }} onPressEnter={this.onPress} />
                <Button type="primary" onClick={this.onPress}>添加</Button>
            </div>
        )
    }
}
