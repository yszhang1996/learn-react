import React, { useEffect, useState } from 'react'
import './index.less'
import { Outlet, connect, useRouteProps  } from 'umi'
const dataAllViewChart = (props: { operateJson: { dataResource: boolean, diseaseSpectrum: boolean } }) => {
    const route = useRouteProps()
    const [tabsList, setTabsList] = useState<{ label: string, value: number }[]>(() => {
        let list: { label: string, value: number }[] = []
        // 判断是否有权限
        if (props.operateJson.dataResource) {
            list = [...list, { label: "数据资源", value: 1, }]
        }
        if (props.operateJson.diseaseSpectrum) {
            list = [...list, { label: "疾病谱", value: 2, }]
        }
        return list
    })
    const [activeName, setActiveName] = useState<number | null>(null)
    useEffect(() => {
        if (tabsList.length) {  
            let data = tabsList.find(item=>item.label === route.title)
            if(data){
                setActiveName(data.value)
            }
        }
    }, [])

    return (
        <div>
            <div className="dataOverview">
                <div className="title_tabs">
                    <img
                        src={require("../../assets/img/dataOverview/titleTabsBg.png")}
                        className="title_tabs_bg"
                    />
                    {
                        tabsList.map((item, index) => {
                            return (
                                <div className={`title_tabs_list ${item.value === activeName ? `title_tabs_list_actived` : ``}`} key={index} onClick={() => { setActiveName(item.value)}}>
                                    <span>{item.label}</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="tabs_content">
                    <Outlet />
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = (state: { login: { operateJson: { dataResource: boolean, diseaseSpectrum: boolean }; }; }) => {
    return {
        operateJson: state.login.operateJson
    }
}

export default connect(mapStateToProps)(dataAllViewChart);
