import React, { useEffect, useRef } from 'react'
import * as echarts from "echarts";

let myChart
function CasesCategory({ data,hitCount }: { data: number,hitCount: number }) {

    const CasesCategory = useRef(null)

    useEffect(() => {
        console.log(CasesCategory.current);
        console.log(data);

        initEcharts()
    }, [data])

    const initEcharts = () => {
        var chartDom = CasesCategory.current
        myChart = echarts.init(chartDom);
        var option;

        let per

        if (hitCount === 0) {
            per = 0
        } else {
            per = (data / hitCount) * 100
        }

        let seriesData = [
            {
                name: "",
                value: per,
            },
        ];

        let titleArr: string[] = [],
            seriesArr: any[] = [];
        seriesData.forEach((item) => {
            seriesArr.push({
                name: item.name,
                type: "pie",
                clockWise: false,
                radius: [40, 55],
                itemStyle: {
                    normal: {
                        color: '#1979EF',
                        shadowColor: '#1979EF',
                        shadowBlur: 0,
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        },
                    },
                },
                hoverAnimation: false,
                center: ["50%", "50%"],
                data: [
                    {
                        value: item.value,
                        label: {
                            normal: {
                                formatter: () => {
                                    return data;
                                },
                                position: "center",
                                show: true,
                                textStyle: {
                                    fontSize: "20",
                                    fontWeight: "bold",
                                    color: '#1979EF',
                                },
                            },
                        },
                    },
                    {
                        value: 100 - item.value,
                        name: "invisible",
                        itemStyle: {
                            normal: {
                                color: '#C8E0FF',
                            },
                            emphasis: {
                                color: '#C8E0FF',
                            },
                        },
                    },
                ],
            });
        });

        option = {
            backgroundColor: "#fff",
            title: titleArr,
            series: seriesArr,
        };

        option && myChart.setOption(option);
    }

    return (
        <div className='CasesCategory' ref={CasesCategory} style={{ width: '100%', height: '100%' }}></div>
    )
}

export default CasesCategory