import React, { Component } from 'react'
import './App.css';
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'

export default class App extends Component {
  state = {
    todos: [{
      id: '001',
      todo: "吃饭",
      done: true,
    }, {
      id: '002',
      todo: "睡觉",
      done: false,
    }, {
      id: '003',
      todo: "打豆豆",
      done: false,
    }]
  }
  render() {
    const {todos} = this.state
    return (
      <div className="App">
        <div className="app-container" >
          <Header />
          <List todos={todos} />
          <Footer />
        </div>
      </div>)
  };
}
