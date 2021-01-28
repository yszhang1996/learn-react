import React, { Component } from 'react'
import './List.css'
import Item from '../Item/Item'
import PropTypes from 'prop-types'
import { Spin } from 'antd';

export default class List extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        descriptions: PropTypes.string.isRequired,
        loading: PropTypes.bool.isRequired,
    }
    render() {
        const { data, descriptions, loading } = this.props
        let datas
        // if (loading) {
        //     datas = <span className="descriptions">加载中</span>
        // } else 
        if (data.length > 0) {
            datas = data.map(item => {
                return <Item key={item.id} item={item} />
            })
        } else {
            datas = <span className="descriptions">{descriptions}</span>
        }
        return (
            <Spin spinning={loading}>
                <div className="List">
                    {datas}
                </div>
            </Spin>
        );
    }
}

