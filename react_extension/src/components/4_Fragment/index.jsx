import React, { Component, Fragment } from 'react';

class index extends Component {
    render() {
        return (
            // Fragment只能使用key这一个属性，其他任何属性在渲染时都会丢失
            <Fragment key={1}>
                <input type="text" />
                <input type="text" />
            </Fragment>
        );
    }
}

export default index;
