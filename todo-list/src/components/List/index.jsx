import React, { Component } from 'react'
import './index.css'
import Item from '../Item';


export default class List extends Component {
    render() {
        const { todos } = this.props
        return (
            <div className="list-container">
                {
                    todos.map(todo => {
                        // return <Item key={todo.id} id={todo.id} todo={todo.todo} done={todo.done} />
                        return <Item key={todo.id} {...todo} />
                    })
                }
            </div>
        )
    }
}
