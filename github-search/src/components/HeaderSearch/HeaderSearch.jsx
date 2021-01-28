import React, { Component } from 'react'
import { Input, message } from 'antd';
import axios from 'axios'
import './HeaderSearch.css'
import PropTypes from 'prop-types'

const { Search } = Input;

export default class HeaderSearch extends Component {
    static propTypes = {
        getData: PropTypes.func.isRequired,
        changeLoading: PropTypes.func.isRequired,
    }
    onSearch = (data) => {
        const { getData, changeLoading } = this.props
        console.log(data);
        if (!data) return
        changeLoading(true)
        axios.get(`https://api.github.com/search/users?q=${data}`).then(res => {
            console.log(res);
            if (res.data.items && res.data.items.length > 0) {
                message.success('查询成功！');
                getData(res.data.items)
                changeLoading(false)
            } else {
                message.error('查询失败！')
                changeLoading(false)
                getData([])
            }
        })
    }
    render() {
        return (
            <div className="HeaderSearch">
                <div className="HeaderSearch-text"><span>搜索github用户</span></div>
                <Search
                    placeholder="在此输入您要查找的用户名"
                    allowClear
                    enterButton="搜索"
                    size="large"
                    onSearch={this.onSearch}
                />
            </div>
        );
    }
}

