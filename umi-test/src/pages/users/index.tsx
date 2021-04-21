import React from 'react';
import { Table, Tag, Space } from 'antd';
import { connect } from "umi";
import './index.less'

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Create',
        dataIndex: 'create_time',
        key: 'create_time',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text: string, record: { name: string }) => (
            <span>
                <a>Edit</a>&nbsp;&nbsp;
                <a>Delete</a>
            </span>
        ),
    },
];

const index = ({ users }: any) => {
    return (
        <div className="users-container">
            <Table columns={columns} dataSource={users.data} rowKey="id" />
        </div>
    );
}

// const mapStateToProps = (state) => {
//     console.log(state);

//     return state

// }

// export default connect((state) => {
//     console.log(state);

//     return state

// })(index);
export default connect(state => state)(index);
