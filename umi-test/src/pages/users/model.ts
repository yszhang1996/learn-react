import { Reducer, Effect, Subscription } from 'umi'

interface UserModalType {
    namespace: 'users',
    state: {},
    reducers: {},
    effects: {},
    subscriptions: {
        setup: Subscription
    }
}

const UserModel:UserModalType = {
    namespace: 'users',
    state: {},
    reducers: {
        getList(state, action) {

        },
    },
    effects: {
        *function_name(action, effects) {

        }
    },
    subscriptions: {
        setup({ dispatch, history }) {

        }
    }
}
export default UserModel