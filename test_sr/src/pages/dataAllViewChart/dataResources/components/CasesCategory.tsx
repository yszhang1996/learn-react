import React, { useEffect, useRef } from 'react'
import * as echarts from "echarts";

let myChart
function CasesCategory({data}:{data: any[]}) {

    const CasesCategory = useRef(null)

    useEffect(() => {
        console.log(CasesCategory.current);
        console.log(data);
        
        initEcharts()
    }, [data])

    const initEcharts = () => {
        if(data.length === 0) return
        var chartDom = CasesCategory.current
        myChart = echarts.init(chartDom);
        var option;

        option = {
            xAxis: {
                type: "category",
                show: false,
            },
            yAxis: {
                type: "value",
                show: false,
            },
            grid: {
                bottom: 0,
            },
            series: [
                {
                    data: data,
                    type: "bar",
                    itemStyle: {
                        color: function (params: any) {
                            const colorsMap = ["#8D4EDA", "#D2BFF4"];
                            return colorsMap[params.dataIndex % 2];
                        },
                        borderRadius: [2, 2, 2, 2]
                    },
                },
            ],
        };

        option && myChart.setOption(option);
    }

    return (
        <div className='CasesCategory' ref={CasesCategory} style={{ width: '100%', height: '100%' }}></div>
    )
}

export default CasesCategory