import React, { useEffect, useRef, useState } from 'react'
import { CaretDownOutlined, CaretUpOutlined, CloseOutlined } from '@ant-design/icons'
import { getDepartmentInfos } from '@/request/api'
import { DeptItems } from '@/types'

import './SelectDept.less'
import { Button, message } from 'antd'

function App({changeDept}) {
    const [departmentList, setDepartmentList] = useState<DeptItems>([]) // 科室列表
    const [selectDept, setSelectDept] = useState(new Set(["全部"])) // 存储科室列表选中的值
    const [currentSelectDept, setCurrentSelectDept] = useState([
        {
            deptCode: "全部",
            deptName: "全部",
        },
    ]) // 已选择的科室，点击确定后的存储，默认是全部
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        getDepartmentInfos().then(res => {
            setDepartmentList(res.data)
        })
    }, [])

    /**
     * 给最后一条拼接字符串
     * @param index 
     * @param arr 
     * @returns 
     */
    const judgeShowText = (index: number, arr: DeptItems) => {
        return `+${arr.length - index}`;
    }
    const selectDepartment = (val: string) => {
        if (selectDept.has(val)) {
            // 数据已存在，再次点击是取消选中
            selectDept.delete(val)
        } else {
            // 数据不存在，点击是添加数据
            if (val === "全部") {
                // 如果选中的是全部，则清空数据后添加
                selectDept.clear()
            } else {
                // 如果选中的不是全部，则判断已选择列表中是否有全部，有的话，删除
                if (selectDept.has("全部")) {
                    selectDept.delete("全部")
                }
            }
            selectDept.add(val)
        }
        setSelectDept(new Set([...selectDept]))

    }

    const confirmSelect = () => {
        if(selectDept.size === 0){
            message.warning('请至少选择一条科室数据！')
            return
        }
        if(selectDept.has('全部')){
            setCurrentSelectDept([
                {
                    deptCode: "全部",
                    deptName: "全部",
                },
            ])
            changeDept('全部')
        }else{
            let arr = departmentList.filter(item=>{
                if(selectDept.has(item.deptCode)){
                    return item
                }
            })
            setCurrentSelectDept(arr)
            changeDept(arr.map((item) => item.deptCode).join(","))
        }
        setIsShow(false)        
    }
    const clearSelect = () => {
        setSelectDept(new Set(["全部"]))
    }
    const delSelectDept = (code: string) => {
        if(selectDept.size === 1){
            message.warning('请至少保留一条科室数据！')
            return 
        }
        selectDept.delete(code)
        setSelectDept(new Set([...selectDept]))
        confirmSelect()
    }
    return (
        <div>
            <div className="filter_hospital_department">
                <div>当前科室</div>
                <div className="department_tags">
                    {currentSelectDept.slice(0, 8).map((item, index) => {
                        return (<div className="filter_tags_list" key={index} >
                            {
                                index === 7 ? judgeShowText(7, currentSelectDept) : item.deptName
                            }
                            {item.deptName !== '全部' &&<div onClick={() => {delSelectDept(item.deptCode)}} className="filter_tags_list_del" >
                                <CloseOutlined />
                            </div>}
                        </div>)
                    })}
                </div>
                <div className="more_filter">
                    <div className="more_filter_set" onClick={() => { setIsShow(!isShow) }}>
                        <span>更多筛选</span>
                        {isShow ? <CaretUpOutlined /> : <CaretDownOutlined />}
                        {/* <CaretUpOutlined />
                        <CaretDownOutlined /> */}
                    </div>
                </div>
                {isShow && <div className="more_filter_content">
                    <div className="filter_department">
                        <div className="filter_department_label"><span>选择科室</span></div>
                        <div className="filter_department_content">
                            <div className={`filter_tags_list ${selectDept.has('全部') ? `filter_tags_list_actived` : ``}`} onClick={() => { selectDepartment('全部') }}>
                                全部
                            </div>
                            {departmentList.map((item, index) => {
                                return (
                                    <div className={`filter_tags_list ${selectDept.has(item.deptCode) ? `filter_tags_list_actived` : ``}`} key={index} onClick={() => { selectDepartment(item.deptCode) }} >
                                        {item.deptName}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="more_filter_footer">
                        <Button onClick={() => {setIsShow(false)}}>取消</Button>
                        <Button onClick={confirmSelect} style={{ marginLeft: '20px' }} type="primary">确定</Button>
                        <div className="brush_all_list" onClick={clearSelect} >
                            <img src={require("@/assets/img/dataOverview/qingkong.png")} alt="" />
                            <span>清空选项</span>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default App