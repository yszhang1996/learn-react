import { Reducer, Effect, Subscription } from 'umi'
import { getRemoteList, editRecord, deleteRecord, addRecord } from "./service.js";

interface UserModalType {
    namespace: 'users',
    state: {},
    reducers: {
        getList: Reducer
    },
    effects: {
        getRemote: Effect,
        edit: Effect,
        delete: Effect
    },
    subscriptions: {
        setup: Subscription
    }
}

const UserModel: UserModalType = {
    namespace: 'users',
    state: {},
    reducers: {
        getList(state, action) {
            return action.payload
        },
    },
    effects: {
        *getRemote(action, { put, call }) {
            const data = yield call(getRemoteList)
            yield put({
                type: 'getList',
                payload: data,
            })
        },
        *edit({ payload: { id, record } }, { put, call }) {
            const data = yield call(editRecord, { id, record })
            if (data) {
                yield put({
                    type: 'getRemote',
                })
            }
        },
        *delete({ payload: { id } }, { put, call }) {
            const data = yield call(deleteRecord, { id })
            console.log(data);
            
            if (data) {
                yield put({
                    type: 'getRemote',
                })
            }
        },
        *add({ payload: { record } }, { put, call }) {
            const data = yield call(addRecord, { record })
            if (data) {
                yield put({
                    type: 'getRemote',
                })
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/users') {
                    dispatch({
                        type: 'getRemote'
                    })
                }
            })
        }
    }
}
export default UserModel