import React from 'react';
import ReactDom from "react-dom";


// 类式组件
// class Demo extends React.Component {
//     state = { count: 0 }

//     add = () => {
//         this.setState((state) => {
//             return { count: state.count + 1 }
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <h2>当前求和为{this.state.count}</h2>
//                 <button onClick={this.add}>点我+1</button>
//             </div>
//         );
//     }
// }

function Demo() {

    // 在函数式组件中使用state
    const [count, setCount] = React.useState(0)
    const [name, setName] = React.useState('tom')

    // 在函数式组件中使用ref
    const myRef = React.useRef()

    // 在函数式组件中使用生命周期钩子，useEffect不写第二个参数表示检测所有，写[]表示只初始化，谁也不检测，写[count]表示检测初始化和count的值
    React.useEffect(() => {
        console.log("@")
        let timer = setInterval(() => {
            setCount(state => (state + 1))
        }, 1000);
        // 类式组件中的componentWillUnmount在函数式组件中写在React.useEffect第一个参数函数的返回上
        return () => {
            clearInterval(timer)
        }
    }, [])

    function add() {
        // 更新state方法1
        // setCount(count + 1)

        // 更新state方法2
        setCount(count => (count + 1))
    }

    function changeName() {
        setName('jack')
    }

    function unmount() {
        ReactDom.unmountComponentAtNode(document.getElementById('root'))
    }

    function show() {
        alert(myRef.current.value)
    }

    return (
        <div>
            <h2>当前求和为{count}</h2>
            <h2>name={name}</h2>
            <button onClick={add}>点我+1</button>
            <input type="text" ref={myRef}/>
            <button onClick={changeName}>点我改名</button>
            <button onClick={unmount}>卸载组件</button>
            <button onClick={show}>点击提示数据</button>
        </div>
    )
}

export default Demo;
