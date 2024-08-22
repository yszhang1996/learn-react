import { action, makeAutoObservable } from 'mobx'

class mobxData {
    count = 0
    constructor() {
        makeAutoObservable(this)
    }
    addCount = () => {
        this.count++
    }

    addCountAsync = () => {
        setTimeout(action(() => {
            this.count++
        }), 5000);
    }
}
export default new mobxData()