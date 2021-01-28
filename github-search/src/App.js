import './App.css';
import React, { Component } from 'react'
import HeaderSearch from './components/HeaderSearch/HeaderSearch'
import List from './components/List/List'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      descriptions: '输入名字后点击搜索按钮或回车键进行搜索',
      loading: false,
    }
  }
  getData = (data) => {
    if (data.length > 0) {
      this.setState({ data })
    } else {
      this.setState({ data, descriptions: "查询失败！" })
    }
  }
  changeLoading = (newLoading) => {
    this.setState({ loading: newLoading, descriptions: "" })
  }
  render() {
    // const {data,descriptions,loading} = this.state
    return (
      <div className="App">
        <HeaderSearch getData={this.getData} changeLoading={this.changeLoading} />
        <List {...this.state} />
      </div>
    );
  }
}

