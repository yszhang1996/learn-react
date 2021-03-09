/**
 * 1.该文件用于常见一个为Count组件服务的reducer，reducer的本质就是一个函数
 * 2.reducer函数会街道两个参数，分别为：之前的状态（preState），动作对象（action）
 */
const ininState = 0 //初始化状态
export default function countReducer(preState = ininState, action) {
    const { type, data } = action //从action对象汇总获取：type、data
    switch (type) { //根据type决定如何加工数据
        case 'increment':
            return preState + data //如果是加
        case 'decrement':
            return preState - data //如果是减
        default:
            return preState
    }
}
