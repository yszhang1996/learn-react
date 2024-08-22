import React, { useEffect, useState } from 'react'
import './index.less'
import { Outlet, connect, history, useRouteProps  } from 'umi'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
const dataAllViewChart = (props: { operateJson: { dataResource: boolean, diseaseSpectrum: boolean } }) => {
    const route = useRouteProps()
    const [tabsList, setTabsList] = useState<{ label: string, value: number, path: string }[]>(() => {
        let list: { label: string, value: number, path: string }[] = []
        // 判断是否有权限
        if (props.operateJson.dataResource) {
            list = [...list, { label: "数据资源", value: 1, path: '/dataAllViewChart/dataResources' }]
        }
        if (props.operateJson.diseaseSpectrum) {
            list = [...list, { label: "疾病谱", value: 2, path: '/dataAllViewChart/diseaseSpectrum' }]
        }
        return list
    })
    const [activeName, setActiveName] = useState<number | null>(null)
    useEffect(() => {      
        if (tabsList.length) {  
            let data = tabsList.find(item=>item.label === route.title)
            if(data){
                setActiveName(data.value)
            }else{
                console.log("触发");
                
                setActiveName(tabsList[1].value)
            }
        }
    }, [])

    const handleClickTab = (item:{ label: string, value: number, path: string }) => {
        setActiveName(item.value)
        history.push(item.path)
    }

    return (
        <ConfigProvider locale={zhCN}>
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
                                <div className={`title_tabs_list ${item.value === activeName ? `title_tabs_list_actived` : ``}`} key={index} onClick={() => { handleClickTab(item)}}>
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
        </ConfigProvider>
    )
}

const mapStateToProps = (state: { login: { operateJson: { dataResource: boolean, diseaseSpectrum: boolean }; }; }) => {
    return {
        operateJson: state.login.operateJson
    }
}

export default connect(mapStateToProps)(dataAllViewChart);
