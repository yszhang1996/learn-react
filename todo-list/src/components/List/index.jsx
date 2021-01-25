import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'
import Item from '../Item';


export default class List extends Component {

    static propTypes = {
        todos: PropTypes.array.isRequired,
        updateTodo: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired
    }

    render() {
        const { todos, updateTodo,deleteTodo } = this.props
        return (
            <div className="list-container">
                {
                    todos.map(todo => {
                        // return <Item key={todo.id} id={todo.id} todo={todo.todo} done={todo.done} />
                        return <Item key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
                    })
                }
            </div>
        )
    }
}
