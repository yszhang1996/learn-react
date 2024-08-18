import React, { useEffect, useRef } from 'react'
import * as echarts from "echarts";

let myChart
function PatientCategory({data,XAxis,grid}:{data: any[],XAxis:string[],grid:any}) {

    const PatientCategory = useRef(null)

    useEffect(() => {
        console.log(PatientCategory.current);
        console.log("触发useEffect");        
        console.log(data);        
        initEcharts()
    }, [data,XAxis])

    const initEcharts = () => {
        if(data.length === 0) return
        var chartDom = PatientCategory.current
        myChart = echarts.init(chartDom);
        let option = {
            xAxis: {
              type: "category",
              data: XAxis,
            },
            yAxis: {
              type: "value",
            },
            grid: grid,
            series: [
              {
                data: data,
                type: "bar",
                barMaxWidth: 20,  // 设置柱子的最大宽度为30
                itemStyle:{
                    color: '#006AED'
                }
              },
            ],
          };
    
          option && myChart.setOption(option);
    }

    return (
        <div className='PatientCategory' ref={PatientCategory} style={{ width: '100%', height: '100%' }}></div>
    )
}

export default PatientCategory