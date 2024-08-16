import React, { useEffect, useState } from 'react'
import './index.less'
import SelectDept from './SelectDept'
import TotalData from './TotalData'
import { Tabs, DatePicker } from 'antd';
import type { TabsProps } from 'antd';
const { RangePicker } = DatePicker;

function dataResource() {
    const [deptStr, setDeptStr] = useState("全部") // 选择的部门拼接成字符串，默认全部
    const [selectYearsOrMonths, setSelectYearsOrMonths] = useState("year")
    useEffect(() => {
        console.log(deptStr);
    }, [deptStr])

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '门诊',
        },
        {
            key: '2',
            label: '住院',
        },
    ];


    return (
        <div className='dataResource'>
            <SelectDept changeDept={setDeptStr} />
            <TotalData deptStr={deptStr} />
            <div className='outpatient_and_inpatient'>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                <div className="change_data_range">
                    <span className={`${selectYearsOrMonths === `year` && `actived_data`}`} onClick={() => setSelectYearsOrMonths(`year`)}>年度</span>
                    <span className={`${selectYearsOrMonths === `month` && `actived_data`}`} onClick={() => setSelectYearsOrMonths(`month`)}>月度</span>
                    <RangePicker />
                </div>
            </div>
        </div >
    )
}

export default dataResource