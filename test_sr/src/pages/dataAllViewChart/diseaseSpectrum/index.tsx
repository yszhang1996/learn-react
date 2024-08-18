import React, { useEffect, useState } from 'react'
import './index.less'
import DiseaseList from './DiseaseList'
import { selectDiseaseSpecTrumTypeList } from '@/request/api'
import { Spin } from 'antd';

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

function diseaseSpectrum() {

  const [diseaseTypeList, setDiseaseTypeList] = useState([])
  const [currentDiseaseId, setCurrentDiseaseId] = useState("")
  const [currentDiseaseLoading, setCurrentDiseaseLoading] = useState(false)

  useEffect(() => {
    getDiseaseTypeList()
  }, [])
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
    </div>
  )
}

export default diseaseSpectrum