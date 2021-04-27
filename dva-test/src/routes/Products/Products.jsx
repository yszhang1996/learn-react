import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { Link } from "dva/router";
import * as api from '../../services/example';
import { productUpdatelist, productUpdatelistAsync, productUpdatelistHttp } from "../../actions";

class Products extends Component {

    componentDidMount() {
        api.getProducts().then(res => {
            console.log(res);
        })
        api.getUser().then(res => {
            console.log(res);
        })
    }

    click = (e) => {
        console.log("11111");
        const currentProduct = {
            name: 'lizhaoliu'
        }
        // this.props.dispatch({
        //     type: 'products/updateList',
        //     payload: currentProduct
        // })
        this.props.dispatch(productUpdatelist(currentProduct))
    }
    clickAsync = (e) => {
        const currentProduct = {
            name: 'zhaoqiansunli'
        }
        // this.props.dispatch({
        //     type: 'products/updateListAsync',
        //     payload: currentProduct
        // })
        this.props.dispatch(productUpdatelistAsync(currentProduct))
    }
    clickHTTP = () => {
        // this.props.dispatch({
        //     type: 'products/updateListHttp',
        //     payload: {
        //         id: 1001
        //     }
        // })
        this.props.dispatch(productUpdatelistHttp({ id: 1001 }))
    }
    clickGoToHome = () => {
        this.props.history.push('/')
    }
    render() {
        console.log(this.props);
        const { productsList } = this.props.productsList
        return (
            <div>
                <div>
                    {
                        productsList.map((element, index) => {
                            return <span key={index}>测试Products{element.name}<br /></span>
                        })
                    }
                </div>
                <div className="buttons">
                    <Button onClick={this.click}>测试增加</Button>
                    <Button onClick={this.clickAsync}>测试增加Async</Button>
                    <Button onClick={this.clickHTTP}>测试增加HTTP</Button>
                    <Link to="/">去首页</Link>
                    <Button onClick={this.clickGoToHome}>去首页</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        productsList: state.products
    }
}

export default connect(mapStateToProps)(Products);
