import React, { useEffect, useState } from 'react'
import './index.less'
import SelectDept from './SelectDept'
import TotalData from './TotalData'
import PeopleTotalCategory from './components/PeopleTotalCategory'
import MapEcharts from './components/MapEcharts'
import { Tabs, DatePicker } from 'antd';
import type { TabsProps } from 'antd';
import { getCrowdProvinceChart, getCrowdTimeChart } from '@/request/api'
import { use } from 'echarts'
const { RangePicker } = DatePicker;

function dataResource() {
    const [deptStr, setDeptStr] = useState("全部") // 选择的部门拼接成字符串，默认全部
    const [selectYearsOrMonths, setSelectYearsOrMonths] = useState("year") // 选择时间单位
    const [activeName, setActiveName] = useState('1') // 1门诊 2住院
    const [dataRange, setDataRange] = useState<any>(null)
    const [peopleTotalXAxisData, setPeopleTotalXAxisData] = useState<any>([])
    const [peopleTotalData, setPeopleTotalData] = useState<any>([])
    const [mapData, setMapData] = useState<any>([])

    useEffect(() => {
        console.log(deptStr);
    }, [deptStr])

    useEffect(() => {
        getCrowdTimeChartFunc()
        getCrowdProvinceChartFunc()
    }, [dataRange, selectYearsOrMonths, activeName])

    const onChange = (key: string) => {
        console.log(key);
        setActiveName(key)
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

    const getCrowdTimeChartFunc = () => {
        let params: any = {}
        params.timePeriod = 0;
        params.timeType = selectYearsOrMonths;
        params.patientStatus = 1;
        params.treatmentType = Number(activeName);
        if (dataRange && dataRange[0] && dataRange[1]) {
            params.startTime = dataRange[0];
            params.endTime = dataRange[1];
            params.timePeriod = 1;
        }
        getCrowdTimeChart(params).then(res => {
            let XAxisData = [];
            let Data = [];
            for (const key in res.data.result) {
                if (Object.hasOwnProperty.call(res.data.result, key)) {
                    const element = res.data.result[key];
                    XAxisData.push(key);
                    Data.push(element);
                }
            }
            setPeopleTotalData(Data)
            setPeopleTotalXAxisData(XAxisData)
        })
    }

    const getCrowdProvinceChartFunc = () => {
        let params: any = {
            center: "全部",
            deptStr,
            size: "all",
            startTime: null,
            endTime: null,
        };
        params.timePeriod = 0;
        params.timeType = selectYearsOrMonths;
        params.patientStatus = 1;
        params.treatmentType = activeName;
        if (dataRange && dataRange[0] && dataRange[1]) {
            params.startTime = dataRange[0];
            params.endTime = dataRange[1];
            params.timePeriod = 1;
        }
        getCrowdProvinceChart(params).then(res => {
            let data = []
            for (const key in res.data.result) {
                if (Object.hasOwnProperty.call(res.data.result, key)) {
                    const element = res.data.result[key];
                    data.push({
                        name: key,
                        value: element,
                    });
                }
            }
            setMapData(data)
        })
    }

    const rangePickerHandlerChange = (date: any, dateString: any) => {
        console.log(date, dateString);
        setDataRange(dateString)
    };

    return (
        <div className='dataResource'>
            <SelectDept changeDept={setDeptStr} />
            <TotalData deptStr={deptStr} />
            <div className='outpatient_and_inpatient'>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                <div className="change_data_range">
                    <span className={`${selectYearsOrMonths === `year` && `actived_data`}`} onClick={() => setSelectYearsOrMonths(`year`)}>年度</span>
                    <span className={`${selectYearsOrMonths === `month` && `actived_data`}`} onClick={() => setSelectYearsOrMonths(`month`)}>月度</span>
                    <RangePicker onChange={rangePickerHandlerChange} />
                </div>
                <div className='outpatient_and_inpatient_echarts'>
                    <div className='outpatient_and_inpatient_echarts_left'>
                        <PeopleTotalCategory grid={{ top: 20, bottom: 20, left: 45, right: 20 }} data={peopleTotalData} XAxis={peopleTotalXAxisData} />
                    </div>
                    <div className='outpatient_and_inpatient_echarts_right'>
                        <MapEcharts data={mapData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default dataResource