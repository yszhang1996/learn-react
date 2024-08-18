import React, { useEffect, useState } from 'react'
import './TotalData.less'
import { Spin } from 'antd'
import { getCrowdDataIncrement, getCrowdTimeChart, patientStatistics } from '@/request/api'
import { getCrowdTimeChartParams } from '@/types'
import CasesCategory from './components/CasesCategory'
import PatientCategory from './components/PatientCategory'
import { use } from 'echarts'
function TotalData({ deptStr }: { deptStr: string }) {
    const [crowdTimeChartLoading, setCrowdTimeChartLoading] = useState(false)
    const [crowdDataIncrementLoading, setCrowdDataIncrementLoading] = useState(false)
    const [caseTotalData, setCaseTotalData] = useState<any[]>([]) // 总病例数的图表数据
    const [otherField, setOtherField] = useState<any>({})
    const [allPercent, setAllPercent] = useState<any>({})  // 总病例数，总患者数，百分比
    const [patientTotalData, setPatientTotalData] = useState<any[]>([]) // 总患者数的图表数据
    const [outAndInpatientData, setOutAndInpatientData] = useState<any>(null)
    useEffect(() => {
        getCrowdTimeChartFunc(1)
        getCrowdTimeChartFunc(2)
        getCrowdDataIncrementFunc()
        // 获取顶部门诊数据统计和住院数据统计
        getOutAndInpatientData()
    }, [deptStr])

    const getCrowdTimeChartFunc = (type: number) => {
        let params: getCrowdTimeChartParams = {
            center: '全部', // 院区默认全部
            deptStr,
            size: "all", // top数量，默认全部
            startTime: null,
            endTime: null,
        };
        if (type === 1) {
            params.timeType = "year"; // year:年度 month:月度，总病例数，默认是年度数据
            params.timePeriod = 0; // 是否自定义统计时间段 0:否 1:是  总病例数默认不自定义统计时间段
            params.patientStatus = 1; // 统计维度 1:病例 2:患者
            params.treatmentType = 3; // 统计维度 1:门诊 2:住院 3:混合/全部
        }
        if (type === 2) {
            params.timeType = "year";
            params.timePeriod = 0;
            params.patientStatus = 2;
            params.treatmentType = 3;
        }
        setCrowdTimeChartLoading(true)
        getCrowdTimeChart(params).then(res => {
            if (res.data) {
                if (type === 1) {
                    let data = Object.values(res.data.result);
                    setCaseTotalData(data)
                }
                if (type === 2) {
                    let data = Object.values(res.data.result);
                    setPatientTotalData(data)
                }
                setOtherField(res.data.otherField)
            }
        }).finally(() => {
            setCrowdTimeChartLoading(false)
        })
    }
    const getCrowdDataIncrementFunc = () => {
        setCrowdDataIncrementLoading(true)
        getCrowdDataIncrement({
            center: '全部',
            deptStr,
            treatmentType: 3,
            patientStatus: 1,
        }).then((res) => {
            if (res.data.all) {
                setAllPercent(res.data.all)
            }
        })
            .finally(() => {
                setCrowdDataIncrementLoading(false)
            });
    }
    const getOutAndInpatientData = () => {
        patientStatistics({
            department: deptStr,
        }).then(res => {
            setOutAndInpatientData(res.data)
        })
    }
    const judgeUpOrDown = (str: string) => {
        if (!str) {
            return null;
        }
        if (str.indexOf("-") > -1) {
            return "down";
        } else {
            return "up";
        }
    }
    return (
        <Spin spinning={crowdTimeChartLoading && crowdDataIncrementLoading}>
            <div className='TotalData'>
                <div className="total_list">
                    <div className="total_list_top">
                        <div className="total_list_top_title">
                            <span>总病例数</span>
                        </div>
                        <div className="total_list_top_time">
                        </div>
                    </div>
                    <div className="total_list_bottom">
                        <div className="total_list_bottom_num">
                            <div className="total_list_bottom_num_main">
                                {otherField?.count}
                            </div>
                            <div className="total_list_bottom_num_yesterday">
                                <span>较上月</span
                                ><span className="total_list_bottom_num_yesterday_up" style={{ color: `${judgeUpOrDown(allPercent?.idIncrement) === "up" ? "#f53f3f" : "#32BD4A"}` }}>
                                    {allPercent?.idIncrement}
                                </span>
                                {judgeUpOrDown(allPercent?.idIncrement) === "up" &&
                                    <img src={require("../../../assets/img/dataOverviewImg/upIcon.png")} alt="" />
                                }
                                {judgeUpOrDown(allPercent?.idIncrement) === "down" &&
                                    <img src={require("../../../assets/img/dataOverviewImg/downIcon.png")} alt="" />
                                }
                            </div>
                        </div>
                        <div className="total_list_bottom_charts">
                            {/* <!-- 总病例数极简柱状图 --> */}
                            <CasesCategory data={caseTotalData} />
                        </div>
                    </div>
                </div>
                <div className="total_list total_list_2">
                    <div className="total_list_top">
                        <div className="total_list_top_title">
                            <span>总患者数</span>
                        </div>
                        <div className="total_list_top_time">
                        </div>
                    </div>
                    <div className="total_list_bottom">
                        <div className="total_list_bottom_num">
                            <div className="total_list_bottom_num_main">
                                {otherField?.patientCount}
                            </div>
                            <div className="total_list_bottom_num_yesterday">
                                <span>较上月</span
                                ><span className="total_list_bottom_num_yesterday_up" style={{ color: `${judgeUpOrDown(allPercent?.pidIncrement) === "up" ? "#f53f3f" : "#32BD4A"}` }}>
                                    {allPercent?.pidIncrement}
                                </span>
                                {judgeUpOrDown(allPercent?.pidIncrement) === "up" &&
                                    <img src={require("../../../assets/img/dataOverviewImg/upIcon.png")} alt="" />
                                }
                                {judgeUpOrDown(allPercent?.pidIncrement) === "down" &&
                                    <img src={require("../../../assets/img/dataOverviewImg/downIcon.png")} alt="" />
                                }
                            </div>
                        </div>
                        <div className="total_list_bottom_charts">
                            {/* <!-- 总患者数极简曲线图图 --> */}
                            <PatientCategory data={patientTotalData} />
                        </div>
                    </div>
                </div>
                <div className="total_list total_list_3">
                    <div className="total_list_top">
                        <div className="total_list_top_title">
                            <span>门诊数据统计</span>
                        </div>
                        <div className="total_list_top_time">
                            <span
                            >
                                {outAndInpatientData?.outpatientMinTime}~{outAndInpatientData?.outpatientMaxTime}
                            </span>
                        </div>
                    </div>
                    <div className="total_list_bottom">
                        <div className="total_list_bottom_num">
                            <div className="total_list_bottom_num_main">
                                {Number(outAndInpatientData?.outCaseCount || 0) + Number(outAndInpatientData?.outpatientCount || 0)}
                            </div>
                            <div className="total_list_bottom_num_yesterday">
                                <span>较上月</span
                                ><span className="total_list_bottom_num_yesterday_up" style={{ color: `${judgeUpOrDown(allPercent?.idIncrement) === "up" ? "#f53f3f" : "#32BD4A"}` }}>
                                    {allPercent?.idIncrement}
                                </span>
                                {judgeUpOrDown(allPercent?.idIncrement) === "up" &&
                                    <img src={require("../../../assets/img/dataOverviewImg/upIcon.png")} alt="" />
                                }
                                {judgeUpOrDown(allPercent?.idIncrement) === "down" &&
                                    <img src={require("../../../assets/img/dataOverviewImg/downIcon.png")} alt="" />
                                }
                            </div>
                        </div>
                        <div className="total_list_bottom_charts">
                            <div className="cases_and_parient">
                                <div className="cases_total">
                                    <img src={require("../../../assets/img/dataOverview/cases1.png")} alt="" />
                                    <span className="cases_and_parient_total_text">病例数</span>
                                    <span className="cases_and_parient_total_num">
                                        {outAndInpatientData?.outCaseCount}
                                    </span>
                                </div>
                                <div className="patient_total">
                                    <img src={require("../../../assets/img/dataOverview/patient1.png")} alt="" />
                                    <span className="cases_and_parient_total_text">患者数</span>
                                    <span className="cases_and_parient_total_num">
                                        {outAndInpatientData?.outpatientCount}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="total_list total_list_4">
                    <div className="total_list_top">
                        <div className="total_list_top_title">
                            <span>住院数据统计</span>
                        </div>
                        <div className="total_list_top_time">
                            <span
                            >
                                {outAndInpatientData?.inHospitalMinTime}~{outAndInpatientData?.inHospitalMaxTime}
                            </span>
                        </div>
                    </div>
                    <div className="total_list_bottom">
                        <div className="total_list_bottom_num">
                            <div className="total_list_bottom_num_main">
                                {Number(outAndInpatientData?.inCaseCount || 0) + Number(outAndInpatientData?.inHospitalCount || 0)}
                            </div>
                            <div className="total_list_bottom_num_yesterday">
                                <span>较上月</span
                                ><span className="total_list_bottom_num_yesterday_up" style={{ color: `${judgeUpOrDown(allPercent?.idIncrement) === "up" ? "#f53f3f" : "#32BD4A"}` }}>
                                    {allPercent?.idIncrement}
                                </span>
                                {judgeUpOrDown(allPercent?.idIncrement) === "up" &&
                                    <img src={require("../../../assets/img/dataOverviewImg/upIcon.png")} alt="" />
                                }
                                {judgeUpOrDown(allPercent?.idIncrement) === "down" &&
                                    <img src={require("../../../assets/img/dataOverviewImg/downIcon.png")} alt="" />
                                }
                            </div>
                        </div>
                        <div className="total_list_bottom_charts">
                            <div
                                className="cases_and_parient"
                            //   style="border-left: 1px solid rgba(174, 210, 249, 0.5)"
                            >
                                <div className="cases_total">
                                    <img src={require("../../../assets/img/dataOverview/cases2.png")} alt="" />
                                    <span className="cases_and_parient_total_text">病例数</span>
                                    {outAndInpatientData?.inCaseCount}
                                </div>
                                <div className="patient_total">
                                    <img src={require("../../../assets/img/dataOverview/patient2.png")} alt="" />
                                    <span className="cases_and_parient_total_text">患者数</span>
                                    {outAndInpatientData?.inHospitalCount}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    )
}

export default TotalData