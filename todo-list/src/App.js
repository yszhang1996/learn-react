import React, { Component } from 'react'
import './App.css';
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'

export default class App extends Component {
  constructor(props) {
    super(props)
    const todos = JSON.parse(localStorage.getItem("todos"))
    console.log(todos);
    this.state = {
      todos
    }
  }
  addTodo = (todo) => {
    const { todos } = this.state
    let newTodos
    if (todos.length === 0) {
      newTodos = [{ id: 0, todo, done: false }]
    } else {
      newTodos = [{ id: todos[0].id + 1, todo, done: false }, ...todos]
    }
    this.setState({ todos: newTodos }, () => {
      this.saveTodos()
    })
  }
  updateTodo = (id, done) => {
    let { todos } = this.state
    todos.forEach(item => {
      if (item.id === id) {
        item.done = done
      }
    })
    this.setState({ todos }, () => {
      this.saveTodos()
    })
  }
  deleteTodo = (id) => {
    let { todos } = this.state
    todos.forEach((item, index) => {
      if (item.id === id) {
        todos.splice(index, 1);
        index++;
      }
    })
    this.setState({ todos }, () => {
      this.saveTodos()
    })
  }
  checkAllTodo = (flag) => {
    let { todos } = this.state
    todos.forEach((item, index) => {
      if (item.done !== flag) item.done = flag
    })
    this.setState({ todos }, () => {
      this.saveTodos()
    })
  }
  handleClearAllDone = () => {
    let { todos } = this.state
    const newTodos = todos.filter((item) => { return !item.done })
    this.setState({ todos: newTodos }, () => {
      this.saveTodos()
    })
  }
  saveTodos = () => {
    const { todos } = this.state
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  render() {
    const { todos } = this.state
    return (
      <div className="App">
        <div className="app-container" >
          <Header addTodo={this.addTodo} />
          <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
          <Footer todos={todos} checkAllTodo={this.checkAllTodo} handleClearAllDone={this.handleClearAllDone} />
        </div>
      </div>)
  };
}
