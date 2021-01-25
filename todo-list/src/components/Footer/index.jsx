import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'antd';
import { Button } from 'antd';
import './index.css';

export default class Footer extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        checkAllTodo: PropTypes.func.isRequired,
        handleClearAllDone: PropTypes.func.isRequired,
    }
    onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        this.props.checkAllTodo(e.target.checked);
    }
    handleClearAllDone = () =>{
        this.props.handleClearAllDone();
    }
    render() {
        const { todos } = this.props
        const doneCount = todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)
        return (
            <div className="footer-container">
                <Checkbox onChange={this.onChange} checked={doneCount === todos.length && todos.length !== 0}></Checkbox>
                <span className="check-text">已完成{doneCount}/全部{todos.length ? todos.length : 0}</span>
                <Button type="primary" danger onClick={this.handleClearAllDone}>清除已完成任务</Button>
            </div>
        )
    }
}
