import React, { useEffect, useRef } from 'react'
import * as echarts from "echarts";
import china from "@/utils/maps/china.json";

const mapping = new Map([
    ["内蒙古自治区", "内蒙古"],
    ["广西壮族自治区", "广西"],
    ["西藏自治区", "西藏"],
    ["新疆维吾尔自治区", "新疆"],
    ["香港特别行政区", "香港"],
    ["澳门特别行政区", "澳门"],
    ["宁夏回族自治区", "宁夏"],
]);

let myChart
function CasesCategory({ data }: { data: any[] }) {

    const CasesCategory = useRef(null)

    useEffect(() => {
        console.log(CasesCategory.current);
        console.log(data);

        initEcharts()
    }, [data])

    const initEcharts = () => {
        if (data.length === 0) return
        echarts.registerMap("china", china);
        var chartDom = CasesCategory.current
        myChart = echarts.init(chartDom);

        let dataList = data.map((item) => {
            if (mapping.has(item.name)) {
                item.name = mapping.get(item.name);
            }
            item.name = item.name.replace(/省|市/g, "");
            return item;
        });

        var option;

        option = {
            visualMap: {
                text: "",
                type: "piecewise", // 文本，默认为数值文本*/
                min: 0,
                left: "30px",
                bottom: "bottom",
                showLabel: !0,
                itemWidth: 14,
                itemHeight: 20,
                itemGap: 0,
                itemSymbol: "rect",
                pieces: [
                    {
                        gt: 1000,
                        label: "1000以上",
                        color: "#246EFF",
                    },
                    {
                        gte: 500,
                        lte: 999,
                        label: "500-999人",
                        color: "#518CFF",
                    },
                    {
                        gte: 100,
                        lt: 499,
                        label: "100-499人",
                        color: "#7CA8FF",
                    },
                    {
                        gte: 10,
                        lt: 99,
                        label: "10-99人",
                        color: "#A7C4FF",
                    },
                    {
                        gte: 1,
                        lt: 9,
                        label: "1-9人",
                        color: "#D4E3FF",
                    },
                    {
                        gte: 0,
                        lt: 0,
                        label: "0人",
                        color: "#EAF1FF",
                    },
                ],
                show: !0,
            },
            geo: {
                map: "china",
                roam: true,
                scaleLimit: {
                    min: 1,
                    max: 2,
                },
                zoom: 1.13,
                top: 30,
                itemStyle: {
                    borderColor: "rgba(0, 0, 0, 0.2)",
                },
                emphasis: {
                    areaColor: "#f2d5ad",
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: "确诊病例",
                    type: "map",
                    geoIndex: 0,
                    data: dataList,
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