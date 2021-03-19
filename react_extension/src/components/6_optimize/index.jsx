import React, { PureComponent } from 'react'
import './index.css'

export default class Parent extends PureComponent {

    state = { carName: '奔驰' }

    changeCar = () => {
        this.setState({ carName: '法拉利' })

        // 使用下述代码更新setState时，PureComponent无法调用render，因为PureComponent的处理逻辑是浅对比（obj === this.state），
        // react很多地方都使用了这种方式，所以处理对象和数组时，更推荐使用解构赋值
        // const obj = this.state
        // obj.carName = '保时捷'
        // this.setState(obj)
    }

    // 引入的PureComponent相当于下述注释代码中的逻辑
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(this.props, this.state); // 目前的props和state
    //     console.log(nextProps, nextState);  // 接下来要变化的目标props，目标state
    //     console.log(!(this.state.carName === nextState.carName));
    //     return !(this.state.carName === nextState.carName)
    // }

    render() {
        console.log("parent-render");
        const { carName } = this.state
        return (
            <div className="border">
                <h3>我是Parent组件</h3>
                <span>我的车名叫：{carName}</span>
                <button onClick={this.changeCar}>换车</button>
                <Child carName={carName} />
            </div>
        )
    }
}

class Child extends PureComponent {

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(this.props, this.state);
    //     console.log(nextProps, nextState);
    //     return !(this.props.carName === nextProps.carName)
    // }

    render() {
        console.log("child-render");
        const { carName } = this.props
        return (
            <div className="border">
                <h3>我是Child组件</h3>
                <span>我接到的车是：{carName}</span>
                {/* 子组件如果不更新的话，则不该执行子组件的rander */}
            </div>
        )
    }
}
