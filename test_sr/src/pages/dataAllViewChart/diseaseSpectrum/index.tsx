import React, { useEffect, useState } from 'react'
import './index.less'
import DiseaseList from './DiseaseList'
import { getDiseaseTop, selectDiseaseSpecTrumTypeList, getPatientCount } from '@/request/api'
import { Spin, Radio } from 'antd';
import { use } from 'echarts';
import RoundedEcharts from './components/RoundedEcharts'

let color = [
  "#276FFF",
  "#00C383",
  "#5D7092",
  "#F6BD16",
  "#E86452",
  "#6DC8EC",
  "#8D4EDA",
  "#FF843E",
  "#1E9493",
  "#FF99C3",
];

const dataSouresOptions = [
  { label: '归一', value: '2' },
  { label: '原始', value: '1' },
];

const dataRangeSelectOptions = [
  { label: '全部', value: '3' },
  { label: '门诊', value: '1' },
  { label: '住院', value: '2' },
]

function diseaseSpectrum() {

  const [diseaseTypeList, setDiseaseTypeList] = useState([])
  const [currentDiseaseId, setCurrentDiseaseId] = useState("")
  const [currentDiseaseLoading, setCurrentDiseaseLoading] = useState(false)
  const [dataScoures, setDataScoures] = useState("2")
  const [dataRangeSelect, setDataRangeSelect] = useState("3")
  const [diseaseTopData, setDiseaseTopData] = useState<any>([])
  const [diseaseTopLoading, setDiseaseTopLoading] = useState(false)
  const [dataStatistice, setDataStatistice] = useState<any>(null)
  const [dataStatisticeTime, setDataStatisticeTime] = useState<any>({})
  const [dataStatisticeLoading, setDataStatisticeLoading] = useState(false)

  useEffect(() => {
    getDiseaseTypeList()
    getDiseaseTopFunc()
    getPatientCountFunc()
  }, [currentDiseaseId, dataScoures, dataRangeSelect])
  /**
   * 获取当前疾病
   */
  const getDiseaseTypeList = () => {
    setCurrentDiseaseLoading(true)
    selectDiseaseSpecTrumTypeList({
      pageNum: 1,
      pageSize: 999,
    }).then(res => {
      setDiseaseTypeList(res.data.typeVoList)
      if (res.data.typeVoList && res.data.typeVoList.length > 0) {
        setCurrentDiseaseId(res.data.typeVoList[0].diseaseId)
      }
    }).finally(() => {
      setCurrentDiseaseLoading(false)
    })
  }
  /**
   * 获取当前疾病排名
   */
  const getDiseaseTopFunc = () => {
    setDiseaseTopLoading(true)
    getDiseaseTop({
      diseaseId: currentDiseaseId,
      patientStatus: "1",
      treatmentType: dataRangeSelect,
      size: "10",
      status: dataScoures,
    }).then(res => {
      setDiseaseTopData(res.data?.result || [])
    }).finally(() => {
      setDiseaseTopLoading(false)
    })
  }
  /**
   * 获取数据统计
   */
  const getPatientCountFunc = () => {
    setDataStatisticeLoading(true)
    getPatientCount({
      diseaseId: currentDiseaseId,
      patientStatus: "1",
      treatmentType: dataRangeSelect,
    }).then(res => {
      setDataStatistice(res.data.all)
      setDataStatisticeTime(res.data.timeMap)
    }).finally(() => {
      setDataStatisticeLoading(false)
    })
  }

  return (
    <div className='diseaseSpectrum'>
      <Spin spinning={currentDiseaseLoading}>
        <div className='current_disease'>
          <div className='current_disease_header'>
            <div>当前疾病</div>
            <div className="current_disease_setting">
              <img src={require("../../../assets/img/dataOverview/setting.png")} alt="" /><span
              >疾病配置</span>
            </div>
          </div>
          <div className='current_disease_content'>
            {diseaseTypeList.map((item: any, index: number) => (
              <DiseaseList
                key={item.diseaseId}
                iconType={Number(item.iconUrl)}
                color={color[index % 10]}
                text={item.diseaseTypeName}
                onChange={() => {
                  setCurrentDiseaseId(item.diseaseId)
                }}
                isActive={currentDiseaseId === item.diseaseId}
              />
            ))}
          </div>
        </div>
      </Spin>
      <div className='select_setting'>
        <span className='select_label'>数据源</span>
        <Radio.Group
          options={dataSouresOptions}
          value={dataScoures}
          onChange={(e) => {
            setDataScoures(e.target.value)
          }}
          optionType="button"
          buttonStyle="solid"
        />
        <span className='select_label'>数据范围</span>
        <Radio.Group
          options={dataRangeSelectOptions}
          value={dataRangeSelect}
          onChange={(e) => {
            setDataRangeSelect(e.target.value)
          }}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <div className="total_wrapper">
        <div className="data_distribution">

          <div className="distribution_header">
            <span className="distribution_header_title">数据统计</span>
            <span className="distribution_header_time">
            { dataStatisticeTime?.maxTime }~{
              dataStatisticeTime?.minTime
            }
            </span>
          </div>
          <div className="distribution_echarts">
            <div className="distribution_echarts_left">
              <RoundedEcharts data={dataStatistice ? Number(dataStatistice.idCount) : 0}
                hitCount={10000}
              />
            </div>
            <div className="distribution_echarts_right">
              <RoundedEcharts data={dataStatistice ? Number(dataStatistice.pidCount) : 0}
                hitCount={10000}
              />
            </div>
            <div className="distribution_echarts_text">
              <div className="distribution_echarts_text_left">
                <div className="text_top">总病例数</div>
                <div className="text_bottom">
                  较昨日
                  <span
                    className="text_num"
                  ></span>
                </div>
              </div>
              <div className="distribution_echarts_text_right">
                <div className="text_top">总患者数</div>
                <div className="text_bottom">
                  较昨日
                  <span
                    className="text_num"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="disease_distribution">
          <div className="distribution_header">
            <span className="distribution_header_title">疾病排名</span>
          </div>
          <Spin spinning={diseaseTopLoading}>
            <div className="distribution_echarts">
              <div className="disease_rank">
                <div className="disease_rank_list disease_rank_title">
                  <div className="disease_rank_list_top5">排名</div>
                  <div className="disease_rank_list_name">疾病名称</div>
                  <div className="disease_rank_list_pre">月环比</div>
                  <div className="disease_rank_list_num">人数</div>
                </div>
                {diseaseTopData.slice(0, 5).map((item: any, index: number) => {
                  return (
                    <div
                      className="disease_rank_list"
                      key={index}
                    >
                      <div className="disease_rank_list_top5">
                        {index === 0 && <img
                          src={require("../../../assets/img/dataOverview/rank1.png")}
                          alt=""
                        />}
                        {index === 1 && <img
                          src={require("../../../assets/img/dataOverview/rank2.png")}
                          alt=""
                        />}
                        {index === 2 && <img
                          src={require("../../../assets/img/dataOverview/rank3.png")}
                          alt=""
                        />}
                        {
                          index > 2 &&
                          <div>
                            <img
                              src={require("../../../assets/img/dataOverview/rankOther.png")}
                              alt=""
                            />
                            <span className="disease_rank_list_sort">{index + 1}</span>
                          </div>
                        }
                      </div>
                      <div className="disease_rank_list_name">{item.entityName}</div>
                      <div className="disease_rank_list_pre">{item.perCent}</div>
                      <div className="disease_rank_list_num">{item.count}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Spin>
        </div>
      </div>
    </div >
  )
}

export default diseaseSpectrum