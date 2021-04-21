import { Reducer, Effect, Subscription } from 'umi'
import {getRemoteList} from "./service.js";

interface UserModalType {
    namespace: 'users',
    state: {},
    reducers: {
        getList: Reducer
    },
    effects: {
        getRemote: Effect
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
        }
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