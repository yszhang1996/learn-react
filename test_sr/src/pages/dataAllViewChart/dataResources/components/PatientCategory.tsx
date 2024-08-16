import React, { useEffect, useRef } from 'react'
import * as echarts from "echarts";

let myChart
function PatientCategory({data}:{data: any[]}) {

    const PatientCategory = useRef(null)

    useEffect(() => {
        console.log(PatientCategory.current);
        console.log(data);
        
        initEcharts()
    }, [data])

    const initEcharts = () => {
        if(data.length === 0) return
        var chartDom = PatientCategory.current
        myChart = echarts.init(chartDom);
        let option = {
            xAxis: {
              type: "category",
              data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              show: false,
              boundaryGap: false,
            },
            yAxis: {
              type: "value",
              show: false,
            },
            grid: {
              bottom: 3,
            },
            series: [
              {
                data: data,
                type: "line",
                smooth: true,
                areaStyle: {
                  opacity: 0.16,
                  color: "#3574FC",
                },
                lineStyle: {
                  color: "#3574FC",
                },
                itemStyle: {
                  color: "#3574FC",
                },
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