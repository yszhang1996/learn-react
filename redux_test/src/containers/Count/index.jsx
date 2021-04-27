// // 引入Count的UI组件
// import CountUI from "../../components/Count";
import React, { Component } from 'react'

// 引入connect用于连接UI组件与redux
import { connect } from "react-redux";
// 引入count_action
import { increment, decrement, incrementAsync } from "../../redux/actions/count.js";

//mapStateToProps函数返回的对象中的key就作为传递给UI组件props的key，value就作为传递给UI组件props的value--状态
// function mapStateToProps(state) {
//     return { count: state }
// }
// const mapStateToProps = state => ({ count: state })

//mapDispatchToProps函数返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value--操作状态
// function mapDispatchToProps(dispatch) {
//     return {
//         jia(number) {
//             // 通知redux执行加法
//             dispatch(createIncrementAction(number))
//         },
//         jian(number) {
//             dispatch(createDecrementAction(number))
//         },
//         jiaAsync(number, time) {
//             dispatch(createIncrementAsyncAction(number, time))
//         }
//     }
// }
// const mapDispatchToProps = dispatch => ({
//     jia(number) {
//         // 通知redux执行加法
//         dispatch(createIncrementAction(number))
//     },
//     jian(number) {
//         dispatch(createDecrementAction(number))
//     },
//     jiaAsync(number, time) {
//         dispatch(createIncrementAsyncAction(number, time))
//     }
// })

//定义UI组件
class Count extends Component {

    state = { name: 'Count' }

    increment = () => {
        const { value } = this.selectNumber
        this.props.increment(value * 1)
    }
    decrement = () => {
        const { value } = this.selectNumber
        this.props.decrement(value * 1)
    }
    incrementIfOdd = () => {
        const { value } = this.selectNumber
        if (this.props.count % 2 !== 0) {
            this.props.increment(value * 1)
        }
    }
    incrementAsync = () => {
        const { value } = this.selectNumber
        this.props.incrementAsync(value * 1, 1000)
    }

    render() {
        return (
            <div>
                <h2>我是Count组件,下方组件总人数为{this.props.persons.length}</h2>
                <h1>当前求和为：{this.props.count}</h1>
                <select ref={c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
                <button onClick={this.incrementAsync}>异步加</button>
            </div>
        )
    }
}

// 使用connect()()创建并暴露一个Count的容器组件
export default connect(
    state => ({
        persons: state.persons,
        count: state.count
    }),
    // mapDispatchToProps的一般写法
    // dispatch => ({
    //     jia(number) {
    //         // 通知redux执行加法
    //         dispatch(createIncrementAction(number))
    //     },
    //     jian(number) {
    //         dispatch(createDecrementAction(number))
    //     },
    //     jiaAsync(number, time) {
    //         dispatch(createIncrementAsyncAction(number, time))
    //     }
    // })

    // mapDispatchToProps的简写
    {
        increment,
        decrement,
        incrementAsync,
    }
)(Count)