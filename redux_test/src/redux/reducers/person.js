import { ADD_PERSON } from "../constant";

const initState = [{id:'001',name:'tom',age:18}]
export default function personReducer(preState = initState, action) {
    const { type, data } = action //从action对象汇总获取：type、data
    switch (type) {
        case ADD_PERSON:
            return [data, ...preState];
        default:
            return preState;
    }
}