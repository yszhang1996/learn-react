import React, { useEffect, useState } from 'react'
import './TotalData.less'
import { Spin } from 'antd'
import { getCrowdDataIncrement, getCrowdTimeChart } from '@/request/api'
import { getCrowdTimeChartParams } from '@/types'
function TotalData({ deptStr }: { deptStr: string }) {
    const [crowdTimeChartLoading, setCrowdTimeChartLoading] = useState(false)
    const [crowdDataIncrementLoading, setCrowdDataIncrementLoading] = useState(false)
    const [caseTotalData, setCaseTotalData] = useState<any[]>([]) // 总病例数的图表数据
    const [otherField, setOtherField] = useState<any>({})
    const [allPercent, setAllPercent] = useState<any>({})  // 总病例数，总患者数，百分比
    useEffect(() => {
        getCrowdTimeChartFunc(1)
        getCrowdDataIncrementFunc()
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
            // this.dataResourcesTotalLoading++;
        }
        //   if (type === 2) {
        //     params.timeType = "year";
        //     params.timePeriod = 0;
        //     params.patientStatus = 2;
        //     params.treatmentType = 3;
        //     // this.dataResourcesTotalLoading++;
        //   }
        //   if (type === 3) {
        //     params.timePeriod = 0;
        //     params.timeType = this.selectYearsOrMonths;
        //     params.patientStatus = 1;
        //     params.treatmentType = this.activeName === "first" ? 1 : 2;
        //     if (this.dataRange && this.dataRange[0] && this.dataRange[1]) {
        //       params.startTime = this.dataRange[0];
        //       params.endTime = this.dataRange[1];
        //       params.timePeriod = 1;
        //     }
        //     // this.outpatientAndInpatientLoading++;
        //   }
        setCrowdTimeChartLoading(true)
        getCrowdTimeChart(params).then(res => {
            if (res.data) {
                if (type === 1) {
                    let data = Object.values(res.data.result);
                    setCaseTotalData(data)
                }
                // if (type === 2) {
                //   this.patientTotalData = Object.values(res.data.result);
                // }
                // if (type === 3) {
                //   this.peopleTotalXAxisData = [];
                //   this.peopleTotalData = [];
                //   for (const key in res.data.result) {
                //     if (Object.hasOwnProperty.call(res.data.result, key)) {
                //       const element = res.data.result[key];
                //       this.peopleTotalXAxisData.push(key);
                //       this.peopleTotalData.push(element);
                //     }
                //   }
                //   this.otherField = res.data.otherField;
                // }
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
            if (res.data.menzhen) {
                //   this.outPatientPercent = res.data.menzhen;
            }
            if (res.data.zhuyuan) {
                //   this.inPatientPercent = res.data.zhuyuan;
            }
            if (res.data.all) {
                setAllPercent(res.data.all)
            }
        })
            .finally(() => {                
                setCrowdDataIncrementLoading(false)
            });
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
                            {/* <span>2000-01-01~2020-12-0</span> */}
                        </div>
                    </div>
                    <div className="total_list_bottom">
                        <div className="total_list_bottom_num">
                            <div className="total_list_bottom_num_main">
                                {otherField?.count}
                            </div>
                            <div className="total_list_bottom_num_yesterday">
                                <span>较上月</span
                                ><span className="total_list_bottom_num_yesterday_up" style={{ color: '#ff0000' }}>
                                    {/* {{
                  this.allPercent &&
                  (this.allPercent.idIncrement === "0.00%"
                    ? "--"
                    : this.allPercent.idIncrement)
                }} */}
                                    {allPercent?.idIncrement}
                                </span>
                                <img
                                    src="../../assets/img/dataOverviewImg/upIcon.png"
                                    alt=""
                                />
                                <img
                                    src="../../assets/img/dataOverviewImg/downIcon.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="total_list_bottom_charts">
                            {/* <!-- 总病例数极简柱状图 --> */}
                            {/* <CasesCategory :data="caseTotalData" /> */}
                        </div>
                    </div>
                </div>
                <div className="total_list total_list_2">
                    <div className="total_list_top">
                        <div className="total_list_top_title">
                            <span>总患者数</span>
                        </div>
                        <div className="total_list_top_time">
                            {/* <!-- <span>2000-01-01~2020-12-0</span> --> */}
                        </div>
                    </div>
                    <div className="total_list_bottom">
                        <div className="total_list_bottom_num">
                            <div className="total_list_bottom_num_main">
                                {/* {{ this.otherField && this.otherField.patientCount }} */}
                            </div>
                            <div className="total_list_bottom_num_yesterday">
                                <span>较上月</span
                                ><span
                                    className="total_list_bottom_num_yesterday_up"
                                >
                                    {/* {{
                  this.allPercent &&
                  (this.allPercent.pidIncrement === "0.00%"
                    ? "--"
                    : this.allPercent.pidIncrement)
                }} */}
                                </span>
                                <img
                                    v-if="
                  judgeUpOrDown(
                    this.allPercent && this.allPercent.pidIncrement
                  ) === 'up'
                "
                                    src="../../assets/img/dataOverviewImg/upIcon.png"
                                    alt=""
                                />
                                <img
                                    v-if="
                  judgeUpOrDown(
                    this.allPercent && this.allPercent.pidIncrement
                  ) === 'down'
                "
                                    src="../../assets/img/dataOverviewImg/downIcon.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="total_list_bottom_charts">
                            {/* <!-- 总患者数极简曲线图图 --> */}
                            {/* <patientCategory :data="patientTotalData" /> */}
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
                                {/* {{
                this.outAndInpatientData &&
                this.outAndInpatientData.outpatientMinTime
              }}~{{
                this.outAndInpatientData &&
                this.outAndInpatientData.outpatientMaxTime
              }} */}
                            </span>
                        </div>
                    </div>
                    <div className="total_list_bottom">
                        <div className="total_list_bottom_num">
                            <div className="total_list_bottom_num_main">
                                {/* {{
                this.outAndInpatientData &&
                Number(this.outAndInpatientData.outCaseCount) +
                  Number(this.outAndInpatientData.outpatientCount)
              }} */}
                            </div>
                            <div className="total_list_bottom_num_yesterday">
                                <span>较上月</span
                                ><span
                                    className="total_list_bottom_num_yesterday_up"
                                >
                                    {/* {{
                  this.outPatientPercent &&
                  (this.outPatientPercent.idIncrement === "0.00%"
                    ? "--"
                    : this.outPatientPercent.idIncrement)
                }} */}
                                </span>
                                <img
                                    v-if="
                  judgeUpOrDown(
                    this.outPatientPercent && this.outPatientPercent.idIncrement
                  ) === 'up'
                "
                                    src="../../assets/img/dataOverviewImg/upIcon.png"
                                    alt=""
                                />
                                <img
                                    v-if="
                  judgeUpOrDown(
                    this.outPatientPercent && this.outPatientPercent.idIncrement
                  ) === 'down'
                "
                                    src="../../assets/img/dataOverviewImg/downIcon.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="total_list_bottom_charts">
                            <div className="cases_and_parient">
                                <div className="cases_total">
                                    <img src="../../assets/img/dataOverview/cases1.png" alt="" />
                                    <span className="cases_and_parient_total_text">病例数</span>
                                    <span className="cases_and_parient_total_num">
                                        {/* {{
                  this.outAndInpatientData &&
                  this.outAndInpatientData.outCaseCount
                }} */}
                                    </span>
                                </div>
                                <div className="patient_total">
                                    <img src="../../assets/img/dataOverview/patient1.png" alt="" />
                                    <span className="cases_and_parient_total_text">患者数</span>
                                    <span className="cases_and_parient_total_num">
                                        {/* {{
                  this.outAndInpatientData &&
                  this.outAndInpatientData.outpatientCount
                }} */}
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
                                {/* {{
                this.outAndInpatientData &&
                this.outAndInpatientData.inHospitalMinTime
              }}~{{
                this.outAndInpatientData &&
                this.outAndInpatientData.inHospitalMaxTime
              }} */}
                            </span>
                        </div>
                    </div>
                    <div className="total_list_bottom">
                        <div className="total_list_bottom_num">
                            <div className="total_list_bottom_num_main">
                                {/* {{
                this.outAndInpatientData &&
                Number(this.outAndInpatientData.inCaseCount) +
                  Number(this.outAndInpatientData.inHospitalCount)
              }} */}
                            </div>
                            <div className="total_list_bottom_num_yesterday">
                                <span>较上月</span
                                ><span
                                    className="total_list_bottom_num_yesterday_up"
                                >
                                    {/* {{
                  this.inPatientPercent &&
                  (this.inPatientPercent.idIncrement === "0.00%"
                    ? "--"
                    : this.inPatientPercent.idIncrement)
                }} */}
                                </span>
                                <img
                                    v-if="
                  judgeUpOrDown(
                    this.inPatientPercent && this.inPatientPercent.idIncrement
                  ) === 'up'
                "
                                    src="../../assets/img/dataOverviewImg/upIcon.png"
                                    alt=""
                                />
                                <img
                                    v-if="
                  judgeUpOrDown(
                    this.inPatientPercent && this.inPatientPercent.idIncrement
                  ) === 'down'
                "
                                    src="../../assets/img/dataOverviewImg/downIcon.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="total_list_bottom_charts">
                            <div
                                className="cases_and_parient"
                            //   style="border-left: 1px solid rgba(174, 210, 249, 0.5)"
                            >
                                <div className="cases_total">
                                    <img src="../../assets/img/dataOverview/cases2.png" alt="" />
                                    <span className="cases_and_parient_total_text">病例数</span>
                                    {/* <span className="cases_and_parient_total_num">{{
                  this.outAndInpatientData &&
                  this.outAndInpatientData.inCaseCount
                }}</span> */}
                                </div>
                                <div className="patient_total">
                                    <img src="../../assets/img/dataOverview/patient2.png" alt="" />
                                    <span className="cases_and_parient_total_text">患者数</span>
                                    {/* <span className="cases_and_parient_total_num">{{
                  this.outAndInpatientData &&
                  this.outAndInpatientData.inHospitalCount
                }}</span> */}
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