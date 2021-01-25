import React, { Component } from 'react'
import { Checkbox, Button, Popconfirm } from 'antd';
import './index.css';

export default class Item extends Component {
    state = { mouse: false }
    onChange = (id) => {
        return (e) => {
            console.log(`checked = ${e.target.checked}`);
            this.props.updateTodo(id, e.target.checked)
        }
    }
    handleMouse = (flag) => {
        return (e) => {
            this.setState({ mouse: flag })
        }
    }
    handleDelete = (id) => {
        return () => {
            this.props.deleteTodo(id)
        }
    }
    render() {
        const { id, todo, done } = this.props
        const { mouse } = this.state
        return (
            <div style={{ backgroundColor: mouse ? '#ddd' : '#fff' }} className="item-container" onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
                <Checkbox checked={done} onChange={this.onChange(id)} >{todo}</Checkbox>
                <Popconfirm
                    title="确定删除这一项吗？"
                    onConfirm={this.handleDelete(id)}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button style={{ display: mouse ? 'block' : 'none' }} type="primary" danger>删除</Button>
                </Popconfirm>
            </div>
        )
    }
}
