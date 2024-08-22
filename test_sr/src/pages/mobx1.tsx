import React from 'react'
import mobxData from '@/store/mobx'
import { observer } from 'mobx-react-lite'

function Mobx1() {
    return (
        <div>
            <div>mobx1，count={mobxData.count}</div>
            <div>
                <button onClick={mobxData.addCount}>add</button>
            </div>
            <div>
                <button onClick={mobxData.addCountAsync}>addAsync</button>
            </div>
        </div>
    )
}

export default observer(Mobx1)