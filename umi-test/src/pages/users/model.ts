import { Reducer, Effect, Subscription } from 'umi'
import select from "dva";
import { getRemoteList, editRecord, deleteRecord, addRecord } from "./service";
import { SingleUserType } from "./data.d";

export interface UserState {
    data: SingleUserType[],
    meta: {
        total: number,
        per_page: number,
        page: number,
    }
}

interface UserModalType {
    namespace: 'users',
    state: UserState,
    reducers: {
        getList: Reducer<UserState>,
    },
    effects: {
        getRemote: Effect,
        edit: Effect,
        delete: Effect,
        add: Effect
    },
    subscriptions: {
        setup: Subscription
    }
}

const UserModel: UserModalType = {
    namespace: 'users',
    state: {
        data: [],
        meta: {
            total: 0,
            per_page: 5,
            page: 1,
        },
    },
    reducers: {
        getList(state, action) {
            return action.payload
        },
    },
    effects: {
        *getRemote({ payload: { page, per_page } }, { put, call }) {
            console.log('getremote');
            const data = yield call(getRemoteList, { page, per_page } = { page: 1, per_page: 5 })
            yield put({
                type: 'getList',
                payload: data,
            })
        },
        *edit({ payload: { id, record, ref } }, effect) {
            const { put, call } = effect
            const data = yield call(editRecord, { id, record })
            const { users: { meta } } = yield effect.select((states: UserState) => states)
            if (data) {
                ref.current.reload()
            }
        },
        *delete({ payload: { id, ref } }, { put, call }) {
            const data = yield call(deleteRecord, { id })
            if (data) {
                ref.current.reload()
            }
        },
        *add({ payload: { record, ref } }, { put, call }) {
            const data = yield call(addRecord, { record })
            if (data) {
                ref.current.reload()
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/users') {
                    // dispatch({
                    //     type: 'getRemote',
                    //     payload: {
                    //         page: 1,
                    //         per_page: 5,
                    //     },
                    // })
                }
            })
        }
    }
}
export default UserModel