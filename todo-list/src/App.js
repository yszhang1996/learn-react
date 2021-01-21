import React, { Component } from 'react'
import './App.css';
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'

export default class App extends Component {
  state = {
    todos: [{
      id: 3,
      todo: "吃饭",
      done: true,
    }, {
      id: 2,
      todo: "睡觉",
      done: false,
    }, {
      id: 1,
      todo: "打豆豆",
      done: false,
    }]
  }
  addTodo = (todo) => {
    const { todos } = this.state
    const newTodos = [{ id: todos[0].id + 1, todo, done: false }, ...todos]
    this.setState({ todos: newTodos })
  }
  render() {
    const { todos } = this.state
    return (
      <div className="App">
        <div className="app-container" >
          <Header addTodo={this.addTodo} />
          <List todos={todos} />
          <Footer />
        </div>
      </div>)
  };
}
