import * as api from '../services/example'
export default {
    namespace: "products",
    state: {
        productsList: [
            {
                name: 'zhang',
            },
            {
                name: 'wang'
            }
        ]
    },
    reducers: {
        updateList(state, action) {
            let currentProductList = deepClone(state);
            currentProductList.productsList.push(action.payload);
            return currentProductList
        }
    },
    effects: {
        *updateListAsync({ payload }, { call, put }) {  // eslint-disable-line
            yield put({
                type: 'updateList',
                payload,
            });
        },
        *updateListHttp({ payload }, { call, put }) {
            const result = yield call(api.getProducts, payload);
            const data = result.data;
            if (data) {
                yield put({
                    type: 'updateList',
                    payload: data,
                })
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
            console.log(dispatch);
        },
      },
}

function deepClone(arr) {
    return Object.assign({}, arr);
}
