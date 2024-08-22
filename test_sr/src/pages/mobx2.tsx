import React from 'react'
import mobxData from '@/store/mobx'
import { observer } from 'mobx-react-lite'

function mobx2() {
    return (
        <div>
            <div>mobx2，count={mobxData.count}</div>
            <div>
                <button onClick={mobxData.addCount}>add</button>
            </div>
            <div>
                <button onClick={mobxData.addCountAsync}>addAsync</button>
            </div>
        </div>
    )
}

export default observer(mobx2)