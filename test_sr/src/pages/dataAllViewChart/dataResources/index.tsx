import React, { useEffect, useState } from 'react'
import './index.less'
import SelectDept from './SelectDept'
import TotalData from './TotalData'

function dataResource() {
    const [deptStr, setDeptStr] = useState("全部") // 选择的部门拼接成字符串，默认全部
    useEffect(() => {
        console.log(deptStr);
    }, [deptStr])

    return (
        <div className='dataResource'>
            <SelectDept changeDept={setDeptStr} />
            <TotalData deptStr={deptStr} />
        </div >
    )
}

export default dataResource